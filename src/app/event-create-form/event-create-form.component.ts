import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DIALOG_CONTEXT_TOKEN } from '../shared/dialog/dialog-context.token';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  form = this.fb.group({
    calendar: null,
    title: '',
    place: '',
    start: convertToDateTimeLocalString(this.context.start ?? new Date()),
    end: convertToDateTimeLocalString(this.context.end ?? new Date()),
  });

  constructor(
    @Inject(DIALOG_CONTEXT_TOKEN)
    readonly context: {
      start: Date;
      end: Date;
      isAllday: boolean;
      gridSelectionElements: HTMLDivElement[];
      nativeEvent: MouseEvent;
      calendars: any,
      completeWith: () => {};
    },
    private readonly vcr: ViewContainerRef,
    private readonly fb: FormBuilder
  ) {}

  @ViewChild('modal') modalEl!: ElementRef<
    HTMLDivElement & { showModal: () => {} }
  >;

  ngOnInit() {
    console.log(this.form);
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.modalEl.nativeElement.showModal();
    });
    this.modalEl.nativeElement.addEventListener('close', () => {
      this.modalEl.nativeElement.addEventListener('transitionend', () => {
        this.vcr.element.nativeElement.remove();
      });
      this.vcr.clear();
      this.context.completeWith();
    });
  }
}
