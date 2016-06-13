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
import { AutocompleteInputComponent } from './autocomplete-input.component';

describe('Component: AutocompleteInput', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [AutocompleteInputComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([AutocompleteInputComponent],
      (component: AutocompleteInputComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(AutocompleteInputComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(AutocompleteInputComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-autocomplete-input></app-autocomplete-input>
  `,
  directives: [AutocompleteInputComponent]
})
class AutocompleteInputComponentTestController {
}

