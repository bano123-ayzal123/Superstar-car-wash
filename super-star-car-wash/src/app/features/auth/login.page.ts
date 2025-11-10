import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  template: `
  <section class="auth-wrap">
    <div class="card">
      <h2>Login</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>Email</label>
        <input type="email" formControlName="email" placeholder="you@example.com" />
        <small *ngIf="form.controls.email.touched && form.controls.email.invalid">Valid email is required</small>

        <label>Password</label>
        <input type="password" formControlName="password" placeholder="••••••••" />
        <small *ngIf="form.controls.password.touched && form.controls.password.invalid">Min 6 characters</small>

        <button class="btn-primary" type="submit" [disabled]="form.invalid">Login</button>
      </form>

      <p class="muted">New here? <a routerLink="/register">Create an account</a></p>
    </div>
  </section>
  `,
  styles: [`
    .auth-wrap{display:grid;place-items:center;min-height:70vh;padding:2rem}
    .card{width:min(520px,92vw);background:#fff;border-radius:16px;padding:2rem;box-shadow:0 14px 38px rgba(0,0,0,.12)}
    h2{margin:0 0 1rem;font-weight:800}
    form{display:grid;gap:.8rem}
    label{font-size:.9rem;color:#333}
    input{padding:.75rem .9rem;border:1px solid #e3e5e8;border-radius:10px;font-size:1rem}
    small{color:#d33}
    .btn-primary{margin-top:.6rem;border:0;border-radius:999px;padding:.8rem 1rem;background:#0d6efd;color:#fff;font-weight:700;cursor:pointer}
    .muted{margin-top:1rem;color:#666}
  `]
})
export default class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit(){
    if (this.form.invalid) return;
    const { email, password } = this.form.value as any;
    this.auth.login(email, password).subscribe(() => {
      const url = new URL(location.href);
      const redirect = url.searchParams.get('redirect') || '/';
      this.router.navigateByUrl(redirect);
    });
  }
}
