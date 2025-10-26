import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { WashService } from '../../core/models';
import { SectionTitleComponent } from '../../shared/components/section-title.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  standalone: true,
  template: `
  <section class="py-5">
    <div class="container">
      <app-section-title title="Services" subtitle="Engineered cycles for a perfect shine"></app-section-title>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" *ngFor="let s of services">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="fw-bold">{{s.title}}</h5>
              <p class="text-secondary">{{s.description}}</p>
              <ul class="small text-secondary mb-0">
                <li *ngFor="let f of s.features">{{f}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `,
  imports: [SectionTitleComponent, NgFor]
})
export class ServicesPage implements OnInit {
  api = inject(ApiService); seo = inject(SeoService);
  services: WashService[] = [];
  ngOnInit(){
    this.seo.set('Services | Super Star Car Wash');
    this.api.getServices().subscribe(v => this.services = v);
  }
}