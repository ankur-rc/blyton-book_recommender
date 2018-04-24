import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Inject,Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  selectorAuth,
  routerTransition
} from '@app/core';
import { environment as env } from '@env/environment';

import { NIGHT_MODE_THEME, selectorSettings } from './settings';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'info-dialog',
  templateUrl: 'infodialog.html',
})
export class InfoDialog {

  constructor(
    public dialogRef: MatDialogRef<InfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  @HostBinding('class') componentCssClass;

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  navigation = [
    { link: 'about', label: 'About' },
    // { link: 'features', label: 'Features' },
    // { link: 'examples', label: 'Examples' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    // { link: 'settings', label: 'Settings' }
  ];
  // isAuthenticated;

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<any>,
    private router: Router,
    private titleService: Title,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectorSettings)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(settings => {
        const { theme, autoNightMode } = settings;
        const hours = new Date().getHours();
        const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
          ? NIGHT_MODE_THEME
          : theme
        ).toLowerCase();
        this.componentCssClass = effectiveTheme;
        const classList = this.overlayContainer.getContainerElement().classList;
        const toRemove = Array.from(classList).filter((item: string) =>
          item.includes('-theme')
        );
        classList.remove(...toRemove);
        classList.add(effectiveTheme);
      });
    this.store
      .select(selectorAuth)
      .pipe(takeUntil(this.unsubscribe$))
      // .subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof ActivationEnd)
      )
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLoginClick() {
    this.store.dispatch(new ActionAuthLogin());
  }

  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout());
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(InfoDialog, {
      width: '1100px',
      height: '800px',
      data: { rmse: 2, mae: 2 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
