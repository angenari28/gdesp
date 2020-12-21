import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gd-nav-button',
  templateUrl: './gd-nav-button.component.html',
  styleUrls: ['./gd-nav-button.component.css']
})
export class GdNavButtonComponent implements OnInit {

  @Input() public callback: Function;
  public active = true;


  ngOnInit() {
    this.active = (window.innerWidth > 600);
    setTimeout(() => {
      this.callback(this.active);
    }, 0);
  }

  public menuClick() {
    this.active = !this.active;
    this.callback(this.active);
  }
}
