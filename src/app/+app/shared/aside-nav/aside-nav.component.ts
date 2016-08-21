import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aside-nav',
  templateUrl: 'aside-nav.component.html',
  styleUrls: ['aside-nav.component.scss'],
})
export class AsideNavComponent implements OnInit {
  public routes = [
    {
      name: 'Venta',
      path: '/app/venta',
      icon: 'fa-cart-arrow-down'
    },
    {
      name: 'Compra',
      path: '/app/compra',
      icon: 'fa-shopping-cart'
    },
    {
      name: 'Inventario',
      path: '/app/inventario',
      icon: 'fa-list-ul'
    },
    {
      name: 'Productos',
      path: '/app/productos',
      icon: 'fa-shopping-bag'
    },
    {
      name: 'Clientes',
      path: '/app/clientes',
      icon: 'fa-user'
    },
    {
      name: 'Proveedores',
      path: '/app/proveedores',
      icon: 'fa-user-secret'
    },
    {
      name: 'Usuarios',
      path: '/app/usuarios',
      icon: 'fa-users'
    },
    {
      name: 'Roles',
      path: '/app/roles',
      icon: 'fa-lock'
    },
    {
      name: 'Sucursales',
      path: '/app/sucursales',
      icon: 'fa-industry'
    },
    {
      name: 'Reportes',
      path: '/app/reportes',
      icon: 'fa-line-chart'
    }
  ];

  constructor() {}

  ngOnInit() {
  }

}
