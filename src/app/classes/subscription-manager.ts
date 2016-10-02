import {Subscription} from "rxjs";


export class SubscriptionManager {
  subscriptions:Subscription[] = [];

  push(subscription:Subscription){
    this.subscriptions.push(subscription);
  }

  clear(){
    this.subscriptions.forEach(
      subscription => {
        subscription.unsubscribe();
      }
    );
    this.subscriptions.length = 0;
  }
}
