import {Model} from '../../shared/classes/model';
import {Permission} from '../../auth/classes/permission';

export class Role extends Model {
  id: number;
  name: string;
  display_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  permissions: (Permission|number)[];

  public static parseArray(objs: any){
    return objs.map(obj => {return new Role().parse(obj); });
  }

}
