export class Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  public static parseArray(objs: any) {
    return objs.map(obj => {return new Category().parse(obj); });
  }

  parse(obj){
     for (const prop in obj) this[prop] = obj[prop];
    return this;
  }
}
