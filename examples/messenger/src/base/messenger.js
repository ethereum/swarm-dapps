import { map, filter } from 'rxjs/operators';
import { SwarmClient } from '@erebos/swarm-browser';

function createRandomString() {
  return Math.random()
    .toString(36)
    .slice(2);
}

function decodePssEvent(data) {
  return {
    key: data.key,
    data: data.msg.toObject(),
  }
}

export default class Messanger {
  _subscriptions = [];

  client = undefined;
  account = {};

  constructor(config) {
    this.client = new SwarmClient({ ws: config.ws });

    return (async () => {
      this.account = await this.getAccount();
      return this;
    })();
  }

  async getAccount() {
    const [publicKey, overlayAddress] = await Promise.all([
      this.client.pss.getPublicKey(),
      this.client.pss.baseAddr(),
    ]);

    return { publicKey, overlayAddress };
  }

  async subscribe(config) {
    if (config.onReceiveContactEvent) {
      const subscription = await this.createContactSubscription(this.account.publicKey);
      const contactSub = subscription.subscribe(config.onReceiveContactEvent);
      this._subscriptions.push(contactSub);
    }

    if (config.onReceiveChatEvent && config.chats) {
      config.chats.map(async (chat) => {
        await this.subscribeChat(chat, config.onReceiveChatEvent);
      });
    }
  }

  async subscribeChat(chat, onReceiveChatEvent) {
    const subscription = await this.createChatSubscription(chat.key, chat.topic);
    const chatSub = subscription.subscribe(onReceiveChatEvent);
    this._subscriptions.push(chatSub);
  }

  unsubscribe() {
    this._subscriptions.map(s => s.unsubscribe());
  }

  async sendContactRequest(key) {
    const [contactTopic, sharedTopic] = await Promise.all([
      this.client.pss.stringToTopic(key),
      this.client.pss.stringToTopic(createRandomString()),
    ]);

    await this.client.pss.setPeerPublicKey(key, contactTopic);
    const message = {
      type: 'contact_request',
      payload: {
        username: undefined,
        message: 'Hi there',
        topic: sharedTopic,
        overlay_address: this.account.overlayAddress,
      },
      utc_timestamp: Date.now()
    };
    await this.client.pss.sendAsym(key, contactTopic, message);

    return { contactTopic, sharedTopic };
  }

  async sendContactResponse(key, accept, data = {}) {
    let payload
    if (accept) {
      payload = {
        contact: true,
        overlay_address: this.account.overlayAddress,
        username: data.username,
      };
    } else {
      payload = { contact: false };
    }

    const topic = await this.client.pss.stringToTopic(key);
    await this.client.pss.setPeerPublicKey(key, topic);
    const message = {
      type: 'contact_response',
      payload,
      utc_timestamp: Date.now()
    };
    await this.client.pss.sendAsym(key, topic, message);
  }

  async createContactSubscription(publicKey) {
    const topic = await this.client.pss.stringToTopic(publicKey);
    const subscription = await this.client.pss.createTopicSubscription(topic);
    return subscription.pipe(
      map(decodePssEvent),
      filter((event) => {
        return (
          (event.data.type === 'contact_request' &&
            event.data.payload != null &&
            event.data.payload.topic != null) ||
          event.data.type === 'contact_response'
        )
      }),
      map(
        (event) => ({
          key: event.key,
          type: event.data.type,
          payload: event.data.payload,
        }),
      ),
    )
  }

  async createChatSubscription(contactKey, topic) {
    const [sub] = await Promise.all([
      this.client.pss.createTopicSubscription(topic),
      this.client.pss.setPeerPublicKey(contactKey, topic),
    ])
    return sub.pipe(
      map(decodePssEvent),
      filter((event) => {
        return event.data.type === 'chat_message' &&
          event.data.payload != null
      }),
      map(
        (event) => ({
          key: event.key,
          type: event.data.type,
          utc_timestamp: event.data.utc_timestamp,
          payload: event.data.payload,
        }),
      ),
    )
  }

  async sendChatMessage(key, topic, data) {
    const message = {
      type: 'chat_message',
      payload: data,
      utc_timestamp: Date.now()
    };
    await this.client.pss.sendAsym(key, topic, message);
  }
}