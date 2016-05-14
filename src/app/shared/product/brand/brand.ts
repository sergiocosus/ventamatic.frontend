export class Brand{
  id:number;
  name:string;
  created_at:string;
  updated_at:string;
  deleted_at:string;

  parse(obj){
    for (var prop in obj) this[prop] = obj[prop];
    return this;
  }

  public static parseArray(objs:any){
    return objs.map(obj => {return new Brand().parse(obj)})
  }
}
