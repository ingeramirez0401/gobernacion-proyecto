import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/config`;

@Injectable({ providedIn: 'root' })
export class ConfigService {
    public oculto = 'oculto';
    public closed = false;
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) { }
}