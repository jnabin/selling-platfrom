import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SubscriptionTypeComponent } from "./subscription-type/subscription-type.component";
import { AffiliateComponent } from "./affiliate/affiliate.component";
import { SpecialDiscountComponent } from "./special-discount/special-discount.component";
import { CouponDiscountComponent } from "./coupon-discount/coupon-discount.component";
import { CountryComponent } from "./country/country.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HtmlLevelComponent } from "./html-document-tree/html-level/html-level.component";
import { TreePreviewComponent } from "./html-document-tree/tree-preview/tree-preview.component";
import { ProductSubscriptionTypeComponent } from "./product-subscription-type/product-subscription-type.component";
import { HtmlLeafComponent } from "./html-document-tree/html-leaf/html-leaf.component";
import { FileUplodadTestingComponent } from "./file-uplodad-testing/file-uplodad-testing.component";
import { HtmlLeafEditComponent } from "./html-document-tree/html-leaf/html-leaf-edit/html-leaf-edit.component";
import { ToolbarModule } from "primeng/toolbar";
import { SharedModule } from "../shared/shared.module";
import { ProductsComponent } from './products/products.component';

const routes = [
  { path: "subscription-type", component: SubscriptionTypeComponent, data: { breadcrumb: "Subscription-Type" }, },
  { path: "product", component: ProductsComponent, data: { breadcrumb: "product" }, },
  { path: "product-subscription", component: ProductSubscriptionTypeComponent, data: { breadcrumb: "product-subscription" }, },
  { path: "affiliate", component: AffiliateComponent, data: { breadcrumb: "affiliate" }, },
  { path: "special-discount", component: SpecialDiscountComponent, data: { breadcrumb: "special-discount" }, },
  { path: "coupon-discount", component: CouponDiscountComponent, data: { breadcrumb: "coupon-discount" }, },
  { path: "country", component: CountryComponent, data: { breadcrumb: "country" }, },
  { path: "html-level", component: HtmlLevelComponent, data: { breadcrumb: "Html-Level" }, },
  { path: "html-leaf", component: HtmlLeafComponent, data: { breadcrumb: "Html-Leaf" }, },
  { path: "html-leaf-edit/:id", component: HtmlLeafEditComponent, data: { breadcrumb: "html-leaf-edit" }, },
  { path: "html-document-tree", component: TreePreviewComponent, data: { breadcrumb: "Html-Document-Tree" }, },
  { path: "demo-file-upload", component: FileUplodadTestingComponent, data: { breadcrumb: "demo-file-upload" }, },
];

@NgModule({
  declarations: [
    SubscriptionTypeComponent,
    AffiliateComponent,
    SpecialDiscountComponent,
    CouponDiscountComponent,
    CountryComponent,
    ProductSubscriptionTypeComponent,

    HtmlLevelComponent,
    TreePreviewComponent,
    HtmlLeafComponent,
    HtmlLeafEditComponent,
    ProductsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    ToolbarModule,
  ],
  
})
export class MasterDataModule { }
