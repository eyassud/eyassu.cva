import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';

export interface IDerog {
  isDerog: boolean;
  reason: string;
}

@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChildComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ChildComponent,
      multi: true
    }
  ]
})
export class ChildComponent implements OnInit, ControlValueAccessor, Validator {
  childForm: FormGroup;
  isDisabled: boolean;

  onChange: (_) => void;
  onTouched: () => void;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    if (this.childForm.get('reason').errors)
      return this.childForm.get('reason').errors;

    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {

  }

  writeValue(derog: IDerog): void {
    if (derog) {
      this.childForm.get('isDerog').setValue(derog.isDerog);
      this.childForm.get('reason').setValue(derog.reason);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.childForm = new FormGroup({
      isDerog: new FormControl(),
      reason: new FormControl('', [Validators.required])
    });
  }

  chkBoxChange() {
    this.onChange(this.getValue());
    this.onTouched();
  }

  txtAreaChange() {
    this.onChange(this.getValue());
    this.onTouched();
  }

  private getValue(): IDerog {
    return {
      isDerog: this.childForm.get('isDerog').value,
      reason: this.childForm.get('reason').value,
    }
  }
}
