import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.scss']
})
export class LeftNavbarComponent implements OnInit {

  logoUrl = 'assets/images/logo.png';
  iconUrl = 'assets/images/icon-36.png';

  @Input() isOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

}
