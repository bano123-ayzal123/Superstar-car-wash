import { Component, Input } from '@angular/core';


@Component({
selector: 'app-section-title',
standalone: true,
template: `
<div class="text-center mb-4">
<h2 class="fw-bold">{{title}}</h2>
<p class="text-secondary">{{subtitle}}</p>
</div>
`
})
export class SectionTitleComponent {
@Input() title = '';
@Input() subtitle = '';
}