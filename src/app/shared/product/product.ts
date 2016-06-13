export class Product{
  id:number;
  unit_id:number;
  brand_id:number;
  bar_code:string;
  description:string;number;
  global_minimum:number;
  global_price:number;
  created_at:string;
  updated_at:string;
  deleted_at:string;
  
  get price(){
    return this.global_price;
  }
  
  parse(obj){
    for (var prop in obj) this[prop] = obj[prop];
    
    return this;
  }
  
  get searchFields(){
    return [
      this.description,
      this.price,
    ]
  }
  
  public static parseArray(objs:any){
    return objs.map(obj => {return new Product().parse(obj)})
  } 
}
