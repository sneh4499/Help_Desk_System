import { CookieService } from 'ngx-cookie-service';
import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from 'ng-connection-service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    base = environment.baseUrl + 'api';
    private sub: any;
    isConnected = true;
    noInternetConnection: boolean;

    constructor(private slimLoader: SlimLoadingBarService, private router: Router, private cookie: CookieService,
      private connectionService: ConnectionService,  private toastr: ToastrService) {
        // Listen the navigation events to start or complete the slim bar loading
        this.sub = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.slimLoader.start();
            } else if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError) {
                this.slimLoader.complete();
            }
        }, (error: any) => {
            this.slimLoader.complete();
        });

        if (this.cookie.get('Guid') === '') {
          this.router.navigate(['login']);
        }

        this.connectionService.monitor().subscribe(isConnected => {
          this.isConnected = isConnected;
          if(this.isConnected){
            this.toastr.success('Connected Successfully !', 'Connected !');
            window.location.reload();
          } else {
            this.toastr.error('Check Your Internet !', 'Disconnect !');
          }
          });
    }

    ngOnDestroy(): any {
        this.sub.unsubscribe();
    }
}
