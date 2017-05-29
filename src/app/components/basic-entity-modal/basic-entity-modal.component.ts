import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {BrandService} from "../../shared/product/brand/brand.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NotifyService} from "../../services/notify.service";
import {BasicEntityService} from "./basic-entity-service";
import {SupplierCategoryService} from "../../app/+proveedores/category/supplier-category.service";
import {CategoryService} from "../../shared/product/category/category.service";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-basic-entity-modal',
  templateUrl: './basic-entity-modal.component.html',
  styleUrls: ['./basic-entity-modal.component.scss']
})
export class BasicEntityModalComponent implements OnInit {
  @ViewChild(ModalComponent) protected modal:ModalComponent;
  @Input() mode;
  @Output() closed = new EventEmitter();
  service: BasicEntityService;

  entities:any[] = [];
  title:string = 'Marcas';

  entity:any = {
    name : null
  };

  messages = {
    successCreate: 'Creado exitosamente',
    successUpdate: 'Actualizado exitosamente',
    successDelete: 'Eliminado exitosamente'
  };

  public deletedControl = new FormControl();


  constructor(private brandService:BrandService,
              protected categoryService: CategoryService,
              protected supplierCategoryService: SupplierCategoryService,
              private notify: NotifyService) {
    this.deletedControl.valueChanges.subscribe(
      showDeleted => this.loadFromService()
    );
  }

  ngOnInit() {
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
    )
  }

  create(){
    this.service.post(this.entity).subscribe(
      entity => {
        this.entities.push(entity);
        this.entity = { name : null };
        this.notify.success(this.messages.successCreate);
      },
      error => {
        this.notify.serviceError(error)
      }
    );
  }

  update(entity){
    this.service.put(entity).subscribe(
      brand => {
        for(var i=0; i<this.entities.length; i++) {
          if (brand.id == this.entities[i].id) {
            this.entities[i] = brand;
          }
        }
        this.notify.success(this.messages.successUpdate)
      },
      error => {
        this.notify.serviceError(error)
      }
    );
  }

  delete(entity){
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
        this.notify.serviceError(error)
      }
    )
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

  open(){
    this.modal.open();
  }

  onClose() {
    this.closed.emit();
  }
}
