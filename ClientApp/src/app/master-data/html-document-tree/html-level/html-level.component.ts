import { Component, OnInit } from '@angular/core';
import { subMinutes } from 'date-fns';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HtmlLevelService } from '../../services/html-level.service';
import { IHtmlLevel } from './IHtmlLevel';

@Component({
  selector: 'app-html-level',
  templateUrl: './html-level.component.html',
  styleUrls: ['./html-level.component.scss']
})
export class HtmlLevelComponent implements OnInit {
  entities:IHtmlLevel[] =[];
  entity:IHtmlLevel={id:0,parentId:0,name:"",description:""};
  submitted: boolean=false;
  loading: boolean = false;  
  isDialogVisible:boolean=false;
  first = 0;
  rows = 10;
  displayedColumns: string[] = [
    "affiliateId",
    "name",
    "contact",
    "description",
    "isActive",
  ];
  constructor(private htmlLevelService:HtmlLevelService, 
    private messageService: MessageService, private confirmationService: ConfirmationService) {
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading=true;
    this.htmlLevelService.getAll().subscribe({
      next:(result:IHtmlLevel[])=>{
        this.entities=result;
        ;
        console.log(result);
      },
      error:(err:any)=>this.messageService.add({severity:'error', summary: 'Error', detail: err, life: 5000})
    })
    this.loading=false;
  }

  create(){
    this.htmlLevelService.create(this.entity).subscribe({
      next:(result:IHtmlLevel[])=>{
        this.getAll();
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Created successfully', life: 3000});
      },
      error:err=>this.messageService.add({severity:'error', summary: 'Error', detail: err, life: 5000})
    });
  }

  update(){
    this.htmlLevelService.update(this.entity).subscribe({
      next:(result:IHtmlLevel[])=>{
        this.getAll();
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Updated successfully', life: 3000});
      },
      error:err=>this.messageService.add({severity:'error', summary: 'Error', detail: err, life: 5000})
    });
  }

  delete(id:number){
    ;
    this.htmlLevelService.delete(id).subscribe({
      next:(result:any)=>{
        this.getAll();
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Deleted Successfully', life: 3000});
      },
      error:err=>this.messageService.add({severity:'error', summary: 'Error', detail: err, life: 5000})
    });
  }

  new_clicked() {
    this.entity = {} as IHtmlLevel;
    this.submitted = false;
    this.isDialogVisible = true;
  }

  edit_clicked(entity: IHtmlLevel) {
    this.entity = {...entity}; // shallow copy to avoid change in table when changed in form
    this.isDialogVisible = true;
  }
  
  delete_clicked(entity: IHtmlLevel) {
    ;
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + entity.name +'  (id='+entity.id+')' + ' ?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.delete(entity.id);
        }
    });
  }

  submit_clicked() {
    this.submitted = true;
    ;
    if (this.entity.name) {
        if (this.entity.id) {
           this.update();
        }
        else {
            //this.product.productId = "";
            this.create();
        }
        //this.products = [...this.products];
        this.isDialogVisible = false;
        this.entity = {} as any;
    }
  }

  cancel_clicked() {
    this.isDialogVisible = false;
    this.submitted = false;
  }
  

}



