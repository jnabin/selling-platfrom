import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FileUploadModule } from "primeng/fileupload";
import { ToolbarModule } from "primeng/toolbar";
import { RatingModule } from "primeng/rating";
import { InputNumberModule } from "primeng/inputnumber";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { CheckboxModule } from "primeng/checkbox";
import { TreeModule } from "primeng/tree";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TabViewModule } from "primeng/tabview";
import { WindowRefService } from "../services/window-ref.service";
import { NullifyIfEmptyPipe } from "./core/pipes/nullify-if-empty.pipe";
import { TrimPipe } from "./core/pipes/trim.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "@auth0/angular-jwt";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CardModule, } from 'primeng/card';
@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    RatingModule,
    ConfirmDialogModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
    TreeModule,
    ProgressSpinnerModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule
  ],
  exports: [
    TableModule,
    ToastModule,
    RatingModule,
    ConfirmDialogModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
    TreeModule,
    ProgressSpinnerModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule
  ],
  providers: [MessageService, ConfirmationService],
  declarations: [NullifyIfEmptyPipe, TrimPipe, PageNotFoundComponent]
})
export class SharedModule {}
