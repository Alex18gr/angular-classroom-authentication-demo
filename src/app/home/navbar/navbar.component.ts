import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarUserIcon = faUserCircle;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }
}
