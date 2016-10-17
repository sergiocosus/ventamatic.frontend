import * as moment from 'moment';

export class Model{
  parse(obj):any{
    for (var prop in obj) this[prop] = obj[prop];
    return this;
  }

  public parseDateTime(fieldName){
    this[fieldName] = Model.parseDateTime(this[fieldName]);
  }

  public static parseDateTime(date) {
    return moment.utc(date).toDate();
  }
}
