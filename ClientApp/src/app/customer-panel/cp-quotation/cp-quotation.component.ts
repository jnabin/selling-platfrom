import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationService } from '../../services/quotation.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './cp-quotation.component.html',
  styleUrls: ['./cp-quotation.component.scss']
})
export class CpQuotationComponent implements OnInit {

  displayedColumns: string[] = [
    "orderId",
    "iso2Code",
    "product",
    "subscriptionType",
    "priceUSD",
    "discountPercent",
    "gstPercent",
    "grandTotalUSD",
    "createdDateUTC",
    "active"
  ];
  display: boolean = false;
  first = 0;
  rows = 5;
  loading: boolean = false;
  Quotations: any;

  constructor(private quotationService: QuotationService, private router:Router) {}

  showDialog() {
      this.display = true;
  }

  navigateToCheckout(id:any, isoCode:any){
    this.router.navigate(['/quotation-checkout'], {queryParams: {id:id, isoCode:isoCode}});
  }

  ngOnInit() {

    debugger
    this.quotationService.GetAll().subscribe((res: any) => {
      debugger
      console.log(this.Quotations)
      this.Quotations = res
      debugger

    }, err => {
      console.log(err);
    })
  }

}
