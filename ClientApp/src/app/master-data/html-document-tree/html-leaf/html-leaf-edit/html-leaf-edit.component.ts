import { HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { HtmlLeafService } from "src/app/master-data/services/html-leaf.service";
import { HtmlLevelService } from "../../../services/html-level.service";
import { IHtmlLevel } from "../../html-level/IHtmlLevel";
import { IHtmlLeaf } from "../IHtmlLeaf";
// export interface IHtmlLeafExtend extend IHtmlLeaf {

// }
export interface IHtmlLeafExtends extends IHtmlLeaf {
  extendName: string;
}
@Component({
  selector: "app-html-leaf-edit",
  templateUrl: "./html-leaf-edit.component.html",
  styleUrls: ["./html-leaf-edit.component.scss"],
})
export class HtmlLeafEditComponent implements OnInit {
  entities: IHtmlLeafExtends[] = [];
  entitiesLvel: IHtmlLevel[] = [];
  // entity: IHtmlLeaf;
  entity: IHtmlLeaf={ id: 0,parentId: 0,name: "",htmlContent: "",isActive: false};
  submitted: boolean=false;
  loading: boolean = false;
  isDialogVisible: boolean=false;
  message: string="";
  fileName: string="";
  progress: number=0;
  first = 0;
  rows = 10;
  getAllFiles: IHtmlLeaf[] = [];
  displayedColumnsforfiles: string[] = ["id", "fileName", "binaryContent"];

  leafId: number;
  constructor(
    private htmlLevelService: HtmlLevelService,
    private _Activatedroute: ActivatedRoute,
    private htmlLeafService: HtmlLeafService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute
  ) {
   var id = this._Activatedroute.snapshot.paramMap.get("id")==null ? "0" : this._Activatedroute.snapshot.paramMap.get("id")
    this.leafId = parseInt(id);
    //this.leafId = 1;//parseInt(id);
    this.getById(this.leafId);
    this.getAllFilesForLeaf(this.leafId);
  }

  ngOnInit(): void {
    this.entity.id = parseInt( this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.entity.id);
    this.getAll();
    this.getAllLevel();
  }
  getAllLevel() {
    this.loading = true;
    this.htmlLevelService.getAll().subscribe({
      next: (result: IHtmlLevel[]) => {
        this.entitiesLvel = result;
        console.log(result);
      },
      error: (err: any) => this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 5000 })
    })
    this.loading = false;
  }
  getAll() {
    this.loading = true;
    this.htmlLeafService.getAll().subscribe({
      next: (result: any) => {
        var entity: IHtmlLeafExtends;
        this.entities = [];
        result.forEach((element:any) => {
          entity = {
            id: element.id,
            name: element.name,
            parentId: element.parentId,
            htmlContent: element.htmlContent,
            isActive: element.isActive,
            extendName: element.name + "_" + element.id,
          };
          this.entities.push(entity);
          ;
        });
        ;
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
  getById(id: number) {
    this.htmlLeafService.get(id).subscribe((res: IHtmlLeaf) => {
      debugger
     
      this.entity = res;
      //this.entity.id = res.parentId;
      console.log("entity");
      console.log(this.entity);
    });
  }
  getAllFilesForLeaf(id: number) {
    // this.settings.loadingSpinner = true;
    this.loading = true;
    this.htmlLeafService.getAllFilesForLeaf(id).subscribe({
      next: (result: IHtmlLeaf[]) => {
        ;
        this.getAllFiles = result;
        console.log(this.getAllFiles);
        this.isDialogVisible = true;
        this.loading = false;
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
  onFileClick(){

  }
  update(): boolean {
    ;
    this.htmlLeafService.update(this.entity).subscribe({
      next: (result: number) => {
        //    this.entity.id = result;
        this.getAll();
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Updated successfully",
          life: 3000,
        });
        //  window.reloa
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
            this.getAllFilesForLeaf(this.leafId);
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
  submit_clicked() {
    this.submitted = true;
    debugger
    if (this.entity.name) {
      if (this.entity.id) {
        this.update();
        this.getAllFilesForLeaf(this.leafId);
      }
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Name is required",
        life: 5000,
      });
    }
  }
  deletefile(id: number) {
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
  cancel_clicked() {
    this.isDialogVisible = false;
    this.submitted = false;
  }
}
