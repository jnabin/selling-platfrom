import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../services/product.service';

export interface IProduct {
  productId: string;
  name: string;
  description: string;
  isActive:boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  showDialog: boolean=false;
  Products: IProduct[] = [];
  Product: IProduct= { productId: "",name: "",description: "",isActive: false};
  selectedProducts: any = [];
  displayedColumns: string[] = ["productId", "name", "description", "isActive"];
  first = 0;
  rows = 10;
  submitted: boolean= false;
  loading: boolean = false;
  constructor(
    private http: HttpClient,
    public productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }
  ngOnInit(): void {
    this.GetAll();
  }
  
  public New_Clicked() {
    this.Product = {} as any;
    this.submitted = false;
    this.showDialog = true;
  }
  public Edit_Clicked(product: any) {
    this.Product = { ...product };
    this.showDialog = true;
  }

  public Delete_Clicked(product: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + product.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        ;
        this.productService.deleteProduct(product.productId).subscribe(
          (res: any) => {
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Product Deleted",
              life: 3000,
            });
            this.GetAll();
          },
          (err) => {
            console.log(err);
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: err.error,
              life: 3000,
            });
          }
        );
      },
    });
  }

  public Cancel_Clicked() {
    this.showDialog = false;
    this.submitted = false;
  }

  public Ok_Clicked() {
    this.submitted = true;
    if (this.Product.name && this.Product.description) {
      if (this.Product.productId) {
        this.Update();
      } else {
        this.Product.productId = "";
        this.Create();
      }
    }
  }
  private GetAll() {
    this.productService.GetAll().subscribe((res: any) => {
      this.Products = res;
      console.log(res);
    });
  }
  private Create() {
    this.productService.saveProduct(this.Product).subscribe(
      (resp: any) => {
        this.Products.push(this.Product);
        this.GetAll();
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
        this.showDialog = false;
        this.Product = {} as any;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  private Update() {
    this.productService.updateProduct(this.Product).subscribe(
      (resp: any) => {
        this.Products[this.findIndexById(this.Product.productId)] =
          this.Product;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
        this.showDialog = false;
        this.Product = {} as any;
      },
      (err) => {
        ;
        console.log(err);
      }
    );
  }
 private findIndexById(id: string): number {
    let index = -1;
   for (let i = 0; i < this.Products.length; i++) {
      if (this.Products[i].productId === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
