import {Component, OnDestroy} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  routes = [

    {route: '/', title: 'Home', icon: 'home'},
    {route: '/albums', title: 'Albums', icon: 'folder'},
    {route: '/users', title: 'Users', icon: 'accessibility' },
    {route: '/login', title: 'Login' , icon: 'input'}
  ];

  navBarOpen = true;
  mode = 'side';
  watcher: Subscription;
  constructor(media: ObservableMedia) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if ( change.mqAlias === 'xs') {
        this.loadMobileContent();
      } else {
        this.loadDashBoardContent();
      }
    });

  }

  // this is called everyt time the application is shut down.
  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  toggleNav() {
    this.navBarOpen = !this.navBarOpen;
  }

  loadMobileContent() {
    console.log('small view');
   this.navBarOpen = false;
   this.mode = 'over';
  }
  loadDashBoardContent() {
    console.log('large view');
    this.navBarOpen = true;
    this.mode = 'side';
  }

}
