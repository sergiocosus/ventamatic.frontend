/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
};

/** User packages configuration. */
const packages: any = {
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
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/+login',
  'app/+app',
  'app/+app/+usuarios',
  'app/+app/+venta',
  'app/+app/+compra',
  'app/+app/+inventario',
  'app/+app/+productos',
  'app/+app/+clientes',
  'app/+app/+proveedores',
  'app/+app/+reportes',
  'app/+app/+roles',
  'app/+app/+sucursales',
  'app/+app/shared/aside-nav',
  'app/+app/+usuarios/user-item',
  'app/+app/shared/search-bar',
  'app/+app/+usuarios/create-user-modal',
  'app/+app/+usuarios/update-user-modal',
  'app/floating-label',
  'app/components/floating-label',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {
  'ng2-bs3-modal': {
    defaultExtension: 'js',
    main: 'ng2-bs3-modal.js'
  },
  'angular2-notifications': {
    defaultExtension: 'js',
    main: 'components.js'
  }
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
    'angular2-jwt/angular2-jwt': 'vendor/angular2-jwt/angular2-jwt.js',
    'ng2-bs3-modal': 'vendor/ng2-bs3-modal',
    'angular2-notifications': 'vendor/angular2-notifications'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
