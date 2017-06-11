
import {EventEmitter, Output} from '@angular/core';
import {NotifyService} from '../../services/notify.service';
import {MdDialogRef} from '@angular/material';

export abstract class CrudModalComponent {
  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() deleted = new EventEmitter();

  name: String;

  updateMode = false;
  createMode = false;
  deleteMode = false;
  locked = false;

  constructor(protected notfiy: NotifyService,
              protected dialogRef: MdDialogRef<CrudModalComponent>) {}

  initCreate() {
    this.createMode = true;
    this.updateMode = false;
    this.deleteMode = false;
    this.unlock();
  }

  initUpdate(any?) {
    this.createMode = false;
    this.updateMode = true;
    this.deleteMode = false;
    this.lock();
  }

  initDelete(any) {
    this.createMode = false;
    this.updateMode = false;
    this.deleteMode = true;
    this.unlock();
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    this.locked = false;
  }

  close() {
    return this.dialogRef.close();
  }

  delayClose() {
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

  submit() {
    if (this.createMode) {
      this.create();
    }

    if (this.updateMode) {
      this.update();
    }

    if (this.deleteMode) {
      this.delete();
    }
  }

  abstract create();
  abstract update();
  abstract delete();
}

