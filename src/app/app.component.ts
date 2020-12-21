import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gd-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class GdAppComponent {
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
  selector: 'gd-layout',
  template: '<router-outlet></router-outlet>'
})

export class GdLayoutComponent {
  title = 'site';
}
