import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-account-activate',
  templateUrl: './account-activate.component.html',
  styleUrls: ['./account-activate.component.scss']
})
export class AccountActivateComponent implements OnInit {
  id: string
  isActivated: boolean
  isError: boolean
  error:string
  activatedEmail:string
  constructor(private activatedRoute: ActivatedRoute, private accountService: UserService, private messageService: MessageService) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    debugger
    accountService.Activate(this.id).subscribe(
      (res: any) => {
        debugger
        this.activatedEmail=res
        this.isActivated = true
      },
      (err: any) => {
        debugger
        this.isError = true
        this.error = err.error;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error, life: 3000 });
      }
    )
  }

  ngOnInit(): void {
  }

}
