const STORAGE_KEY = 'swarm_messenger';

export default {
    set(data) {
        const value = JSON.stringify(data);
        localStorage.setItem(STORAGE_KEY, value);
    },

    get() {
        const value = localStorage.getItem(STORAGE_KEY);
        return JSON.parse(value || '{}');
    }
}