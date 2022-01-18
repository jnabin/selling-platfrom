import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form:FormGroup;
  constructor(public user:UserService,public fb: FormBuilder) {

    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: [null, Validators.compose([Validators.required])],
      company: ['']

    });
   }

  ngOnInit(): void {
  }
  public onSubmit(values:Object):void {
    
    if(this.form.valid){
    if (this.form.valid) {
      this.user.register(this.form.value).subscribe(
        (res: any) => {
          alert("Sucessfully register");
        },
        err => {
         
          alert(err.error);
          console.log(err);
        }
      );
    }
  }
  }
}
