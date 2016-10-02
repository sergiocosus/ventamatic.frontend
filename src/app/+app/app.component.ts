import {Component, OnInit, OnDestroy} from '@angular/core';
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
import {SubscriptionManager} from "../classes/subscription-manager";

@Component({
  selector: 'app-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  public user:User;
  private sub = new SubscriptionManager();

  constructor(private authService:AuthService,
              private router:Router) {}

  ngOnInit() {
    var subUser = this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );
    this.authService.updateLoggedUserObservable();

    this.sub.push(subUser);
  }

  ngOnDestroy(){
    this.sub.clear();
  }

}
