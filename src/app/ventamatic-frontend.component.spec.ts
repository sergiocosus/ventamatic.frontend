import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { VentamaticFrontendAppComponent } from '../app/ventamatic-frontend.component';

beforeEachProviders(() => [VentamaticFrontendAppComponent]);

describe('App: VentamaticFrontend', () => {
  it('should create the app',
      inject([VentamaticFrontendAppComponent], (app: VentamaticFrontendAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ventamatic-frontend works!\'',
      inject([VentamaticFrontendAppComponent], (app: VentamaticFrontendAppComponent) => {
    expect(app.title).toEqual('ventamatic-frontend works!');
  }));
});
