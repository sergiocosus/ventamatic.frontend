import { VentamaticFrontendPage } from './app.po';

describe('ventamatic-frontend App', function() {
  let page: VentamaticFrontendPage;

  beforeEach(() => {
    page = new VentamaticFrontendPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ventamatic-frontend works!');
  });
});
