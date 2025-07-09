import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, query, stagger, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    // Animation héro améliorée
    trigger('heroAnimation', [
      transition(':enter', [
        group([
          // Animation du fond
          query('.hero', [
            style({ opacity: 0 }),
            animate('1000ms ease-out', style({ opacity: 1 }))
          ], { optional: true }),
          // Animation séquentielle des éléments
          query('.hero-content > *', [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(200, [
              animate('600ms ease-out', 
                keyframes([
                  style({ opacity: 0, transform: 'translateY(30px)', offset: 0 }),
                  style({ opacity: 0.5, transform: 'translateY(15px)', offset: 0.3 }),
                  style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
                ])
              )
            ])
          ], { optional: true }),
          // Animation spéciale pour les boutons
          query('.hero-buttons .cta-button', [
            style({ opacity: 0, transform: 'scale(0.8)' }),
            stagger(150, [
              animate('400ms ease-out', 
                keyframes([
                  style({ opacity: 0, transform: 'scale(0.8)', offset: 0 }),
                  style({ opacity: 0.5, transform: 'scale(1.1)', offset: 0.7 }),
                  style({ opacity: 1, transform: 'scale(1)', offset: 1.0 })
                ])
              )
            ])
          ], { optional: true })
        ])
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerFeatures', [
      transition(':enter', [
        query('.feature-card', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger(200, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('staggerProducts', [
      transition(':enter', [
        query('.product-preview', [
          style({ opacity: 0, transform: 'scale(0.8)' }),
          stagger(200, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('testimonialAnimation', [
      transition(':enter', [
        query('.testimonial-card', [
          style({ opacity: 0, transform: 'translateX(-50px)' }),
          stagger(200, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeCardEffects();
  }

  private initializeCardEffects(): void {
    const cards = document.querySelectorAll<HTMLElement>('.feature-card');

    cards.forEach(card => {
      // Ajouter l'animation flottante
      card.classList.add('animated');

      // Effet de mouvement 3D au survol
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;

        card.classList.add('moving');
        card.style.transform = 
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      };

      // Réinitialiser la position
      const handleMouseLeave = () => {
        card.classList.remove('moving');
        card.style.transform = '';
      };

      // Effet de clic
      const handleMouseDown = () => {
        card.style.transform = 'scale(0.95) translateZ(0)';
      };

      const handleMouseUp = () => {
        card.style.transform = '';
      };

      // Ajouter les écouteurs d'événements
      card.addEventListener('mousemove', handleMouseMove as EventListener);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('mousedown', handleMouseDown);
      card.addEventListener('mouseup', handleMouseUp);
    });
  }
}
