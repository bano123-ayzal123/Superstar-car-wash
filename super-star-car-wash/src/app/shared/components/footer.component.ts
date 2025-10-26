import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { SiteInfo } from '../../core/models';


@Component({
selector: 'app-footer',
standalone: true,
imports: [NgIf],
template: `
<footer class="bg-dark text-light mt-5 pt-5 pb-4">
<div class="container">
<div class="row g-4 align-items-start">
<div class="col-md-6">
<h5 class="fw-bold">⭐ Super Star Car Wash</h5>
<p class="mb-2">Premium touchless drive‑through wash. Safe for paint. Instant shine.</p>
<p class="small text-secondary mb-0">© {{year}} Super Star Car Wash. All rights reserved.</p>
</div>
<div class="col-md-6 text-md-end">
<div *ngIf="site">
<a [href]="'tel:'+site.phone" class="btn btn-outline-light btn-sm me-2">Call {{site.phone}}</a>
<a routerLink="/booking" class="btn btn-warning btn-sm">Book Now</a>
</div>
</div>
</div>
</div>
</footer>
`
})
export class FooterComponent implements OnInit {
api = inject(ApiService);
site?: SiteInfo; year = new Date().getFullYear();
ngOnInit(){ this.api.getSite().subscribe(s => this.site = s); }
}