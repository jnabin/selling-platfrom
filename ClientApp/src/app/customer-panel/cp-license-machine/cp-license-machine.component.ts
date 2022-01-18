import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { LicenseMachineService } from '../../services/license-machine.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-cp-license-machine',
  templateUrl: './cp-license-machine.component.html',
  styleUrls: ['./cp-license-machine.component.scss']
})

export class CpLicenseMachineComponent implements OnInit {

  displayedColumns: string[] = [
    "licenseMachineId",
    "userName",
    "userEmail",
    "computerName",
    "macAddress",
    //"motherboardId",
    "hddSerial"
  ];
  first = 0;
  rows = 5;
  loading: boolean = false;
  LicenseMachines: any;
  private route: ActivatedRoute;
  private id: string;

  constructor(private licenseMachineService: LicenseMachineService,
    private activatedRoute: ActivatedRoute, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    
    debugger
    this.getAllLicenseMachines();
  }

  public Activate_Deactivate_Clicked(LicenseMachine: any) {
    debugger
      this.confirmationService.confirm({
        message: "<b>Are you sure you want to delete the following ? </b><br/>" +
          "<br/><b>License-Machine ID:</b> " + LicenseMachine.licenseMachineId +
          "<br/><b>User Email:</b> " + LicenseMachine.userEmail +
          "<br/><b>UserName:</b> " + LicenseMachine.userName +
          "<br/><b>Computer Name:</b> " + LicenseMachine.computerName+
          "<br/><b>License-Machine ID:</b> " + LicenseMachine.licenseMachineId ,
      header: "Confirm",
      icon: "pi pi-question",
      accept: () => {
        this.licenseMachineService.deleteLicenseMachine(parseInt(LicenseMachine.licenseMachineId)).subscribe((res: any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "License machine deleted",
            life: 3000,
          });
          this.getAllLicenseMachines();
        }, err => {
          this.messageService.add({
            severity: "error",
            summary: "error",
            detail: err.error,
            life: 5000,
          });
        })
      },
    });
  }

  private getAllLicenseMachines() {
    this.licenseMachineService.getAllLicenseMachine(parseInt(this.id)).subscribe((res: any) => {
      debugger
      console.log(this.LicenseMachines)
      this.LicenseMachines = res
      debugger

    }, err => {
      this.messageService.add({
        severity: "error",
        summary: "error",
        detail: err.error,
        life: 5000,
      });
    })
  }
 
}
