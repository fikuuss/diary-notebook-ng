import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  readonly events$ = this.http.get('/api/v1/events');

  constructor(private readonly http: HttpClient) { }
}
