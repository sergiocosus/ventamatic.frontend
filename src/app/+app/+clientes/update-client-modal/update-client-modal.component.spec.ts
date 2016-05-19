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
import { UpdateClientModalComponent } from './update-client-modal.component';

describe('Component: UpdateClientModal', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [UpdateClientModalComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([UpdateClientModalComponent],
      (component: UpdateClientModalComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(UpdateClientModalComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(UpdateClientModalComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-update-client-modal></app-update-client-modal>
  `,
  directives: [UpdateClientModalComponent]
})
class UpdateClientModalComponentTestController {
}

