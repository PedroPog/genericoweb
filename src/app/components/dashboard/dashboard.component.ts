import { RouterModule, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar'
import { appTitle } from '../../app.config';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { MatMenuModule } from '@angular/material/menu'
import { MatDividerModule } from '@angular/material/divider';
import { MediaQueryObserverService } from '../../core/services/utility/media-query-observer.service';
import { LetDirective } from '@ngrx/component'
import { SwithThemeService } from '../../core/services/utility/swith-theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    NgOptimizedImage,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    LetDirective,
    MatButtonModule
  ],
  template: `
    <div class="dashboard-container">
      <mat-toolbar>
          <div class="left-container">
          <button
            *ngIf="
              (viewPoint$ | async) === 'XSmall' ||
              (viewPoint$ | async) === 'Small' ||
              (viewPoint$ | async) === 'Medium'
            "
            (click)="drawer?.toggle()"
            mat-icon-button
            matTooltip="élargi le menu"
            >
            <mat-icon>menu</mat-icon>
            </button>
            <a mat-button routerLink="/ge-stock/sale">{{appName}}</a>
          </div>
          <img [matTooltip]="'Menu de '+appName" ngSrc="https://avatar.iran.liara.run/public/10"
           alt="profile avatar" width="35" height="35" [matMenuTriggerFor]="menu">
           <mat-menu #menu="matMenu">
            <button mat-menu-item>
              <mat-icon>manage_accounts</mat-icon>
              <span>Gerer votre compte</span>
            </button>
            <button mat-menu-item [matMenuTriggerFor]="themeMenu">
              <mat-icon>dark_mode</mat-icon>
              <span>Apparence</span>
            </button>
            <mat-divider/>
            <button mat-menu-item>
              <mat-icon>logout</mat-icon>
              <span>Se deconnecter</span>
            </button>
           </mat-menu>
           <mat-menu #themeMenu="matMenu">
            <button mat-menu-item (click)="switchTheme('device-theme')">Theme de l'apparelli</button>
            <button mat-menu-item (click)="switchTheme('light-theme')">Theme claire</button>
            <button mat-menu-item (click)="switchTheme('dark-theme')">Theme sombre</button>
           </mat-menu>

      </mat-toolbar>
      <mat-drawer-container autosize>
        <mat-drawer #drawer [mode]="
          (viewPoint$ | async) === 'Large'|| (viewPoint$ | async) === 'XLarge'
        ? 'side' : 'over'
        " [opened]="
          (viewPoint$ | async) === 'Large' || (viewPoint$ | async) === 'XLarge'
        "
        >
        <a
          class="link"
          routerLink="ge-stock"
          mat-fab
          extended
          routerLinkActive="active"
          #rla="routerLinkActive"
          *ngrxLet="viewPoint$ as vw"
          (click)="toggleDrawer(drawer,vw)"
          [color]="rla.isActive ? 'primary' : 'no-color'"
        >
          <mat-icon>inventory_2</mat-icon>
          GeStock
        </a>

        <a
          class="link"
          routerLink="finance"
          mat-fab
          extended
          routerLinkActive="active"
          #rla="routerLinkActive"
          *ngrxLet="viewPoint$ as vw"
          (click)="toggleDrawer(drawer,vw)"
          [color]="rla.isActive ? 'primary' : 'no-color'"
        >
          <mat-icon>attach_money</mat-icon>
          Finance
        </a>

        <a
          class="link"
          routerLink="setting"
          mat-fab
          extended
          routerLinkActive="active"
          #rla="routerLinkActive"
          *ngrxLet="viewPoint$ as vw"
          (click)="toggleDrawer(drawer,vw)"
          [color]="rla.isActive ? 'primary' : 'no-color'"
        >
        <mat-icon>settings</mat-icon>
          Parametros
        </a>
        </mat-drawer>
        <mat-drawer-content>
          <router-outlet></router-outlet>
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
      }

      mat-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left-container {
          display: flex;
          align-items: center;
        }
      }
      .mat-primary{
        color: black;
        background: #FFC107;
      }
      // .mat-no-color{
      //   background: transparent;
      //   color: white;
      // }
      img {
        border-radius: 50%;
        background: lightgray;
        cursor: pointer;
        transition: 250ms;

        &:hover {
          transform: scale(1.1);
        }
      }

      mat-drawer-container {
        flex-basis: 100%;
      }

      mat-drawer {
        width: 15rem;
        border-radius: 0;
      }

      .link {
        width: 100%;
        height: 3rem;
        border-radius: 0;
        margin-bottom: 0.2rem;
        display: flex;
        justify-content: flex-start;
        box-shadow: none;
      }
    `,
  ],
})
export default class DashboardComponent {
  appName = appTitle;
  viewPoint$ = inject(MediaQueryObserverService).mediaQuery();
  sts = inject(SwithThemeService);

  toggleDrawer(drawer:MatDrawer,viewPoint:string){
    if(viewPoint === 'Large'|| viewPoint === 'XLarge'){
      return null
    }else{
      return drawer?.toggle();
    }
  }
  switchTheme = (theme:string) => this.sts.switchTheme(theme);
}
