import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, race, of } from 'rxjs';
import { switchMap, delay, mapTo } from 'rxjs/operators';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frienz-backpacker';

  subscription = new Subscription();
  mouseLeaveTrigger = new Subject();
  mouseEnterMenu = new Subject();

  copyright = faCopyright;

  @ViewChild('menuTrigger') menuTrigger;

  constructor() { }

  ngOnInit() {
    this.subscription.add(this.menuHandler());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  menuHandler() {
    return this.mouseLeaveTrigger.pipe(
      switchMap(() => {
        return race(
          of(true).pipe(delay(50)),
          this.mouseEnterMenu.pipe(mapTo(false))
        );
      })
    ).subscribe(v => {
      if (v) {
        this.menuTrigger.closeMenu();
      }
    });
  }
}
