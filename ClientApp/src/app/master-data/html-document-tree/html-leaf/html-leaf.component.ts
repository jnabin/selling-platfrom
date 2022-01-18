import { Component, OnInit } from "@angular/core";
import { subMinutes } from "date-fns";
import { ConfirmationService, MessageService } from "primeng/api";
import { HtmlLeafService } from "../../services/html-leaf.service";
import { IHtmlLeaf } from "./IHtmlLeaf";

import { HttpEventType } from "@angular/common/http";
import { HtmlLevelService } from "../../services/html-level.service";
import { IHtmlLevel } from "../html-level/IHtmlLevel";

@Component({
  selector: "app-html-leaf",
  templateUrl: "./html-leaf.component.html",
  styleUrls: ["./html-leaf.component.scss"],
})
export class HtmlLeafComponent implements OnInit {
  entities: IHtmlLeaf[] = [];
  entity: IHtmlLeaf={ id: 0,parentId: 0,name: "",htmlContent: "",isActive: false};
  submitted: boolean=false;
  loading: boolean = false;
  isDialogVisible: boolean=false;
  message: string="";
  fileName: string="";
  progress: number=0;
  first = 0;
  rows = 100;
  getAllFiles: IHtmlLeaf[] = [];

  displayedColumnsforfiles: string[] = ["id", "fileName", "binaryContent"];
    entitiesLvel: IHtmlLevel[];
  constructor(
    private htmlLevelService: HtmlLevelService,
    private htmlLeafService: HtmlLeafService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.getAllLevel();
  }
  getAllLevel() {
    this.loading = true;
    this.htmlLevelService.getAll().subscribe({
      next: (result: IHtmlLevel[]) => {
        this.entitiesLvel = result;
        this.entity.parentId = 0;
        console.log(result);
      },
      error: (err: any) => this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 5000 })
    })
    this.loading = false;
  }
  onFileClick() {
    ;
    if (!this.entity.name) {
      this.messageService.add({
        severity: "information",
        summary: "Status",
        detail: "Please save it first an open as edit befor uploading any file",
        life: 5000,
      });
      return;
    }
  }
  onFileUpload(files: any) {
    ;
    if (!this.entity.name) {
      this.messageService.add({
        severity: "information",
        summary: "Status",
        detail: "Please save it first an open as edit befor uploading any file",
        life: 5000,
      });
      return;
    }

    const file: File = files[0];

    if (file) {
      this.fileName = file.name;

      const upload$ = this.htmlLeafService.uploadFile(file, this.entity);
      upload$.subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.message = "Upload complete";
            this.messageService.add({
              severity: "information",
              summary: "Success",
              detail: "Uploaded",
              life: 5000,
            });
            // TODO this.onUploadFinished.emit(event.body);
          }
        },
        error: (err) => {
          ;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err,
            life: 5000,
          });
        },
      });
    }
  }
  getAll() {
    this.loading = true;
    this.htmlLeafService.getAll().subscribe({
      next: (result: IHtmlLeaf[]) => {
        ;
        this.entities = result;
        console.log(result);
      },
      error: (err: any) =>
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err,
          life: 5000,
        }),
    });
    this.loading = false;
  }
  getAllFilesForLeaf(id: number) {
    this.htmlLeafService.getAllFilesForLeaf(id).subscribe({
      next: (result: IHtmlLeaf[]) => {
        ;
        this.getAllFiles = result;
        console.log("yes");
        console.log(this.getAllFiles);
        this.isDialogVisible = true;
      },
      error: (err: any) =>
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err,
          life: 5000,
        }),
    });
  }

  create() {
    debugger
    this.entity.isActive= this.entity.isActive[0] == 'Active' ? true : false;
    this.htmlLeafService.create(this.entity).subscribe({
      next: (result: IHtmlLeaf[]) => {
        this.getAll();
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Created successfully",
          life: 3000,
        });
      },
      error: (err) =>
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err,
          life: 5000,
        }),
    });
  }

  update(): boolean {
    this.htmlLeafService.update(this.entity).subscribe({
      next: (result: number) => {
        this.entity.id = result;
        this.getAll();
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Updated successfully",
          life: 3000,
        });
        return true;
      },
      error: (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err,
          life: 5000,
        });
        return false;
      },
    });
    return false;
  }

  delete(id: number) {
    ;
    this.htmlLeafService.delete(id).subscribe({
      next: (result: any) => {
        this.getAll();
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Deleted Successfully",
          life: 3000,
        });
      },
      error: (err) =>
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err,
          life: 5000,
        }),
    });
  }
  deletefile(id: number) {
    ;
    this.htmlLeafService.deletefile(id).subscribe({
      next: (result: any) => {
        this.getAll();
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Deleted Successfully",
          life: 3000,
        });
      },
      error: (err) =>
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err,
          life: 5000,
        }),
    });
  }

  new_clicked() {
    this.entity = {} as IHtmlLeaf;
    this.submitted = false;
    this.isDialogVisible = true;
  }

  edit_clicked(entity: IHtmlLeaf) {
    this.entity = { ...entity }; // shallow copy to avoid change in table when changed in form
    this.getAllFilesForLeaf(this.entity.id);
  }

  delete_clicked(entity: IHtmlLeaf) {
    ;
    this.confirmationService.confirm({
      message:
        "Are you sure you want to delete " +
        entity.name +
        "  (id=" +
        entity.id +
        ")" +
        " ?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.delete(entity.id);
      },
    });
  }
  delete_file_clicked(file: IHtmlLeaf) {
    ;
    this.confirmationService.confirm({
      message:
        "Are you sure you want to delete " +
        file.name +
        "  (id=" +
        file.id +
        ")" +
        " ?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deletefile(file.id);
      },
    });
  }
  submit_clicked() {
    this.submitted = true;
    ;
    if (this.entity.name) {
      if (this.entity.id) {
        this.update();
      } else {
        //this.product.productId = "";
        this.create();
      }
      //this.products = [...this.products];
      this.isDialogVisible = false;
      this.entity = {} as any;
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Name is required",
        life: 5000,
      });
    }
  }

  cancel_clicked() {
    this.isDialogVisible = false;
    this.submitted = false;
  }
}
