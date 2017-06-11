import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BasicEntityService} from './basic-entity-service';
import {SupplierCategoryService} from '../../../supplier/services/supplier-category.service';
import {MdDialogRef} from '@angular/material';
import {CategoryService} from '../../../category/category.service';
import {BrandService} from '../../../brand/brand.service';
import {NotifyService} from '../../../shared/services/notify.service';

@Component({
  selector: 'app-basic-entity-dialog',
  templateUrl: './basic-entity-dialog.component.html',
  styleUrls: ['./basic-entity-dialog.component.scss']
})
export class BasicEntityDialogComponent implements OnInit {
  service: BasicEntityService;
  mode;
  entities: any[] = [];
  title = 'Marcas';

  entity: any = {
    name : null
  };

  messages = {
    successCreate: 'Creado exitosamente',
    successUpdate: 'Actualizado exitosamente',
    successDelete: 'Eliminado exitosamente'
  };

  public deletedControl = new FormControl();


  constructor(private brandService: BrandService,
              protected categoryService: CategoryService,
              protected supplierCategoryService: SupplierCategoryService,
              private notify: NotifyService,
              private dialogRef: MdDialogRef<BasicEntityDialogComponent>) {
    this.deletedControl.valueChanges.subscribe(
      showDeleted => this.loadFromService()
    );
  }

  ngOnInit() {
  }

  init(mode) {
    this.mode = mode;
    this.loadFromService();
  }

  loadFromService() {
    switch (this.mode) {
      case 'brand':
        this.service = this.brandService;
        this.title = 'Marca';
        break;
      case 'category':
        this.service = this.categoryService;
        this.title = 'Categoría';
        break;
      case 'supplier-category':
        this.service = this.supplierCategoryService;
        this.title = 'Categoría de proveedor';
        break;
    }

    const params = {
      deleted: this.deletedControl.value
    };

    this.service.getAll(params).subscribe(
      entities => {
        this.entities = entities;
      }
    );
  }

  create() {
    this.service.post(this.entity).subscribe(
      entity => {
        this.entities.push(entity);
        this.entity = { name : null };
        this.notify.success(this.messages.successCreate);
      },
      error => {
        this.notify.serviceError(error);
      }
    );
  }

  update(entity) {
    this.service.put(entity).subscribe(
      brand => {
        for (let i = 0; i < this.entities.length; i++) {
          if (brand.id === this.entities[i].id) {
            this.entities[i] = brand;
          }
        }
        this.notify.success(this.messages.successUpdate);
      },
      error => {
        this.notify.serviceError(error);
      }
    );
  }

  delete(entity) {
    this.service.delete(entity.id).subscribe(
      success => {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
          if (this.deletedControl.value) {
            this.entities[index].deleted_at = ' ';
          } else {
            this.entities.splice(index, 1);
          }
        }

        this.notify.success(this.messages.successDelete);
      },
      error => {
        this.notify.serviceError(error);
      }
    );
  }

  restore(entity) {
    this.service.restore(entity.id).subscribe(
      entityRestored => {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
          this.entities[index] = entityRestored;
        }

        this.notify.success(this.title + ' restaurado');
      },
      error => this.notify.serviceError(error)
    );
  }

  close() {
    this.dialogRef.close();
  }
}
