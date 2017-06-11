export class Client {
  public id: number;
  public name: string;
  public email: string;
  public created_at: string;
  public updated_at: string;
  public last_name: string;
  public last_name_2: string;
  public phone: string;
  public cellphone: string;
  public address: string;
  public rfc: string;
  public deleted_at: string;

  public static parseArray(objs: any){
    return objs.map(obj => {return new Client().parse(obj); });
  }

  get fullName(){
    return `${this.name} ${this.last_name} ${this.last_name_2}`;
  }

  parse(obj) {
    for (const prop in obj) this[prop] = obj[prop];

    return this;
  }
}
