import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { XatocodeComponent } from './xatocode/xatocode.component';
import { CodeReviewComponent } from './code-review/code-review.component';
import { CodeTreeViewComponent } from './code-tree-view/code-tree-view.component';
import { CodeRepositoryComponent } from './code-repository/code-repository.component';
import { CodeSearchComponent } from './code-search/code-search.component';
import { ExpressionViewerComponent } from './expression-viewer/expression-viewer.component';
import { CustomizeCodingStandardComponent } from './customize-coding-standard/customize-coding-standard.component';
import { ManageCodeRepositoryComponent } from './manage-code-repository/manage-code-repository.component';
import { CreateTempUserComponent } from '../payment/create-temp-user/create-temp-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'xatocode', component: XatocodeComponent },
  { path: 'code-review', component: CodeReviewComponent },
  { path: 'code-tree-view', component: CodeTreeViewComponent },
  { path: 'code-repository', component: CodeRepositoryComponent },
  { path: 'code-search', component: CodeSearchComponent },
  { path: 'expression-viewer', component: ExpressionViewerComponent },
  { path: 'customizing-coding-standard', component: CustomizeCodingStandardComponent },
  { path: 'manage-code-repository', component: ManageCodeRepositoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
