import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IHtmlLevel } from '../html-document-tree/html-level/IHtmlLevel';

@Injectable({
  providedIn: 'root'
})
export class HtmlLevelService {
  url=environment.BaseURI + 'HtmlLevel';
  constructor(private http:HttpClient) { }

  getAll():Observable<IHtmlLevel[]>{
    return this.http.get<IHtmlLevel[]>(this.url);
  }

  create( data:IHtmlLevel):Observable<any>{
    
    //   var body={
    //     Id :  0,
    //     ParentId:data.parentId,
    //     Name:data.name,
    //     Description:data.description,
    //     IsActive:true
    //   }
    let x=10;
    let y=10;
    ;
    data.parentId=data.parentId.toString().trim()==''?0:data.parentId;
    return this.http.post<any>(this.url,data).pipe(
      catchError(this.handleError)
    );
  }
  update(data:IHtmlLevel):Observable<any>{
    //  let body: IHtmlLevel={
    //     id : data.id,
    //     parentId:data.parentId.toString()==""?null:data.parentId,
    //     //parentId:data.parentId,
    //     name:data.name,
    //     description:data.description
    //   }
    data.parentId=data.parentId.toString().trim()==''?0:data.parentId;
    return this.http.put<any>(this.url,data).pipe(
      catchError(this.handleError)
    );
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(this.url+'/'+id).pipe(
      catchError(this.handleError)
    );
  }

  get(id:number):Observable<IHtmlLevel>{
    return this.http.get<IHtmlLevel>(this.url+'/GetById?id='+id).pipe(
      catchError(this.handleError)
    );
  }
  
  handleError(err:HttpErrorResponse){
    let errorMessage = '';
;
    if(err.error.errorMessage.indexOf("SAME TABLE REFERENCE")!==-1)
    {
      errorMessage=`This node cannot be deleted as it is a parent of some other node. You have to edit the ParentId field of those nodes before deleting this node.`;  
    }
    else
    {
      errorMessage=`An error occured:${err.error.errorMessage}`;
    }    
    return throwError(errorMessage);
  }

}

