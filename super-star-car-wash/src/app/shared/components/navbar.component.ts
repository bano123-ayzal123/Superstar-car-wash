import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { ApiService } from '../../core/services/api.service';


@Component({
selector: 'app-navbar',
standalone: true,
imports: [RouterLink, RouterLinkActive, NgIf],
template: `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
<div class="container">
<a class="navbar-brand fw-bold" routerLink="/">⭐ Super Star Car Wash</a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
<span class="navbar-toggler-icon"></span>
</button>
<div id="navContent" class="collapse navbar-collapse">
<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
<li class="nav-item"><a routerLink="/services" routerLinkActive="active" class="nav-link">Services</a></li>
<li class="nav-item"><a routerLink="/pricing" routerLinkActive="active" class="nav-link">Pricing</a></li>
<li class="nav-item"><a routerLink="/membership" routerLinkActive="active" class="nav-link">Membership</a></li>
<li class="nav-item"><a routerLink="/locations" routerLinkActive="active" class="nav-link">Locations</a></li>
<li class="nav-item"><a routerLink="/booking" routerLinkActive="active" class="nav-link">Book Now</a></li>
<li class="nav-item"><a routerLink="/contact" routerLinkActive="active" class="nav-link">Contact</a></li>
</ul>
<a routerLink="/booking" class="btn btn-warning ms-lg-3 fw-semibold">Book a Wash</a>
</div>
</div>
</nav>
`
})
export class NavbarComponent {
api = inject(ApiService);
}