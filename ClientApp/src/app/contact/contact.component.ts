import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../account/service/user.service';
import { ContactService } from '../services/contact.service';
import { AuthService } from '../shared/core/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public isSubmitted = false;
  public form: FormGroup;
  constructor(
    private titleService: Title,
    public contact: ContactService,
    public fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      Token : ['', Validators.required],
      Name: ['', Validators.compose([Validators.required])],
      Email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      Phone: ['', Validators.compose([Validators.required])],
      Subject: ['', Validators.compose([Validators.required])],
      Message: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Xatocode-Login');
  }
  get f() {
    return this.form.controls;
  }
  onSubmit(form: any) {
    if (this.form.valid) {
      this.contact.Create(this.form.value).subscribe(
        (res: any) => {
          // this.messageService.add({
          //   severity: 'success',
          //   summary: 'Success',
          //   detail: 'Created successfully',
          //   life: 3000,
          // });
          this.isSubmitted = true;
         // this.SubscriptionType = {} as any;
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Message sent successfully",
            life: 3000,
          });
        },
        (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error,
            life: 3000,
          });
        }
      );
    } else {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong',
        life: 3000,
      });
    }
  }
}
