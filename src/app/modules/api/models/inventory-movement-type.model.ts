import { Model } from '@app/api/models/model';
import {InventoryMovementTypeId} from '@app/api/classes/inventory-movement-type-id.enum';

export class InventoryMovementType extends Model {
  id: InventoryMovementTypeId;
  name: string;

  public static parseArray(objs: any){
    return objs.map(obj => {return new InventoryMovementType().parse(obj);});
  }
}
