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
    { src: 'assets/images/preswing.jpg', alt: 'Pre Swing Wash',  title: 'Pre Swing Wash',             copy: 'Loosens Tough Dirt for a Gentle Start' },
    { src: 'assets/images/form.jpg', alt: 'Foam Cycle',  title: 'Foam Cycle',             copy: 'Rich Foam Blanket for Ultimate Shine.' },
    { src: 'assets/images/highwash.jpg', alt: 'High-Pressure Wash',  title: 'High-Pressure Wash',             copy: 'Powerful Jets, Spotless Finish' },
    { src: 'assets/images/dryer.jpg', alt: 'Dryer',  title: 'Dryer',             copy: 'Touchless Turbo Dry – Ready to Roll!' },
    { src: 'assets/images/tyre.jpg', alt: 'Tyre Wash & Shine',  title: 'Tyre Wash & Shine',             copy: 'Deep rim clean and tyre shine for the perfect look' },
    { src: 'assets/images/two wheeler.jpg', alt: 'PTwo-Wheeler Wash',  title: 'Two-Wheeler Wash',             copy: 'Quick Ride, Superstar Shine' },
    { src: 'assets/images/interior.jpg', alt: 'Relaxing pleasant ambience',  title: 'Relaxing pleasant ambience',             copy: 'QLuxury Meets Clean' },
    { src: 'assets/images/image1.jpg', alt: 'Your Car Deserves the Super Star Treatmen',  title: 'Your Car Deserves the Super Star Treatmen', copy: 'high-end wash environment designed for your comfort' },
    { src: 'assets/images/image2.jpg', alt: 'Modern Design',            title: 'Modern Design',              copy: 'Where technology meets relaxation under brilliant illumination' },
    { src: 'assets/images/image3.jpg', alt: '             Super Star Car Wash – Suncity, Bandlaguda Jagir',       title: '..................now in Suncity, Bandlaguda Jagir',            copy: '......................Relax in a pleasant ambience while your car shines' },
    { src: 'assets/images/image6.jpg', alt: 'SBright Lights. Perfect Reflections',  title: 'Bright Lights. Perfect Reflections',             copy: 'TExperience a relaxing, high-end wash environment' },
    { src: 'assets/images/underwash.jpg', alt: 'Sliding Underwash',  title: 'Sliding Underwash',             copy: 'Deep Clean From the Ground Up.' },
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
