import { HttpClient, HttpEventType, HttpRequest } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-file-uplodad-testing",
  templateUrl: "./file-uplodad-testing.component.html",
  styleUrls: ["./file-uplodad-testing.component.scss"],
})
export class FileUplodadTestingComponent implements OnInit {
  baseUrl: string = "https://localhost:44357/api/FileUploadTesting";
  progress: any;
  profileForm: any = FormGroup;
  @ViewChild("labelImport", { static: true })
  labelImport: any = ElementRef;
  getFiles: any;
  htmlContent: any;
  //#region  primeNG grid setting
  subscriptionTypeDialog: boolean=false;
  subscriptionType: any;
  selectedsubScriptionType: any = [];
  displayedColumns: string[] = ["imageId", "name", "file", "path"];
  first = 0;
  rows = 10;
  submitted: boolean=false;
  loading: boolean = false;
  //#endregion
  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {
    //  this.baseUrl = baseUrl;
  }

  getFormattedContent(): any {
    let baseUrl = environment.BaseURI + "HtmlLeaf/GetFormattedContent?LeafId=1";
    this.http.get(baseUrl).subscribe((res: any) => {
      ;
      this.htmlContent = this.domSanitizer.bypassSecurityTrustHtml(res.data);
      // this.htmlContent = res.data;
      // this.htmlContent = this.domSanitizer.bypassSecurityTrustUrl(res.data);
      // console.log(this.htmlContent);
      // this.htmlContent = res.data;
    });
    //  return "";
  }

  ngOnInit(): void {
    this.getFormattedContent();
    this.profileForm = new FormGroup({
      name: new FormControl("fdasfdsafas"),
      picture: new FormControl("", [Validators.required]),
    });
    this.getAllFiles();
  }
  onSubmit() {
    console.log(this.profileForm.value, this.profileForm.valid);
    ;
    const formData = new FormData();
    ;
    for (const key of Object.keys(this.profileForm.value)) {
      const value = this.profileForm.value[key];
      formData.append(key, value);
    }
    this.http
      .post(this.baseUrl + "/Upload", formData, {
        //this.http.post(this.baseUrl + 'FileManagement/createprofile', formData, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
          this.profileForm.reset();
          //this.profileForm
          alert("Saved");
        }
      });
  }

  get form() {
    return this.profileForm.controls;
  }
  getAllFiles() {
    this.http.get(this.baseUrl).subscribe(
      (res: any) => {
        this.getFiles = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onFileChanged(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.labelImport.nativeElement.innerText = file.name;
      this.profileForm.patchValue({
        picture: file,
      });
    }
  }
}
