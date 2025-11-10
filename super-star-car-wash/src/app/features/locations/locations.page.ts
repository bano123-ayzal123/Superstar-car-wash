import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Location } from '../../core/models';
import { SectionTitleComponent } from '../../shared/components/section-title.component';
import { SeoService } from '../../core/services/seo.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  template: `
  <section class="py-5 bg-light">
    <div class="container">
      <app-section-title title="Locations" subtitle="Find a Super Star Car Wash near you"></app-section-title>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" *ngFor="let l of locations">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="fw-bold">{{l.name}}</h5>
              <p class="text-secondary mb-1">{{l.address}}, {{l.city}} - {{l.pincode}}</p>
              <p class="small mb-2" *ngIf="l.hours">Hours: {{l.hours}}</p>
              <div class="d-flex gap-2">
                <a class="btn btn-outline-primary btn-sm" [href]="'https://www.google.com/maps?q='+l.lat+','+l.lng" target="_blank">Map</a>
                <a *ngIf="l.phone" class="btn btn-primary btn-sm" [href]="'tel:'+l.phone">Call</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `,
  imports: [CommonModule,SectionTitleComponent, NgFor]
})
export class LocationsPage implements OnInit {
  api = inject(ApiService); seo = inject(SeoService);
  locations: Location[] = [];
  ngOnInit(){ this.seo.set('Locations | Super Star Car Wash'); this.api.getLocations().subscribe(v => this.locations = v); }
}