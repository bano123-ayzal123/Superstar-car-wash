import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { WashService, PriceTier, Plan } from '../../core/models';
import { HeroComponent } from '../../shared/components/hero.component';
import { SectionTitleComponent } from '../../shared/components/section-title.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [HeroComponent, SectionTitleComponent, NgFor, NgIf, RouterLink, CurrencyPipe],
  template: `
  <app-hero title="Premium Touchless Car Wash"
            subtitle="First-time-in-Hyderabad experience — shine in minutes, safe for paint, zero contact."
            image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1500&auto=format&fit=crop">
    <a routerLink="/booking" class="btn btn-primary btn-lg me-2">Book Now</a>
    <a routerLink="/membership" class="btn btn-outline-dark btn-lg">Membership</a>
  </app-hero>

  <section class="py-5">
    <div class="container">
      <app-section-title title="Our Services" subtitle="High-pressure wash, foam bath, under-chassis wash & more"></app-section-title>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" *ngFor="let s of services">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title fw-bold">{{s.title}}</h5>
              <p class="card-text text-secondary">{{s.description}}</p>
              <ul class="small text-secondary mb-0">
                <li *ngFor="let f of s.features">{{f}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5 bg-light border-top border-bottom">
    <div class="container">
      <app-section-title title="Popular Packages" subtitle="Transparent pricing, premium results"></app-section-title>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" *ngFor="let p of pricing">
          <div class="card h-100 shadow-sm border-primary">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <h5 class="fw-bold">{{p.name}}</h5>
                <span *ngIf="p.badge" class="badge bg-warning text-dark">{{p.badge}}</span>
              </div>
              <h3 class="my-2">{{p.price | currency:'INR'}}</h3>
              <ul class="mb-3 small text-secondary">
                <li *ngFor="let i of p.includes">{{i}}</li>
              </ul>
              <a routerLink="/booking" class="btn btn-primary w-100">Book {{p.name}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="container text-center">
      <app-section-title title="Membership Plans" subtitle="Wash more, save more"></app-section-title>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" *ngFor="let m of plans">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="fw-bold">{{m.name}}</h5>
              <h3 class="my-2">{{m.monthly | currency:'INR'}} <small class="text-secondary">/mo</small></h3>
              <ul class="small text-secondary mb-3">
                <li *ngFor="let perk of m.perks">{{perk}}</li>
              </ul>
              <a routerLink="/membership" class="btn btn-outline-primary w-100">Explore</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
})
export class HomePage implements OnInit {
  api = inject(ApiService);
  seo = inject(SeoService);
  services: WashService[] = [];
  pricing: PriceTier[] = [];
  plans: Plan[] = [];

  ngOnInit(){
    this.seo.set('Super Star Car Wash – Premium Touchless in Hyderabad','Fast, paint-safe, touchless wash with memberships and online booking.');
    this.api.getServices().subscribe(v => this.services = v);
    this.api.getPricing().subscribe(v => this.pricing = v);
    this.api.getPlans().subscribe(v => this.plans = v);
  }
}
