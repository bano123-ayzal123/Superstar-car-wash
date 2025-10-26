import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { SectionTitleComponent } from '../../shared/components/section-title.component';
import { NgIf } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  standalone: true,
  template: `
  <section class="py-5">
    <div class="container" [class.opacity-50]="loading">
      <app-section-title title="Book a Wash" subtitle="Pick your vehicle, service, date and time."></app-section-title>

      <form [formGroup]="form" (ngSubmit)="submit()" class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Name</label>
          <input class="form-control" formControlName="name" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">Phone</label>
          <input class="form-control" formControlName="phone" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">Vehicle Type</label>
          <select class="form-select" formControlName="vehicleType">
            <option>Hatchback</option>
            <option>Sedan</option>
            <option>SUV</option>
            <option>Bike</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">Service</label>
          <select class="form-select" formControlName="serviceId">
            <option *ngFor="let s of services" [value]="s.id">{{s.title}}</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">Date</label>
          <input type="date" class="form-control" formControlName="date">
        </div>
        <div class="col-md-6">
          <label class="form-label">Time</label>
          <input type="time" class="form-control" formControlName="time">
        </div>
        <div class="col-12">
          <label class="form-label">Notes</label>
          <textarea rows="3" class="form-control" formControlName="notes" placeholder="Any special requests..."></textarea>
        </div>
        <div class="col-12 d-flex gap-2">
          <button class="btn btn-primary" [disabled]="form.invalid || loading">Confirm Booking</button>
          <a routerLink="/pricing" class="btn btn-outline-secondary">View Pricing</a>
        </div>
      </form>

      <div class="alert alert-success mt-4" *ngIf="success">Booking confirmed! We'll contact you shortly.</div>
    </div>
  </section>
  `,
  imports: [ReactiveFormsModule, SectionTitleComponent, NgIf]
})
export class BookingPage {
  api = inject(ApiService); fb = inject(FormBuilder); seo = inject(SeoService);
  services: {id:string; title:string}[] = [];
  loading = false; success = false;

  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    vehicleType: ['Hatchback', Validators.required],
    serviceId: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    notes: ['']
  });

  constructor(){
    this.seo.set('Book a Wash | Super Star Car Wash');
    this.api.getServices().subscribe(s => this.services = s.map(x => ({id:x.id, title:x.title})));
  }

  submit(){
    if(this.form.invalid) return;
    this.loading = true; this.success = false;
    this.api.submitBooking(this.form.getRawValue() as any).subscribe(() => {
      this.success = true; this.loading = false; this.form.reset({vehicleType:'Hatchback'});
    });
  }
}