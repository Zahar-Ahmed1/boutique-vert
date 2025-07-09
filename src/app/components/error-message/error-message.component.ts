import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="error-container">
      <i class="fas fa-exclamation-circle"></i>
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button *ngIf="showBackButton" (click)="goBack()" class="back-button">
        <i class="fas fa-arrow-left"></i> Retour
      </button>
    </div>
  `,
  styles: [`
    .error-container {
      text-align: center;
      padding: 3rem 1rem;
      max-width: 600px;
      margin: 2rem auto;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    i.fa-exclamation-circle {
      font-size: 4rem;
      color: #e74c3c;
      margin-bottom: 1rem;
    }

    h2 {
      color: #0B5345;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    p {
      color: #666;
      margin-bottom: 2rem;
    }

    .back-button {
      padding: 0.75rem 1.5rem;
      background: #0B5345;
      color: white;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .back-button:hover {
      background: #094438;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() title: string = 'Une erreur est survenue';
  @Input() message: string = 'Désolé, une erreur inattendue s\'est produite.';
  @Input() showBackButton: boolean = true;

  goBack(): void {
    window.history.back();
  }
} 