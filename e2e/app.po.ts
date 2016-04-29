export class VentamaticFrontendPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ventamatic-frontend-app p')).getText();
  }
}
