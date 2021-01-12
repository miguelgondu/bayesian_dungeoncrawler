import { Component, OnInit, OnDestroy } from '@angular/core';
declare var PIXI: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  ngOnInit() {
    console.log("starting")
  }

  ngOnDestroy() {
    console.log("chao")
  }
}
