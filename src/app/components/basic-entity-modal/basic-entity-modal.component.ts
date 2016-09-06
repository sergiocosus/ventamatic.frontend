import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {BrandService} from "../../shared/product/brand/brand.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {NotifyService} from "../../services/notify.service";
import {BasicEntityService} from "./basic-entity-service";
import {SupplierCategoryService} from "../../+app/+proveedores/category/supplier-category.service";
import {CategoryService} from "../../shared/product/category/category.service";

@Component({
  selector: 'app-basic-entity-modal',
  templateUrl: './basic-entity-modal.component.html',
  styleUrls: ['./basic-entity-modal.component.scss']
})
export class BasicEntityModalComponent implements OnInit {
  @ViewChild(ModalComponent) protected modal:ModalComponent;
  @Input() mode;

  service:BasicEntityService;


  entities:any[];
  title:string = 'Marcas';

  entity:any = {
    name : null
  };

  messages = {
    successCreate: 'Creado exitosamente',
    successUpdate: 'Actualizado exitosamente',
    successDelete: 'Eliminado exitosamente'
  }




  constructor(private brandService:BrandService,
              protected categoryService: CategoryService,
              protected supplierCategoryService: SupplierCategoryService,
              private noty:NotifyService) { }

  ngOnInit() {
    switch (this.mode) {
      case 'brand':
        this.service = this.brandService;
        this.title = 'Marca';
        break;
      case 'category':
        this.service = this.categoryService;
        this.title = 'Categoría'
        break;
      case 'supplierCategory':
        this.service = this.supplierCategoryService;
        this.title = 'Categoría de proveedor';
        break;
    }

    this.service.getAll().subscribe(
      brands => {
        this.entities = brands;
      }
    )
  }

  create(){
    this.service.post(this.entity).subscribe(
      entity => {
        this.entities.push(entity);
        this.entity = { name : null };
        this.noty.success(this.messages.successCreate)
      },
      error => {
        this.noty.serviceError(error)
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
        this.noty.success(this.messages.successUpdate)
      },
      error => {
        this.noty.serviceError(error)
      }
    );
  }

  delete(entity){
    this.service.delete(entity.id).subscribe(
      success => {
        var index = this.entities.indexOf(entity);
        if (index > -1) {
          this.entities.splice(index, 1);
        }
        this.noty.success(this.messages.successDelete);
      },
      error => {
        this.noty.serviceError(error)
      }
    )
  }

  open(){
    this.modal.open();
  }

  closed(){

  }
}
