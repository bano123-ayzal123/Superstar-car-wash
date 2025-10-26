import { Component, OnInit, inject } from '@angular/core';
import { NgFor, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Plan } from '../../core/models';
import { SectionTitleComponent } from '../../shared/components/section-title.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  standalone: true,
  template: `
  <section class="py-5">
    <div class="container">
      <app-section-title title="Membership" subtitle="Unlimited washes. One flat monthly price."></app-section-title>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" *ngFor="let m of plans">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="fw-bold">{{m.name}}</h5>
              <h3 class="my-2">{{m.monthly | currency:'INR'}} <small class="text-secondary">/mo</small></h3>
              <ul class="small text-secondary mb-3"><li *ngFor="let perk of m.perks">{{perk}}</li></ul>
              <a routerLink="/booking" class="btn btn-primary w-100">Join Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `,
  imports: [SectionTitleComponent, NgFor, CurrencyPipe]
})
export class MembershipPage implements OnInit {
  api = inject(ApiService); seo = inject(SeoService);
  plans: Plan[] = [];
  ngOnInit(){ this.seo.set('Membership | Super Star Car Wash'); this.api.getPlans().subscribe(v => this.plans = v); }
}