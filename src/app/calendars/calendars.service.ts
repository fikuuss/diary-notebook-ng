import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarsService {
  readonly calendars$ = this.http.get('/api/v1/calendars');

  constructor(private readonly http: HttpClient) {}
}
