
import {EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs4-modal/ng2-bs4-modal";
import {NotifyService} from "../../services/notify.service";

export abstract class CrudModalComponent {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() deleted = new EventEmitter();

  name:String;

  updateMode:boolean = false;
  createMode:boolean = false;
  deleteMode:boolean = false;
  locked: boolean = false;

  constructor(protected notfiy:NotifyService) {}

  openCreate(){
    this.createMode = true;
    this.updateMode = false;
    this.deleteMode = false;
    this.unlock();
    this.modal.open();
  }

  openUpdate(any?){
    this.createMode = false;
    this.updateMode = true;
    this.deleteMode = false;
    this.lock();
    this.modal.open();
  }

  openDelete(any){
    this.createMode = false;
    this.updateMode = false;
    this.deleteMode = true;
    this.unlock();
    this.modal.open();
  }

  lock(){
    this.locked = true;
  }

  unlock(){
    this.locked = false;
  }

  close(){
    return this.modal.close();
  }

  delayClose(){
    setTimeout(() => this.close(), 500);
  }

  protected createdSuccess(data) {
    this.created.emit(data);
    this.close();
    this.notfiy.success(`${this.name} creado`);

  }

  protected updatedSuccess(data) {
    this.updated.emit(data);
    this.close();
    this.notfiy.success(`${this.name} modificado`);
  }

  protected deletedSuccess(data) {
    this.deleted.emit(data);
    this.close();
    this.notfiy.success(`${this.name} eliminado`);
  }

  submit(){
    if(this.createMode) this.create();
    if(this.updateMode) this.update();
    if(this.deleteMode) this.delete();
  }

  abstract create();
  abstract update();
  abstract delete();

}

