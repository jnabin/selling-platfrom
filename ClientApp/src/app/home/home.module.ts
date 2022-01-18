import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './home.component';
import { CreateTempUserComponent } from './../payment/create-temp-user/create-temp-user.component';
import { ManageCodeRepositoryComponent } from './manage-code-repository/manage-code-repository.component';
import { CustomizeCodingStandardComponent } from './customize-coding-standard/customize-coding-standard.component';
import { ExpressionViewerComponent } from './expression-viewer/expression-viewer.component';
import { CodeSearchComponent } from './code-search/code-search.component';
import { CodeRepositoryComponent } from './code-repository/code-repository.component';
import { CodeTreeViewComponent } from './code-tree-view/code-tree-view.component';
import { CodeReviewComponent } from './code-review/code-review.component';
import { XatocodeComponent } from './xatocode/xatocode.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    XatocodeComponent, 
    CodeReviewComponent, 
    CodeTreeViewComponent,
    CodeRepositoryComponent,
    CodeSearchComponent,
    ExpressionViewerComponent,
    CustomizeCodingStandardComponent,
    ManageCodeRepositoryComponent,
    HomeComponent 
  ],
  imports: [
    ButtonModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
