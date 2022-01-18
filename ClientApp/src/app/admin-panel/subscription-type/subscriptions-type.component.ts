import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/master-data/services/product.service';

export interface IProduct {
  productId:string;
  name: string;
  description: string;
  isActive:boolean;
}
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions-type.component.html',
  styleUrls: ['./subscriptions-type.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class SubscriptionsComponent implements OnInit {
  productDialog: boolean=false;

  products: IProduct[]=[];

  product: IProduct= {productId:"", name: "",description: "",isActive:false};

  selectedProducts: any=[];
  displayedColumns: string[] = ['productId','name','description', 'isActive'];
  submitted: boolean=false;

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.productService.GetAll().subscribe((res:any)=>{
        console.log(res)
this.products =res;
      })
  }

  openNew() {
      this.product = {} as any;
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => !this.selectedProducts.includes(val));
              this.selectedProducts = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
          }
      });
  }

  editProduct(product: any) {
      this.product = {...product};
      this.productDialog = true;
  }

  deleteProduct(product: any) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => val.productId !== product.id);
              this.product = {} as any;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  
  saveProduct() {
      this.submitted = true;

      if (this.product.name.trim()) {
          if (this.product.productId) {
              this.products[this.findIndexById(this.product.productId)] = this.product;                
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          }
          else {
              this.product.productId = "";
              this.products.push(this.product);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {} as any;
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].productId === id) {
              index = i;
              break;
          }
      }

      return index;
  }
}
