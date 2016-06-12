export class Model{
  parse(obj){
    for (var prop in obj) this[prop] = obj[prop];
    return this;
  }
}
