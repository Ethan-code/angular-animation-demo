import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { backgroundAnimations, backgroundAnimations2, backgroundAnimations3, childAnimation, parentAnimation, routerAnimation, simpleFader, simpleFader2 } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    backgroundAnimations,
    backgroundAnimations2,
    backgroundAnimations3,
    childAnimation,
    parentAnimation,
    routerAnimation,
    simpleFader,
    simpleFader2,
  ]
})
export class AppComponent {

  stateFlag: boolean = false;
  get openCloseState(): string {
    return this.stateFlag ? 'open' : 'close';
  }
  openCloseState2: string = 'open';

  fadeFlag: boolean = false;
  fadeFlag2: boolean = false;

  parentChildFlag: boolean = false;

  currentSubPage: string = "";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentSubPage = this.router.url.replace(/\\\//g, "/");
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.currentSubPage = (<NavigationEnd>event).url.replace(/\//g, "");
    });
  }

  toggleStateFlag() {
    if (this.stateFlag === null) this.stateFlag = false;
    this.stateFlag = !this.stateFlag;
  }

  changeStateFlag(state: string) {
    this.openCloseState2 = state;
  }

  toggleFadeFlag() {
    this.fadeFlag = !this.fadeFlag;
  }

  toggleFadeFlag2() {
    this.fadeFlag2 = !this.fadeFlag2;
  }

  toggleParentChildFlag() {
    this.parentChildFlag = !this.parentChildFlag;
  }

  animationDone(event: any) {
    console.log('animation done, console the event', event);
  }

}
