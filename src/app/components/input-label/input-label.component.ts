import {Component, Input, forwardRef, EventEmitter, Output, ElementRef, ViewChild, Provider} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";

const noop = (_?) => {};

@Component({
  selector: 'input-label',
  templateUrl: 'input-label.component.html',
  styleUrls: ['input-label.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputLabelComponent),
      multi: true
    }
  ]
})


export class InputLabelComponent  implements ControlValueAccessor {
  @ViewChild('input') input:ElementRef;
  @Input() type:string = 'text';
  @Input() disabled:boolean = null;
  @Input() required:boolean = null;
  @Input() autofocus:boolean = null;
  @Input() min:number = null;
  @Input() max:number = null;
  @Input() step:number = null;
  @Input() class:string = null;
  @Input() id:string = null;
  @Input() ngControl:string = null;

  @Output() focus:EventEmitter<any> = new EventEmitter();

  constructor() {}


  get isInputVoid(){
    if(this.value== null || this.value == ''){
      if(this.type == 'file'){
        return false;
      }
      return true;
    } else {
      return false;
    }
  }


  //The internal data model
  private _value: any = '';

  //Placeholders for the callbacks
  private _onTouchedCallback = noop;

  private _onChangeCallback: (_:any) => void = noop;

  //get accessor
  get value(): any { return this._value; };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }

  //Set touched on blur
  onTouched(){
    this._onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this._value = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  setFocus(time = 500){
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, time);
  }
}
