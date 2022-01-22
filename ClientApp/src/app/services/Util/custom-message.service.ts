import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {
  messageLife = 3000;
  constructor(
    private messageService: MessageService
  ) { }

  success(message:string){
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: message,
      life: this.messageLife,
    });
  }

  error(error:any){
    if(typeof error == "object"){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error,
        life: this.messageLife,
      });
    }else{
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error,
        life: this.messageLife,
      });
    }
    
  }
}
