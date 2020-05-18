import { Injectable } from '@angular/core';
import * as Keycloak from "keycloak-js";
import {KeycloakInstance} from "keycloak-js";
import {
  EventTypes,
  LogLevel,
  OidcClientNotification,
  OidcConfigService,
  OidcSecurityService,
  PublicConfiguration, PublicEventsService
} from "angular-auth-oidc-client";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {filter, map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private keycloak: KeycloakInstance;
  configuration: PublicConfiguration;
  userDataChanged$: Observable<OidcClientNotification<any>>;
  userData$: Observable<any>;
  userData: any;
  isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean;

  constructor(public oidcSecurityService: OidcSecurityService, private readonly eventService: PublicEventsService) {

    this.eventService
      .registerForEvents()
      .pipe(filter((notification) => notification.type === EventTypes.ConfigLoaded))
      .subscribe((config) => {
        console.log('ConfigLoaded', config);

        // this.initialize();
      });

    // this.keycloak = Keycloak({
    //   url: 'http://localhost:8095/auth',
    //   realm: 'master',
    //   clientId: 'uiPlatformClient'
    // });
    //
    // this.keycloak.init({
    //   onLoad: 'login-required',
    //   flow: 'implicit'
    // });
    // this.configuration = this.oidcSecurityService.configuration;
    // this.userData$ = this.oidcSecurityService.userData$;
    // this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
    // this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
    //   console.log('app authenticated', isAuthenticated);
    //   this.isAuthenticated = isAuthenticated;
    // });
    //
    // this.oidcSecurityService.userData$.subscribe(userData => {
    //   this.userData = userData;
    // });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  getToken() {
    // this.oidcSecurityService.authorize();
    return this.oidcSecurityService.getToken();
  }

  logoffAndRevokeTokens() {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
  }

  revokeRefreshToken() {
    this.oidcSecurityService.revokeRefreshToken().subscribe((result) => console.log(result));
  }

  revokeAccessToken() {
    this.oidcSecurityService.revokeAccessToken().subscribe((result) => console.log(result));
  }


  private initialize() {
    this.oidcSecurityService.userData$.subscribe(userData => {
      this.userData = userData;
      console.log(userData);
      this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => console.log('app authenticated', isAuthenticated));
    });
  }
}

export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'http://localhost:8095/auth/realms/master',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      unauthorizedRoute: 'login',
      clientId: 'uiPlatformClient',
      scope: 'openid profile email offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      ignoreNonceAfterRefresh: true,
      // silentRenewUrl: `${window.location.origin}`,
      logLevel: LogLevel.Debug,
      autoUserinfo: true
    });
}

export function configureAuthHttp(oidcConfigService: OidcConfigService, httpClient: HttpClient) {
  const setupAction$ = httpClient.get<any>(`http://localhost:8095/auth/realms/master/.well-known/openid-configuration`).pipe(
    map((customConfig) => {
      return {
        stsServer: customConfig.stsServer,
        redirectUrl: customConfig.redirect_url,
        clientId: customConfig.client_id,
        responseType: customConfig.response_type,
        scope: customConfig.scope,
        postLogoutRedirectUri: customConfig.post_logout_redirect_uri,
        startCheckSession: customConfig.start_checksession,
        silentRenew: customConfig.silent_renew,
        silentRenewUrl: customConfig.redirect_url + '/silent-renew.html',
        postLoginRoute: customConfig.startup_route,
        forbiddenRoute: customConfig.forbidden_route,
        unauthorizedRoute: customConfig.unauthorized_route,
        logLevel: customConfig.logLevel, // LogLevel.Debug,
        maxIdTokenIatOffsetAllowedInSeconds: customConfig.max_id_token_iat_offset_allowed_in_seconds,
        historyCleanupOff: true,
        // autoUserinfo: false,
      };
    }),
    switchMap((config) => oidcConfigService.withConfig(config))
  );

  return () => setupAction$.toPromise();
}

