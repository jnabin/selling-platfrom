import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FormValidatorService } from '../../services/Util/form-validator.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public form: FormGroup;

  constructor(private user: UserService, public fb: FormBuilder, private messageService: MessageService, private formValidator: FormValidatorService) {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit(): void {
  }
  get f() {
    return this.form.controls;
  }
  forgotPassword(form: any) {
    if (this.form.valid) {
      this.user.forgotPassword(this.form.value).subscribe(
        (res: any) => {
          alert("Email Send successfully")

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

