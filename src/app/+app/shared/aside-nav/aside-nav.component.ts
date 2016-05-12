import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'aside-nav',
  templateUrl: 'aside-nav.component.html',
  styleUrls: ['aside-nav.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AsideNavComponent implements OnInit {
  public routes = [
    {
      name: 'Venta',
      path: '/app/venta'
    },
    {
      name: 'Compra',
      path: '/app/compra'
    },
    {
      name: 'Inventario',
      path: '/app/inventario'
    },
    {
      name: 'Productos',
      path: '/app/productos'
    },
    {
      name: 'Clientes',
      path: '/app/clientes'
    },
    {
      name: 'Proveedores',
      path: '/app/proveedores'
    },
    {
      name: 'Usuarios',
      path: '/app/usuarios'
    },
    {
      name: 'Roles',
      path: '/app/roles'
    },
    {
      name: 'Sucursales',
      path: '/app/sucursales'
    },
    {
      name: 'Reportes',
      path: '/app/reportes'
    }
  ];

  constructor() {}

  ngOnInit() {
  }

}
