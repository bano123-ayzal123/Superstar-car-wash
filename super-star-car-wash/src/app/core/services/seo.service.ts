import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Injectable({providedIn:'root'})
export class SeoService {
constructor(private title: Title, private meta: Meta) {}
set(titleText: string, desc?: string) {
this.title.setTitle(titleText);
if (desc) this.meta.updateTag({ name: 'description', content: desc });
}
}