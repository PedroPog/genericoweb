import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-providers',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule
  ],
  template: `
   <button
      class="google-auth-btn"
      mat-fab
      extended
      color="primary"
      (click)="loginWithGoogle()"
    >
      <mat-icon>login</mat-icon>
      Connectez-vous avec Google
    </button>

    <div class="divider">
      <mat-divider></mat-divider>
      <span>ou</span>
      <mat-divider></mat-divider>
    </div>

    <form [formGroup]="emailForm" align="end">
      <mat-form-field appearance="outline" class="email-field">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" placeholder="Ex: example@company.org"/>
      </mat-form-field>
      <button class="email-auth-btn" mat-stroked-button color="primary"
        [disabled]="emailForm.invalid">
        Connexion
      </button>
    </form>
  `,
  styles: [`
    .google-auth-btn {
        width: 100%;
        box-shadow: none;
      }

      form {
        border: 1px solid gray;
        border-radius: 8px;
        padding: 1rem;
      }

      mat-form-field {
        width: 100%;
      }

      .divider {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 0;

        mat-divider {
          width: 40%;
        }
      }
  `]
})
export class AuthProvidersComponent {

  emailForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  });
  loginWithGoogle() {

  }

}
