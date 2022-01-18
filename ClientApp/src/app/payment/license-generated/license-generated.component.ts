import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-license-generated',
  templateUrl: './license-generated.component.html',
  styleUrls: ['./license-generated.component.scss']
})
export class LicenseGeneratedComponent implements OnInit {
licenseKey:any="";
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  this.licenseKey = this.activatedRoute.snapshot.paramMap.get("id");
   }

  ngOnInit(): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { id: null },
        queryParamsHandling: 'merge'
      });
  }

}
