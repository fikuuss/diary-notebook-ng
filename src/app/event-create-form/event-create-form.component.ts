import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {dialogContextToken} from '../shared/dialog/dialog-context.token';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CalendarDto} from '../calendars/calendars.service';

const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

@Component({
  selector: 'app-event-create-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-create-form.component.html',
  styleUrl: './event-create-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCreateFormComponent implements OnInit, AfterViewInit {
  @ViewChild('modal') modalEl!: ElementRef<HTMLDivElement & {showModal: () => Record<string, unknown>}>;

  form = this.fb.group({
    calendar: null,
    title: '',
    place: '',
    start: convertToDateTimeLocalString(this.context.start ?? new Date()),
    end: convertToDateTimeLocalString(this.context.end ?? new Date()),
  });

  private readonly viewElemRef = this.vcr.element as ElementRef<HTMLElement>;

  constructor(
    @Inject(dialogContextToken)
    readonly context: {
      start: Date;
      end: Date;
      isAllday: boolean;
      gridSelectionElements: HTMLDivElement[];
      nativeEvent: MouseEvent;
      calendars: CalendarDto[];
      completeWith: () => Record<string, unknown>;
    },
    private readonly vcr: ViewContainerRef,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit() {
    console.log(this.form);
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.modalEl.nativeElement.showModal();
    });
    this.modalEl.nativeElement.addEventListener('close', () => {
      this.modalEl.nativeElement.addEventListener('transitionend', () => {
        this.viewElemRef.nativeElement.remove();
      });
      this.vcr.clear();
      this.context.completeWith();
    });
  }
}
