import {Model} from '../../shared/classes/model';
import {InventoryMovementTypeId} from './inventory-movement-type-id.enum';

export class InventoryMovementType extends Model {
  id: InventoryMovementTypeId;
  name: string;

  public static parseArray(objs: any){
    return objs.map(obj => {return new InventoryMovementType().parse(obj);});
  }
}
