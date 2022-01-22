import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomMessageService } from 'src/app/services/Util/custom-message.service';
import { AuthService } from 'src/app/shared/core/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form:FormGroup;
  constructor(private titleService: Title, public user: UserService, public fb: FormBuilder,
    public router: Router, private authService: AuthService, private messageService:CustomMessageService) {

    this.form = this.fb.group({
      email: ['Admin1@g.com', Validators.compose([Validators.required, Validators.email])],
      password: ['Admin@1234', Validators.compose([Validators.required])] 
    });
   }

  ngOnInit(): void {
    this.titleService.setTitle("Xatocode-Login");
  }
  get f(){
    return this.form.controls;
  }
  onSubmit(form: any) {
   
    if(this.form.valid){
    this.user.login(this.form.value.email,this.form.value.password).subscribe(
      (res: any) => {
        if(res !=null){
           localStorage.setItem('token',res.jwtToken);
           localStorage.setItem('roleName',res.roleName);
          this.authService.nextMessage(res.jwtToken);
            this.router.navigateByUrl(this.authService.redirectUrl);
        } else {
            this.messageService.error("Email or password is incorrect");
        }
      },
      err => {
        this.messageService.error(err);
      }
    );
    } else {
      this.messageService.error("Email or password is incorrect2");
  }
  
  }
}
