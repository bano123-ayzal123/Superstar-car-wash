import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { SectionTitleComponent } from '../../shared/components/section-title.component';
import { NgIf } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  template: `
  <section class="py-5 bg-light">
    <div class="container" [class.opacity-50]="loading">
      <app-section-title title="Contact Us" subtitle="Questions, feedback, partnerships"></app-section-title>

      <form [formGroup]="form" (ngSubmit)="submit()" class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Name</label>
          <input class="form-control" formControlName="name" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" formControlName="email" required>
        </div>
        <div class="col-12">
          <label class="form-label">Message</label>
          <textarea rows="4" class="form-control" formControlName="message" required></textarea>
        </div>
        <div class="col-12 d-flex gap-2">
          <button class="btn btn-primary" [disabled]="form.invalid || loading">Send</button>
          <a routerLink="/locations" class="btn btn-outline-secondary">Find a Location</a>
        </div>
      </form>

      <div class="alert alert-success mt-4" *ngIf="success">Thanks! We'll get back to you.</div>
    </div>
  </section>
  `,
  imports: [ReactiveFormsModule, SectionTitleComponent, NgIf, RouterLink]
})
export class ContactPage {
  private api = inject(ApiService);
  private seo = inject(SeoService);
  private fb = inject(FormBuilder);

  loading = false;
  success = false;

  // ✅ Each FormControl marked non-nullable
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true })
  });

  constructor() {
    this.seo.set('Contact | Super Star Car Wash');
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.success = false;

    // ✅ All values are strings (no `null` possibility)
    const payload = this.form.getRawValue();
    this.api.submitContact(payload).subscribe(() => {
      this.success = true;
      this.loading = false;
      this.form.reset({ name: '', email: '', message: '', phone: '' });
    });
  }
}
