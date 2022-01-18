import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import {TableModule} from 'primeng/table';
import { ProductService } from 'src/app/master-data/services/product.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  products: any;
  first = 0;
  rows = 10;
  columns = [
    { field: 'name', header: 'name' },    
    { field: 'productId', header: 'productId' },
    { field: 'description', header: 'description' },
    { field: 'description', header: 'description' }
];
  constructor(private productService: ProductService) { }

  ngOnInit() {
      this.productService.GetAll().subscribe(data => {
        
        this.products = data
      });
  }
  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.products ? this.first === (this.products.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.products ? this.first === 0 : true;
}
}