import { Model } from '@app/api/models/model';

export class Permission extends Model {
  id: number;
  name: string;
  display_name: string;
  description: string;
  created_at: string;
  updated_at: string;

  public static parseArray(objs: any) {
    return objs.map(obj => {return new Permission().parse(obj); });
  }
}
