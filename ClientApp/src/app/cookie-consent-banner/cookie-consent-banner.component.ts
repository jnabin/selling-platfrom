import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-consent-banner',
  templateUrl: './cookie-consent-banner.component.html',
  styleUrls: ['./cookie-consent-banner.component.scss']
})
export class CookieConsentBannerComponent implements OnInit {
  isVisible = false;
  constructor() { }

  setCookie(){
    this.isVisible = false;
    localStorage.setItem("cookieBannerDisplayed", "true");
  }
  ngOnInit(): void {
    setTimeout(() => {
      if (!localStorage.getItem("cookieBannerDisplayed")) {
        this.isVisible = true;
      }else{
        this.isVisible = false;
      }
    }, 2000);
  }

}
