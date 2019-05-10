import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';

@AutoUnsubscribe()
export class BaseFormControlWrapperValueAccessor implements ControlValueAccessor{
  formControl = new FormControl();
  protected sub = new SubscriptionManager();

  registerOnChange(fn: any): void {
    this.sub.add = this.formControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.formControl.statusChanges
      .pipe(filter(status => status === 'TOUCHED')).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControl.registerOnDisabledChange(() => isDisabled);

    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  writeValue(obj: any): void {
    this.formControl.setValue(obj);
  }
}
