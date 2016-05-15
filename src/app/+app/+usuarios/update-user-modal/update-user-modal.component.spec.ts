import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UpdateUserModalComponent } from './update-user-modal.component';

describe('Component: UpdateUserModal', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [UpdateUserModalComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([UpdateUserModalComponent],
      (component: UpdateUserModalComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(UpdateUserModalComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(UpdateUserModalComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-update-user-modal></app-update-user-modal>
  `,
  directives: [UpdateUserModalComponent]
})
class UpdateUserModalComponentTestController {
}

