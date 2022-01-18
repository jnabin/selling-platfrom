import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CreateTempUserService } from '../../services/create-temp-user.service';
import { AuthService } from '../../shared/core/auth.service';

@Component({
  selector: 'app-create-temp-user',
  templateUrl: './create-temp-user.component.html',
  styleUrls: ['./create-temp-user.component.scss']
})
export class CreateTempUserComponent implements OnInit {
  type:string = '';
  tempUserForm: FormGroup;
  loading = false;
  tempUserCreated: boolean = false;
  
  public form: FormGroup ;

  constructor(
    public formBuilder: FormBuilder, 
    private authService: AuthService, 
    public router: Router, 
    public createTempUserService: CreateTempUserService, 
    private messageService: MessageService,
    private activeRoute: ActivatedRoute) {
    this.form = this.formBuilder.group({
      Email: [null, [Validators.required]], 
    });
  }

  ngOnInit(): void {
    this.tempUserForm = new FormGroup({
      Email: new FormControl()
    });
    if (this.authService.isAuthenticated()) {
      this.activeRoute.queryParams.subscribe(params => {
        if(params['type'] as string == 'm'){
          this.router.navigate(['/checkout'], { queryParams: { type: 'm' } });
        }else{
          this.router.navigate(['/checkout'], { queryParams: { type: 'y' } });
        }
      }); 
    }
  }

  onSubmit() :void{
    if (this.tempUserForm.valid) {
      this.loading = true;
      this.createTempUserService.createTempUser(this.tempUserForm.value.Email).subscribe((res: any) => {
        this.loading = false;
        this.tempUserCreated = true;
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error, life: 3000 });
        this.loading = false;
      })
    } else {
      this.loading = false;
    }
  }
}
