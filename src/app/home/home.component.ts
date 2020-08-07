import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Subscription, race, of } from 'rxjs';
import { switchMap, delay, mapTo } from 'rxjs/operators';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

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
