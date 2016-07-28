// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'angular2-jwt/angular2-jwt': 'vendor/angular2-jwt/angular2-jwt.js',
  'angular2-notifications': 'vendor/angular2-notifications',
  'ng2-bootstrap':'vendor/ng2-bootstrap',
  'ng2-bs3-modal': 'vendor/ng2-bs3-modal',
  'moment': 'vendor/moment/moment.js',
  'primeng': 'vendor/primeng'
};

/** User packages configuration. */
const packages: any = {
  moment:{
    format: 'cjs'
  },
  'angular2-notifications': {
    defaultExtension: 'js',
    main: 'components.js'
  },
  'ng2-bs3-modal': {
    defaultExtension: 'js',
    main: 'ng2-bs3-modal.js'
  },
  'ng2-bootstrap': {
    defaultExtension: 'js',
    main: 'ng2-bootstrap.js'
  },
  'primeng': {
    defaultExtension: 'js',
    main: 'primeng.js'
  },
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/+login',
  'app/+app',
  'app/+app/+clientes',
  'app/+app/+clientes/client-item',
  'app/+app/+clientes/client-modal',
  'app/+app/+compra',
  'app/+app/+inventario',
  'app/+app/+proveedores',
  'app/+app/+productos',
  'app/+app/+proveedores/supplier-item',
  'app/+app/+proveedores/supplier-modal',
  'app/+app/+reportes',
  'app/+app/+roles',
  'app/+app/+sucursales',
  'app/+app/+usuarios',
  'app/+app/+usuarios/user-item',
  'app/+app/+usuarios/user-modal',
  'app/+app/+venta',
  'app/+app/shared/aside-nav',
  'app/+app/shared/search-bar',
  'app/components/floating-label',
  'app/components/person-item',
  'app/components/crud-modal',
  'app/floating-label',
  'app/shared',
  'app/shared/main-content',
  'app/+app/+venta/select-branch',
  'app/+app/+venta/sale',
  'app/autocomplete-input',
  'app/components/autocomplete-input',
  'app/product-inventario',
  'app/+app/+inventario/modal-inventario',
  'app/+app/+venta/sale-confirm-modal',
  'app/+app/shared/top-bar',
  'app/user/schedule/schedule-modal',
  'app/user/schedule/end-schedule-modal',
  'app/+app/+sucursales/branch-modal',
  'app/components/input-label',
  'app/+app/+sucursales/branch-item',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {

};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js',
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
