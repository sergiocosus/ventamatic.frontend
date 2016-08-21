import {Component, Input, forwardRef, Provider, EventEmitter, Output} from '@angular/core';
import { CORE_DIRECTIVES } from "@angular/common";
import { NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";

const noop = (_?) => {};

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => InputLabelComponent),
    multi: true
  });


@Component({
  selector: 'input-label',
  templateUrl: 'input-label.component.html',
  styleUrls: ['input-label.component.scss'],
  directives: [CORE_DIRECTIVES],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})


export class InputLabelComponent  implements ControlValueAccessor {
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

}
