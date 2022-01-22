import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CustomMessageService } from 'src/app/services/Util/custom-message.service';
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
    public router: Router, private authService: AuthService, private messageService: CustomMessageService, private formValidator: FormValidatorService) {

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
          this.messageService.error(err);
        }
      );
    } else {
      this.formValidator.validateAllFormFields(this.form);
    }
  }

 
}
