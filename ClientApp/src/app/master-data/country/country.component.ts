import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { th } from 'date-fns/locale';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CountryService } from '../services/country.service';

export interface ICountry {
  countryId: string;
  countryName: string;
  currencyName: string;
  currencyCode: string;
  callingCodesCSV: string;
  flagURL: string;
  currencySymbol: string;
  iso2Code: string;
  iso3Code: string;
  numericCountryCode: string;
  stringCode: string;
}


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  loading = false;
  Countries: ICountry[] = [];
  Country: ICountry = { countryId: "",countryName: "",currencyName: "",currencyCode: "", callingCodesCSV: "",flagURL: "",currencySymbol: "", iso2Code: "",iso3Code:"",numericCountryCode: "", stringCode: ""};
  first = 0;
  rows = 10;
  showDialog: boolean=false;
  submitted: boolean=false;
  displayedColumns: string[] = ['countryId', 'callingCodesCSV', 'countryName', 'currencyCode', 'currencyName', 'stringCode', 'symbol'];

  constructor(public countryService: CountryService
    , private messageService: MessageService, private confirmationService: ConfirmationService) {
  }
  ngOnInit(): void {
    this.loading = true;
    this.getAll();
  }
  getAll(){
    this.countryService.getAll().subscribe((res: any) => {
      this.Countries = res;
      this.loading = false;
      console.log(res)
    })
  }
  public New_Clicked() {
    this.Country = {} as any;
    this.submitted = false;
    this.showDialog = true;
  }
  public Edit_Clicked(country: any) {
    this.Country = { ...country };
    this.showDialog = true;
  }

  public Delete_Clicked(country: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + country.countryName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.countryService.deleteCountry(country.countryId).subscribe((res: any) => {
          this.getAll();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Country Deleted', life: 3000 });
        }, err => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error, life: 3000 });
        });

      }
    });
  }

  public Cancel_Clicked() {
    this.showDialog = false;
    this.submitted = false;
  }

  public Ok_Clicked() {
    debugger
    this.submitted = true;
    if (this.Country.countryName && this.Country.currencyCode && this.Country.currencyName && this.Country.currencyCode
      &&  this.Country.currencySymbol && this.Country.iso2Code) {
      if (this.Country.countryId) {
        this.Update();
      }
      else {
        this.Country.countryId = "";
        this.Create();
      }
    }
  }

  private resetForm() {
    this.Country = { countryId: "", countryName: "", currencyName: "", currencyCode: "", callingCodesCSV: "", flagURL: "", currencySymbol: "", iso2Code: "", iso3Code: "", numericCountryCode: "", stringCode: "" };
  }

  private Create() {
    this.countryService.saveCountry(this.Country).subscribe((res: any) => {
      this.showDialog = false;
      this.resetForm();
      this.getAll();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Country Created Successfully', life: 3000 });
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error, life: 3000 });
    })
  }
  private Update() {
    this.countryService.updateCountry(this.Country).subscribe((res: any) => {
      this.resetForm();
      this.getAll();
      this.showDialog = false;

      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Country Updated Successfully', life: 3000 });
      
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error, life: 3000 });
    })
  }
  private findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Countries.length; i++) {
      if (this.Countries[i].countryId === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
