import { ViewportScroller } from '@angular/common';
import { Component,ViewEncapsulation, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  encapsulation: ViewEncapsulation.None

  constructor() { }
  
  ngOnInit(): void {
  }

}
