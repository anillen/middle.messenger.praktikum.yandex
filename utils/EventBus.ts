/* eslint-disable @typescript-eslint/ban-types */

interface Listeners {
  [key: string]: Array<Function>;
}

export default class EventBus {
  listeners: Listeners;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`События ${event} не существует!`);
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`События ${event} не существует!`);
    }
    this.listeners[event].forEach((listener) => listener(...args));
  }
}
