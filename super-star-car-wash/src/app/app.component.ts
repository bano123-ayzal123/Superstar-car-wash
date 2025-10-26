import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar.component';
import { FooterComponent } from './shared/components/footer.component';
import { RouterOutlet } from '@angular/router';


@Component({
selector: 'app-root',
standalone: true,
imports: [NavbarComponent, RouterOutlet, FooterComponent],
template: `
<app-navbar></app-navbar>
<main class="flex-grow-1">
<router-outlet></router-outlet>
</main>
<app-footer></app-footer>
`,
styles: [
`:host{min-height:100dvh;display:flex;flex-direction:column}`
]
})
export class AppComponent {}