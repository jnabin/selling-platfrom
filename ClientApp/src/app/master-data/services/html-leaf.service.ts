import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IHtmlLeaf } from "../html-document-tree/html-leaf/IHtmlLeaf";

@Injectable({
  providedIn: "root",
})
export class HtmlLeafService {
  url = environment.BaseURI + "HtmlLeaf";
  constructor(private http: HttpClient) {}


    uploadFile(file: File, leaf: IHtmlLeaf): Observable<any> {
        const formData = new FormData();

        // formData.append(leaf.id.toString(), file);
        formData.append('File', file);
        formData.append('LeafId', leaf.id.toString());


        return this.http.post<any>(this.url + '/UploadFile', formData,
            {
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': undefined
                // },
                reportProgress: true, observe: 'events'
            }).pipe(
                catchError(this.handleError)
            );
    }

  getAll(): Observable<IHtmlLeaf[]> {
    return this.http.get<IHtmlLeaf[]>(this.url);
  }
  getAllFilesForLeaf(id: number): Observable<IHtmlLeaf[]> {
    return this.http.get<IHtmlLeaf[]>(
      this.url + "/GetAllFilesForLeaf?id=" + id
    );
  }

  create(data: IHtmlLeaf): Observable<any> {
    
    // var body={
    //   Id :  0,
    //   ParentId:data.parentId,
    //   Name:data.name,
    //   Description:data.description,
    //   IsActive:true
    // }
    let x = 10;
    x = 20;
    if (data.parentId != null) {
      data.parentId =
        data.parentId.toString().trim() == "" ? 0 : data.parentId;
    }
    return this.http
      .post<any>(this.url, data)
      .pipe(catchError(this.handleError));
  }
  update(data: IHtmlLeaf): Observable<any> {
    //  let body: IHtmlLeaf={
    //     id : data.id,
    //     parentId:data.parentId.toString()==""?null:data.parentId,
    //     //parentId:data.parentId,
    //     name:data.name,
    //     description:data.description
    //   }
    let x = 10;
    x = 20;

    if (data.parentId != null) {
      data.parentId =
        data.parentId.toString().trim() == "" ? 0 : data.parentId;
    }
    return this.http
      .put<any>(this.url, data)
      .pipe
      //catchError(this.handleError)
      ();
  }
  delete(id: number): Observable<any> {
    return this.http
      .delete<any>(this.url + "/" + id)
      .pipe(catchError(this.handleError));
  }
  deletefile(id: number): Observable<any> {
    return this.http
      .delete<any>(this.url + "/" + id)
      .pipe(catchError(this.handleError));
  }

  get(id: number): Observable<IHtmlLeaf> {
    return this.http
      .get<IHtmlLeaf>(this.url + "/" + id)
      //.get<IHtmlLeaf>(this.url + "/GetById?id=" + id)
      .pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    ;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured:${err.error.message}`;
    } else {
      errorMessage = `Server returned code:${err.status}, 
        error message is:${err.error.errorMessage}`;
    }

    return throwError(errorMessage);
  }
}
