const TRANSACTION_UPDATED = 'transactionUpdated';

class TransactionEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(event);
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.listeners.delete(event);
      }
    };
  }

  emit(event) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback());
    }
  }
}

export const transactionEvents = new TransactionEventEmitter();
export const EVENTS = {
  TRANSACTION_UPDATED
};
