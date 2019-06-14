import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean;
  form: FormGroup;

  constructor(private router: Router,
              private authService: AuthService,
              private notify: NotifyService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [],
      password: [],
    });
  }

  ngOnInit() {
  }


  onSubmit() {
    const data = this.form.getRawValue();

    this.loading = true;
    this.authService.login(data.username, data.password)
      .pipe(finalize(() => this.loading = false))
      .subscribe(user => {
          this.router.navigate(['/']);
          this.notify.info('Bienvenido', user.fullName);
        },
        error => this.notify.serviceError(error)
      );
  }

}
