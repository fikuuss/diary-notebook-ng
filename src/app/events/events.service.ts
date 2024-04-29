import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly events$ = this.http.get<any[]>('/api/v1/events?start=2024-04-15T00:00:00.000Z&end=2024-04-21T00:00:00.000Z');

  constructor(private readonly http: HttpClient) { }
}
