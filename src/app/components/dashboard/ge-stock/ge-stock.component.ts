import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatTabsModule  } from '@angular/material/tabs'
import { MatDividerModule  } from '@angular/material/divider'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ge-stock',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatDividerModule,
    MatTabsModule
  ],
  template: `
    <main class="children-container">
      <nav mat-tab-nav-bar mat-stretch-tabs="false" mat-align-tabs=center>
        <a
          mat-tab-link
          *ngFor="let link of links"
          (click)="activeLink = link.url"
          [active]="activeLink === link.url"
          [routerLink]="link.url"
        >
          {{ link.name }}
        </a>
      </nav>
      <mat-divider></mat-divider>
      <router-outlet/>
    </main>
  `,
  styles: [``]
})
export default class GeStockComponent {
  private router = inject(Router);
  activeLink!:string;
  links = [
    {
      name:'Vente',
      url:'sale'
    },
    {
      name:'Aprovisionnement',
      url:'purchase'
    },
    {
      name:'Stock',
      url:'stock'
    },
    {
      name:'Archive',
      url:'archive'
    }
  ];

  ngOnInit(): void {
    this.activeLink = this.router.url.replace('/ge-stock/','');
  }
}
