import {
  beforeEachProviders,
  describe,
  ddescribe,
  expect,
  iit,
  it,
  inject,
  injectAsync,
  ComponentFixture,
  TestComponentBuilder
} from 'angular2/testing';
import {provide, Component} from 'angular2/core';
import {LoggedInRouterOutlet} from './logged-in-router-outlet.directive';

@Component({
  selector: 'test-component',
  template: `<div logged-in-router-outlet></div>`
})
class TestComponent {}

describe('LoggedInRouterOutlet Directive', () => {

  beforeEachProviders((): any[] => []);


  it('should ...', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    return tcb.createAsync(TestComponent).then((fixture: ComponentFixture) => {
      fixture.detectChanges();
    });
  }));

});
