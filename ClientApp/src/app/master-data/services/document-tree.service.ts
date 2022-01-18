import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
//import {  IHtmlLevel} from '../html-document-tree/html-level/';

@Injectable({
  providedIn: 'root'
})
export class DocumentTreeService {

  constructor(private http:HttpClient) { }

  url:string=environment.BaseURI + 'HtmlDocumentTree';

  // Gets a json formatted document tree structure
  get():Observable<any>{
    return this.http.get<any>(this.url);
  }

  // create( data:any):Observable<any>{
  //   
  //     var body={
  //       Id :  0,
  //       ParentId:data.parentId,
  //       Name:data.name,
  //       Description:data.description,
  //       IsActive:true
  //     }
  //     return this.http.post(this.url,body).pipe(
  //       catchError(this.handleError)
  //     );
  // }
  // update(data:any):Observable<any>{
  //   
  //     var body={
  //       Id : data.id,
  //       Name:data.name,
  //       Description:data.description,
  //     }
  //     return this.http.put(this.url,body).pipe(
  //       catchError(this.handleError)
  //     );
  // }
  // delete(id:number):Observable<any>{
  //   return this.http.delete(this.url + '/' + id).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // get(id:number):Observable<any>{
  //   return this.http.get(this.url+ '/GetById?id='+id).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  
  handleError(err:HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage=`An error occured:${err.error.message}`;
    }
    else
    {
      errorMessage=`Server returned code:${err.status}, error message is:${err.message}`;
    }
    return throwError(errorMessage);
  }

}

