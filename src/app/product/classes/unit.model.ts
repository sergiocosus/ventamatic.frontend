import {Model} from '../../shared/classes/model';

export class Unit extends Model {
  id: number;
  name: string;
  abbreviation: string;
  step: number;

  public static parseFromData(unitsData) {
    return Object.keys(unitsData).map(key => {
      return new Unit().parse(Object.assign({id: key}, unitsData[key] ));
    });
  }
}
