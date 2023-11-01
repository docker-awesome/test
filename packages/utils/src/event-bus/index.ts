import { v4 as uuidv4 } from 'uuid';

class EventBus {
  static maps: Record<
    string,
    Record<
      string,
      {
        type: string;
        uuid: string;
        listener: FunctionConstructor;
        scope?: any;
        once?: boolean;
      }
    >
  > = {};

  static subscribe(
    type: string,
    listener: FunctionConstructor,
    options?: { scope?: any; once?: boolean },
  ) {
    const { scope = null, once = false } = options || {};
    const uuid = uuidv4();

    if (!Reflect.has(this.maps, type)) {
      Reflect.set(this.maps, type, {});
    }

    Reflect.set(this.maps[type], uuid, {
      type,
      uuid,
      listener,
      scope,
      once,
    });

    return () => {
      delete this.maps[type][uuid];
    };
  }

  static clear(type?: string) {
    if (type) {
      delete this.maps[type];
      return;
    }

    this.maps = {};
  }

  static dispatch(type: string, ...args: any[]) {
    if (!Reflect.has(this.maps, type)) {
      throw new Error(`No ${type} subscription events.`);
    }

    const targets = Object.values(this.maps[type]);

    for (const { uuid, listener, scope, once } of targets) {
      if (scope) {
        listener.call(scope, ...args);
      } else {
        listener(...args);
      }

      if (once) {
        delete this.maps[type][uuid];
        if (!Object.values(this.maps[type]).length) {
          delete this.maps[type];
        }
      }
    }
  }
}

export default EventBus;
