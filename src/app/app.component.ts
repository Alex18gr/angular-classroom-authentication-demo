import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./authentication/authentication.service";
import {OidcSecurityService} from "angular-auth-oidc-client";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-classroom-demo';

  constructor(private authenticatedService: AuthenticationService,
              private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
      console.log('app authenticated', isAuthenticated);
      this.authenticatedService.isAuthenticated = isAuthenticated;
    });
  }
}
