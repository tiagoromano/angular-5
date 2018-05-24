import { ControlValueAccessor } from '@angular/forms';
 
export abstract class CrontrolValueAccessorBase<T> implements ControlValueAccessor {
  onChange = (value: T) => {};
  onTouched = () => {};
 
  protected innerValue: T;
  protected baseValue: any;
 
  get value(): T { 
    console.log(this.serializable(this.baseValue)); 
    console.log(this.serializable(this.innerValue)); 
    
    if (this.serializable(this.baseValue) != this.serializable((this.innerValue))) {
      this.writeAdapterValue(this.baseValue, this.innerValue);
    }
    this.baseValue = this.deserializable(this.serializable(this.innerValue));

    return this.innerValue;
  }

  serializable(object) {
    if (!object || (object !== Object(object))) {
      return object;
    } else {
      return JSON.stringify(object);
    }
  }

  deserializable(json: any) {
    if (json && (typeof json === 'string')) {
      return JSON.parse(json);
    } else {
      return json;
    }
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  writeAdapterValue(oldValue: T, value: T) {};

  writeValue(value: T) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}