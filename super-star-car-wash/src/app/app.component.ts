import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar.component';
import { FooterComponent } from './shared/components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet, FooterComponent],
  template: `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="route-progress" [class.active]="isLoading()"></div>

    <app-navbar></app-navbar>
    <main id="main-content" class="flex-grow-1"><router-outlet></router-outlet></main>
    <app-footer></app-footer>
  `,
  styles: [`
    :host{min-height:100dvh;display:flex;flex-direction:column}
    .route-progress{position:fixed;left:0;top:0;height:3px;width:0;background:linear-gradient(90deg,#ffbf00,#ff7a00);
      transition:width .3s ease,opacity .25s ease;opacity:0;z-index:1200;}
    .route-progress.active{width:80%;opacity:1;}
  `]
})
export class AppComponent {
  private router = inject(Router);
  isLoading = signal(false);

  constructor() {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) this.isLoading.set(true);
      else if (ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError)
        this.isLoading.set(false);
    });
  }
}
