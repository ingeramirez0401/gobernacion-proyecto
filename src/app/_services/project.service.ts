import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Project } from '../_models/project';

const baseUrl = `${environment.apiUrl}/projects`;

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private projectSubject: BehaviorSubject<Project>;
    public project: Observable<Project>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.projectSubject = new BehaviorSubject<Project>(null);
        this.project = this.projectSubject.asObservable();
    }

    public get projectValue(): Project {
        return this.projectSubject.value;
    }

    getAll() {
        return this.http.get<Project[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Project>(`${baseUrl}/${id}`);
    }
    
    create(params) {
        return this.http.post(baseUrl, params);
    }
    
    update(id, params) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((client: any) => {
                return client;
            }));
    }
    
    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}