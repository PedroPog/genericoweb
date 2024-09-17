import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { appTitle } from 'src/app/app.config';
import { AuthProvidersComponent } from "./auth-providers.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatDividerModule,
    AuthProvidersComponent
],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ appName }}</mat-card-title>
        <mat-card-subtitle
          >Connectez-vous et gérez votre shop en un clic <br />
          Besoin d'un nouveau shop ?
          <a mat-button color="primary" routerLink="/shop-register"
            >Créez-vous en un ici</a
          >
        </mat-card-subtitle>
      </mat-card-header>
      <mat-divider></mat-divider>
      <mat-card-content>
        <app-auth-providers />
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
        width: max-content;
        margin: 2rem auto;
      }

      .mat-divider {
        margin: 1rem 0;
      }
  `]
})
export default class LoginComponent {
  appName = appTitle;
}
