import Calendar from '@toast-ui/calendar';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DialogService} from './shared/dialog/dialog.service';
import {EventCreateFormComponent} from './event-create-form/event-create-form.component';
import {CalendarsService} from './calendars/calendars.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('calendar') calendarEl!: ElementRef<HTMLDivElement>;

  calendarInstance?: Calendar;
  title = 'diary-notebook-ng';

  constructor(
    private readonly calendarsService: CalendarsService,
    private readonly dialogService: DialogService,
  ) { }

  ngAfterViewInit() {
    this.calendarEl.nativeElement.style.height = `${document.body.clientHeight - 68}px`;

    this.calendarsService.calendars$.subscribe(calendars => {
      this.calendarInstance = new Calendar(this.calendarEl.nativeElement, {
        defaultView: 'week',
        useFormPopup: true,
        week: {
          eventView: true,
          taskView: false,
          dayNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб'],
          startDayOfWeek: 1,
        },
        template: {
          timegridDisplayPrimaryTime({time}) {
            return `${time.getHours()}:00`;
          },
        },
        calendars,
      });

      this.calendarInstance.on('selectDateTime', eventObj => {
        this.dialogService
          .open(EventCreateFormComponent, {...eventObj, calendars})
          .subscribe(() => {
            this.calendarInstance!.clearGridSelections();
          });
      });
    });
  }
}
