import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormValidatorService } from '../../services/Util/form-validator.service';
import { AuthService } from '../../shared/core/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public form: FormGroup;
  constructor(private titleService: Title, public user: UserService, public fb: FormBuilder,
    public router: Router, private authService: AuthService, private messageService: MessageService, private formValidator: FormValidatorService) {

    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      oldPassword: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      confirmPassword: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Xatocode-Login");
  }
  get f() {
    return this.form.controls;
  }
  onSubmit(form: any) {
    debugger
    if (this.form.valid) {
      this.user.changePassword(this.form.value).subscribe(
        (res: any) => {
          alert("Password changed successfully")
          this.router.navigateByUrl("/login");
        },
        err => {
          console.log(err)
          debugger
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error, life: 3000 });
          alert(err.error)
        }
      );
    } else {
      this.formValidator.validateAllFormFields(this.form);
    }

  }

 
}
