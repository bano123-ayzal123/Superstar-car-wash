import { Component, Input } from '@angular/core';


@Component({
selector: 'app-hero',
standalone: true,
template: `
<section class="py-5 bg-light border-bottom">
<div class="container">
<div class="row align-items-center g-4">
<div class="col-lg-7">
<h1 class="display-5 fw-bold mb-3">{{title}}</h1>
<p class="lead text-secondary mb-4">{{subtitle}}</p>
<ng-content></ng-content>
</div>
<div class="col-lg-5 d-none d-lg-block text-center">
<img [src]="image" class="img-fluid rounded-4 shadow-sm" alt="hero" />
</div>
</div>
</div>
</section>
`
})
export class HeroComponent {
@Input() title = '';
@Input() subtitle = '';
@Input() image = 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1500&auto=format&fit=crop';
}