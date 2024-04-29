import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export type CalendarDto = Readonly<{
  id: string;
  name: string;
  color?: string;
  backgroundColor?: string;
  dragBackgroundColor?: string;
  borderColor?: string;
}>;

@Injectable({
  providedIn: 'root',
})
export class CalendarsService {
  readonly calendars$ = this.http.get<CalendarDto[]>('/api/v1/calendars');

  constructor(private readonly http: HttpClient) { }
}
