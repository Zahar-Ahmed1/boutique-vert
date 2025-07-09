import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
