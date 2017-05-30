import {Model} from '../../shared/model';
export class InventoryMovementType extends Model{
  id: number;
  name: string;

  public static parseArray(objs:any){
    return objs.map(obj => {return new InventoryMovementType().parse(obj)})
  }
}
