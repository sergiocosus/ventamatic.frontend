import { SubscriptionManager } from '../classes/subscription-manager';

export function AutoUnsubscribe(blackList = []) {
  return function (constructor) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      for (let prop in this) {
        const property = this[prop];
        if (!blackList.includes(prop)) {
          if (property instanceof SubscriptionManager) {
            property.clear();
          }
        }
      }
      original && typeof original === 'function' && original.apply(this, arguments);
    };
  };

}
