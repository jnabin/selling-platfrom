import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  public IsUserLoggedIn: boolean = false;
  public role: string | undefined = '';
  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.isUserLoggedIn();
    this.authService.getMessage().subscribe((msg: string) => {
      if (msg != '' || msg != null) {
        this.isUserLoggedIn();
      }
    });
  }
  isUserLoggedIn() {
    if (
      this.authService.getToken() != null &&
      this.authService.getToken() != ''
    ) {
      this.IsUserLoggedIn = true;
      this.role = this.authService.getRole()?.toLowerCase();
    } else {
      this.IsUserLoggedIn = false;
    }
    this.getMenus();
  }
  loggedOut() {
    this.authService.nextMessage('');
    this.authService.clearLocalStorage();
    this.router.navigateByUrl('/');
    this.IsUserLoggedIn = false;
  }
  getMenus() {
    if (this.IsUserLoggedIn && localStorage.getItem('roleName') == 'Admin') {
      this.items = [
        {
          label: 'Home',
          routerLink: ['home'],
        }, 
        {
          label: 'Faq',
          routerLink: ['faq'],
        },
        {
          label: 'Pricing',
          routerLink: ['pricing'],
        },
        {
          label: 'Contact',
          routerLink: ['contact'],
        },
        //{
        //  label: 'Buy Now',
        //  routerLink: ['checkout'],
        //},
        
        {
          label: 'Admin',
          items: [
            {
              label: 'Master',
              items: [
                {
                  label: 'Subscription Type',
                  routerLink: ['master/subscription-type'],
                },
                {
                  label: 'Product',
                  routerLink: ['master/product'],
                },
                {
                  label: 'Product Subscription Type',
                  routerLink: ['master/product-subscription'],
                },
                {
                  label: 'Affiliate',
                  routerLink: ['master/affiliate'],
                },
                {
                  label: 'Special Discount',
                  routerLink: ['master/special-discount'],
                },
                {
                  label: 'Coupon Discount',
                  routerLink: ['master/coupon-discount'],
                },
                {
                  label: 'Country',
                  routerLink: ['master/country'],
                },
                {
                  label: 'Html Level',
                  routerLink: ['master/html-level'],
                },
                {
                  label: 'Html Leaf',
                  routerLink: ['master/html-leaf'],
                },
                {
                  label: 'Html Document Tree',
                  routerLink: ['master/html-document-tree'],
                },
                {
                  label: 'File Upload Demo',
                  routerLink: ['master/demo-file-upload'],
                },
              ],
            },
            {
              label: 'Admin Panel ',
              items: [
                {
                  label: 'Orders',
                  routerLink: ['admin-panel/order'],
                },
                {
                  label: 'Quotations',
                  routerLink: ['admin-panel/quotation'],
                },
                {
                  label: 'Customer Management',
                  routerLink: ['admin-panel'],
                },
                {
                  label: 'Contact',
                  routerLink: ['admin-panel/contact'],
                },
              ],
            },
          ],
        },
      ];
    } else if (this.IsUserLoggedIn) {
      this.items = [
        {
          label: 'Home',
          routerLink: ['home'],
        },
        {
          label: 'Download',
          routerLink: ['download'],
        }, 
        {
          label: 'Faq',
          routerLink: ['faq'],
        },
        {
          label: 'Pricing',
          routerLink: ['pricing'],
        },
        {
          label: 'Contact',
          routerLink: ['contact'],
        },
        {
          label: 'Users',
          items: [
            {
              label: 'My Liscense ',
              routerLink: ['my-license'],
            },
            {
              label: 'Quote History',
              routerLink: ['quotation'],
            },
            {
              label: 'Billing History',
              routerLink: ['billing-history'],
            },
            {
              label: 'Support',
            },
          ],
        },
      ];
    } else if (!this.IsUserLoggedIn) {
      this.items = [
        {
          label: 'Home',
          routerLink: ['home'],
        },
        {
          label: 'Download',
          routerLink: ['download'],
        }, 
        {
          label: 'Faq',
          routerLink: ['faq'],
        },
        {
          label: 'Pricing',
          routerLink: ['pricing'],
        },
        {
          label: 'Contact',
          routerLink: ['contact'],
        },
      ];
    }
  }
}
