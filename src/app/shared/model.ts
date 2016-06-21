export class Model{
  parse(obj):any{
    for (var prop in obj) this[prop] = obj[prop];
    return this;
  }
}
