import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetail } from '../model/user-detail.model';
import { MachineLicense } from '../services/machineLicense.service';
export interface LicenseMachine {
  LicenseId:number;
  LicenseMachineId:number;
  ComputerName: string;
  HDDSerial: string;
  MACAddress: string;
  MotherboardId: string;
  UserEmail:string;
  UserName:string;
}
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['LicenseMachineId','ComputerName', 'HDDSerial', 'MACAddress', 'MotherboardId', 'Action'];
 // dataSource = new MatTableDataSource(posts1);

  dtOptions: any = [];
  dtTrigger:Subject<any>= new Subject();
  data:any;
 
  public userDetail:UserDetail =new UserDetail();
  public machineLicense:MachineLicense
  constructor(private http: HttpClient, _machineLicense:MachineLicense) {
      this.machineLicense = _machineLicense; 
  }
  ngOnInit(): void {
   
   
  }
  verifyDetail(data:any){
    this.userDetail.Email = data.Email;
    this.userDetail.Phone = data.PhoneNumber; 
    
    this.getMachineLicenseData(data.LicenseId);
  }
  delete(action:any,obj:any){
    
    // this.getMachineLicenseData(obj);
  }
  getMachineLicenseData(id:any){
    this.machineLicense.getMachineLicense(id).subscribe((res:any) =>{
      ;
     
    })
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
  }
}