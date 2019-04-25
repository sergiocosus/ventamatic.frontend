// @dynamic

import * as moment from 'moment';

export class Model {
  public static parseDateTime(date) {
    return Model.parseDateTimeMoment(date).toDate();
  }

  public static parseDateTimeMoment(date) {
    return moment.utc(date);
  }


  parse(obj): any {
    for (var prop in obj) this[prop] = obj[prop];

   // this.parseDateTimes(['created_at', 'updated_at', 'deleted_at']);

    return this;
  }

  replaceProperties(obj) {
    for (const prop in this) {
      if (Object.getOwnPropertyDescriptor(this, prop) && typeof this[prop] !== 'function') {
        this[prop] = obj[prop];
      }
    }
    return this;
  }

  parseDateTimes(datesArray: string[]) {
    datesArray.forEach(field => {
      if (this[field]) {
        this[field] = moment(this[field]);
      }
    });
  }

  public parseDateTime(fieldName){
    this[fieldName] = Model.parseDateTime(this[fieldName]);
  }
}
