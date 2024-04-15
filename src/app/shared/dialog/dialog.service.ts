import {
  ApplicationRef,
  ComponentRef,
  Injectable,
  Injector,
  Type,
  createComponent,
} from '@angular/core';
import { DIALOG_CONTEXT_TOKEN } from './dialog-context.token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private appRef: ApplicationRef) {}

  open<T, K>(
    component: Type<T>,
    context?: K
  ): Observable<unknown> {
    const obs = new Observable((observer) => {
      const modal = createComponent<T>(component, {
        environmentInjector: this.appRef.injector,
        elementInjector: Injector.create({
          parent: this.appRef.injector,
          providers: [
            {
              provide: DIALOG_CONTEXT_TOKEN,
              useValue: {
                ...context,
                completeWith: (result: unknown): void => {
                  observer.next(result);
                  observer.complete();
                },
              },
            },
          ],
        }),
      });

      document.body.appendChild(modal.location.nativeElement);
      this.appRef.attachView(modal.hostView);
    });

    return obs;
  }
}
