import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'np-nav-button',
  templateUrl: './np-nav-button.component.html',
  styleUrls: ['./np-nav-button.component.css']
})
export class NpNavButtonComponent implements OnInit {

  @Input() public callback: Function;
  public active: boolean = true;


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
