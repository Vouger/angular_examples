import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient: HttpClient) { }

  getActivities(val: string): Observable<any[]> {
    return this.httpClient.get<any>('/v1/activity/autocomplete', { params: {keyword: val} })
  }

  addActivity(body){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post('/v1/activity/add', body, httpOptions); 
  }
}
