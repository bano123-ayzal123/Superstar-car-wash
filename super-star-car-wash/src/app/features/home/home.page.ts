import { Component, OnInit, AfterViewInit, OnDestroy, inject, NgZone, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';

import { ApiService } from '../../core/services/api.service';
import { WashService, PriceTier, Plan } from '../../core/models';
import { HeroComponent } from '../../shared/components/hero.component';
import { SectionTitleComponent } from '../../shared/components/section-title.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, HeroComponent, SectionTitleComponent, NgFor, NgIf, RouterLink, CurrencyPipe],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  private api = inject(ApiService);
  private seo = inject(SeoService);
  private zone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  services: WashService[] = [];
  pricing: PriceTier[] = [];
  plans: Plan[] = [];

  // ===== Slider =====
  slides = [
    { src: 'assets/images/image1.jpg', alt: 'High-pressure rinse',  title: 'Touchless High-Pressure Rinse', copy: 'Safely lifts mud and grime without touching the paint.' },
    { src: 'assets/images/image2.jpg', alt: 'Foam bath',            title: 'Active Foam Bath',              copy: 'pH-balanced foam encapsulates dirt for a swirl-free finish.' },
    { src: 'assets/images/image3.jpg', alt: 'Underbody wash',       title: 'Under-Chassis Wash',            copy: 'Targets salt and road debris under your car.' },
    { src: 'assets/images/image4.jpg', alt: 'Wax coat',             title: 'Wax & Sealant',                 copy: 'Hydrophobic shine that beads water for weeks.' },
    { src: 'assets/images/image5.jpg', alt: 'Air dry',              title: 'Turbo Air Dry',                 copy: 'Powerful blowers minimize water spots—no wiping.' },
    { src: 'assets/images/image6.jpg', alt: 'SUV premium program',  title: 'SUV Premium Cycle',             copy: 'Tuned coverage and dwell time for larger vehicles.' },
  ];
  currentIndex = 0;
  dotIndex = 0;
  transition = 'transform .6s ease';
  private timer: any;
  imagesReady = false;

  ngOnInit() {
    this.seo.set(
      'Super Star Car Wash – Premium Touchless in Hyderabad',
      'Fast, paint-safe, touchless wash with memberships and online booking.'
    );

    this.api.getServices().subscribe(v => this.services = v);
    this.api.getPricing().subscribe(v => this.pricing = v);
    this.api.getPlans().subscribe(v => this.plans = v);

    // ✅ Only preload images in the browser (avoids "Image is not defined" during SSR)
    if (this.isBrowser) {
      this.preloadSlides().then(() => {
        this.imagesReady = true;
        this.cdr.markForCheck();
      });
    } else {
      // On the server: skip preloading
      this.imagesReady = true;
    }
  }

  ngAfterViewInit() {
    // ✅ Start autoplay only in the browser
    if (this.isBrowser) this.play();
  }

  ngOnDestroy() {
    this.stop();
  }

  // ---- Slider controls ----
  play() {
    this.stop();
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.zone.run(() => {
          this.next(true);
          this.dotIndex = this.currentIndex;
        });
      }, 3000);
    });
  }
  pause() { this.stop(); }
  private stop() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }

  next(_auto = false) {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.dotIndex = this.currentIndex;
  }
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.dotIndex = this.currentIndex;
  }
  goTo(i: number) {
    this.currentIndex = i;
    this.dotIndex = i;
    if (this.isBrowser) this.play();
  }

  // ---- Helpers ----
  private preloadSlides(): Promise<void> {
    // Double-guard
    if (!this.isBrowser) return Promise.resolve();

    const ImageCtor = (typeof window !== 'undefined') ? (window as any).Image : null;
    if (!ImageCtor) return Promise.resolve();

    const promises = this.slides.map(s => new Promise<void>(resolve => {
      const img = new ImageCtor();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // don't block UI on errors
      img.src = s.src;
    }));
    return Promise.all(promises).then(() => {});
  }

  // Color variant helper for cards
  variantFor(i: number): string {
    const map = ['variant-orange', 'variant-pink', 'variant-yellow', 'variant-outline'];
    return map[i % map.length];
  }
}
