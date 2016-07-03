import * as moment from 'moment';

export class Model{
  parse(obj):any{
    for (var prop in obj) this[prop] = obj[prop];
    return this;
  }

  public parseDateTime(fieldName){
    this[fieldName] = moment.utc(this[fieldName]).toDate()
  }
}
