import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WashService, PriceTier, Plan, Location, SiteInfo, BookingRequest } from '../models';


@Injectable({ providedIn: 'root' })
export class ApiService {
private http = inject(HttpClient);


getServices(): Observable<WashService[]> { return this.http.get<WashService[]>('assets/services.json'); }
getPricing(): Observable<PriceTier[]> { return this.http.get<PriceTier[]>('assets/pricing.json'); }
getPlans(): Observable<Plan[]> { return this.http.get<Plan[]>('assets/plans.json'); }
getLocations(): Observable<Location[]> { return this.http.get<Location[]>('assets/locations.json'); }
getSite(): Observable<SiteInfo> { return this.http.get<SiteInfo>('assets/site.json'); }


submitBooking(payload: BookingRequest): Observable<{ok:true}> {
// For now, mock success. Integrate real backend/email later.
console.log('Mock booking submit', payload);
return new Observable(sub => { setTimeout(() => { sub.next({ok: true}); sub.complete(); }, 600); });
}


submitContact(payload: {name:string; email:string; message:string; phone?:string}): Observable<{ok:true}> {
console.log('Mock contact submit', payload);
return new Observable(sub => { setTimeout(() => { sub.next({ok: true}); sub.complete(); }, 600); });
}
}