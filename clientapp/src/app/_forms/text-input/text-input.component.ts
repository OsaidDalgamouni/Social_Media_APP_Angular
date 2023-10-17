import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label='';
  @Input() type='text';

  constructor(@Self() public ngControl:NgControl) {
    this.ngControl.valueAccessor=this 
    //this represent our text component class which implement the conrol value Accessor

    //@self mean :angular when we inject 
    //something into a constructor its gonna be cheacked if this used recently 
    //and if it has its  reuse thing but in input we dont reuse control that in memory
    //we wont to insure that the control is uniqe so we use @ self
    
   }
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
   
  }
  registerOnTouched(fn: any): void {

  }
  get control():FormControl{
    return this.ngControl.control as FormControl

  }
}
