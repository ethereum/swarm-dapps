const PUBLIC_KEY_RE = /^0x[0-9a-f]{130}$/

export default {
    isValidPubKey(key, account, contacts) {
        if (key === account) {
            throw new Error('Invalid contact key: this is your own key');
        }

        if (!PUBLIC_KEY_RE.test(key)) {
            throw new Error('Invalid contact key: must be an hexadecimal string prefixed with "0x"');
        }

        const existing = contacts.find(c => c.key === key);
        if (existing) {
            throw new Error('The contact already present in your list of contacts');
        }

        return true;
    }
}