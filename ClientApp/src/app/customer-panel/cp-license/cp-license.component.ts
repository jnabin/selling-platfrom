import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/customer';
import { CustomerService } from 'src/app/customerService';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-cp-license',
  templateUrl: './cp-license.component.html',
  styleUrls: ['./cp-license.component.scss']
})
export class CpLiscenseComponent implements OnInit {
  displayedColumns: string[] = [
    "licenseId",
    "appUserId",
    "orderId",
    "product",
    "subscriptionType",
    "licenseCount",
  ];
  first = 0;
  rows = 5;
  loading: boolean = false;
  Licenses: any;//Customer[]=[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getAllLicense().subscribe((res: any) => {
      debugger;
      this.Licenses = res
      console.log(this.Licenses)
      },err=>{
      console.log(err);
      })
  }
  //showLicenseMachine(id: any) {
  //  alert('id=' + id);
  //  this.router.navigate(['my-license-machine/' + id]);
  //  debugger
  //}
}
