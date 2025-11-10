import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export interface User { id: string; name: string; email: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'sscwauth_v1';
  private router = inject(Router);
  private _user$ = new BehaviorSubject<User | null>(this.read());
  readonly user$ = this._user$.asObservable();

  get isLoggedIn() { return !!this._user$.value; }

  login(email: string, _pw: string): Observable<User> {
    const u: User = { id: crypto.randomUUID(), name: email.split('@')[0], email };
    this.persist(u); return of(u);
  }
  register(name: string, email: string, _pw: string): Observable<User> {
    const u: User = { id: crypto.randomUUID(), name, email };
    this.persist(u); return of(u);
  }

  logout(redirectTo: string = '/login') {
    try { localStorage.removeItem(this.KEY); } catch {}
    this._user$.next(null);
    queueMicrotask(() => this.router.navigateByUrl(redirectTo));
  }

  private persist(u: User) { localStorage.setItem(this.KEY, JSON.stringify(u)); this._user$.next(u); }
  private read(): User | null { try { return JSON.parse(localStorage.getItem(this.KEY) || 'null'); } catch { return null; } }
}
