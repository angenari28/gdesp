import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { remote } from 'electron';

@Component({
  selector: 'np-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class NpAppComponent {
  public navExpanded: boolean;
  public init: any = false;
  constructor(public router: Router) { }

  NgAfterViewInit() {
    this.init = true;
  }

  public menuClick = (expanded) => {
    this.navExpanded = expanded;
  }

  public logoClick = () => {
    this.router.navigate(['/']);
  }
}

@Component({
  selector: 'np-layout',
  template: '<router-outlet></router-outlet>'
})

export class NpLayoutComponent {
  title = 'site';

}
