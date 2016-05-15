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
import { CreateUserModalComponent } from './create-user-modal.component';

describe('Component: CreateUserModal', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [CreateUserModalComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([CreateUserModalComponent],
      (component: CreateUserModalComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(CreateUserModalComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(CreateUserModalComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-create-user-modal></app-create-user-modal>
  `,
  directives: [CreateUserModalComponent]
})
class CreateUserModalComponentTestController {
}

