import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
    public router: Router, private authService: AuthService, private messageService:MessageService) {

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
            debugger;
            this.router.navigateByUrl(this.authService.redirectUrl);
        } else {
          debugger
            this.messageService.add({ severity: 'error', summary: '', detail: "Email or password is incorrect", life: 3000 });
            alert("Email or password is incorrect0")
        }
      },
      err => {
        console.log(err)
        debugger
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error, life: 3000 });
        alert(err.error)
      }
    );
    } else {
      debugger
      alert("Email or password is incorrect2")
  }
  
  }
}
