import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/master-data/services/product.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  products: any;
  first = 0;

  rows = 10;
  constructor(private productService: ProductService) { }

  ngOnInit() {
      this.productService.GetAll().subscribe(data => {
        
        this.products = data
      });
  }
//   next() {
//     this.first = this.first + this.rows;
// }

// prev() {
//     this.first = this.first - this.rows;
// }

// reset() {
//     this.first = 0;
// }

}