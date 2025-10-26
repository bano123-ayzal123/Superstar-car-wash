import { Component, OnInit, inject } from '@angular/core';
import { NgFor, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { PriceTier } from '../../core/models';
import { SectionTitleComponent } from '../../shared/components/section-title.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  standalone: true,
  template: `
  <section class="py-5 bg-light">
    <div class="container">
      <app-section-title title="Pricing" subtitle="Simple, transparent packages"></app-section-title>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" *ngFor="let p of pricing">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="fw-bold">{{p.name}}</h5>
              <h3 class="my-2">{{p.price | currency:'INR'}}</h3>
              <ul class="small text-secondary mb-3">
                <li *ngFor="let i of p.includes">{{i}}</li>
              </ul>
              <a routerLink="/booking" class="btn btn-primary w-100">Book Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `,
  imports: [SectionTitleComponent, NgFor, CurrencyPipe]
})
export class PricingPage implements OnInit {
  api = inject(ApiService); seo = inject(SeoService);
  pricing: PriceTier[] = [];
  ngOnInit(){ this.seo.set('Pricing | Super Star Car Wash'); this.api.getPricing().subscribe(v => this.pricing = v); }
}