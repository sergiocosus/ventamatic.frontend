import { Component, OnInit } from '@angular/core';
import { User } from "../user/user";
import { AuthService } from "../services/auth.service";
import { UserService } from "../user/user.service";
import { Router} from '@angular/router';
import { ProductService } from "../shared/product/product.service";
import { ClientService } from "./+clientes/shared/client.service";
import { BranchService } from "./+sucursales/shared/branch.service";
import { CategoryService } from "../shared/product/category/category.service";
import { InventoryService } from "../shared/inventory/inventory.service";
import { ScheduleService } from "../user/schedule/schedule.service";
import { SupplierService } from "./+proveedores/shared/supplier.service";

@Component({
  selector: 'app-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [
    UserService,
    ProductService,
    ClientService,
    BranchService,
    CategoryService,
    InventoryService,
    ScheduleService,
    SupplierService,
  ]

})

export class AppComponent implements OnInit {

  public time = "8:00pm";

  public user:User;

  constructor(private authService:AuthService,
              private router:Router) {}

  ngOnInit() {
    if(!this.authService.isTokenValid()){
      this.router.navigate(['/login']);
    }else{
      this.user = this.authService.getLoggedUser();
    }
  }

}
