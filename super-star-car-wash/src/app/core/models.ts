export interface WashService { id: string; title: string; description: string; icon?: string; features?: string[]; }
export interface PriceTier { id: string; name: string; price: number; cadence?: 'one-time'|'monthly'; includes: string[]; badge?: string; }
export interface Plan { id: string; name: string; monthly: number; perks: string[]; }
export interface Location { id: string; name: string; address: string; city: string; pincode: string; lat: number; lng: number; phone?: string; hours?: string; }
export interface SiteInfo { phone: string; whatsapp?: string; email: string; tagline: string; }
export interface BookingRequest { name: string; phone: string; vehicleType: 'Hatchback'|'Sedan'|'SUV'|'Bike'; serviceId: string; date: string; time: string; notes?: string; }
