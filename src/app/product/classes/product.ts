import {Model} from '../../shared/classes/model';
import {Category} from '../../category/category';
import {Brand} from '../../brand/brand';
import {units} from '../../shared/unit/units.data';

export class Product extends Model {
  id: number;
  unit_id: number;
  brand_id: number;
  bar_code: string;
  description: string;
  number;
  global_minimum: number;
  global_price: number;
  last_cost: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  categories: Category[];
  brand: Brand;
  unit: any;
  inventories: any[];

  public static parseArray(objs: any) {
    return objs.map(obj => {
      return new Product().parse(obj);
    });
  }

  get price() {
    return this.global_price;
  }

  get unitData() {
    return units[this.unit_id];
  }

  parse(obj) {
    for (const prop in obj) this[prop] = obj[prop];

    if (this.categories) {
      this.categories = Category.parseArray(this.categories);
    }

    return this;
  }

  toStringCategories() {
    return this.categories.map(category => category.name).join(',');
  }

  get searchFieldsHeader() {
    return [
        'Descripción',
        'Precio',
        '',
    ];
  }

  get searchFields() {
    return [
      this.description,
      this.price,
      this.unitData.abbreviation,
    ];
  }
}
