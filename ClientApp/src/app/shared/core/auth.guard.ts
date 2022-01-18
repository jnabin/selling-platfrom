import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkAuth(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkAuth(url);
  }

  checkAuth(url: string): boolean{
    if (this.authService.isAuthenticated()) { return true; }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    debugger
    this.router.navigate(['/login']); // Navigate to the login page with returUrl
    return false;
  }
}
