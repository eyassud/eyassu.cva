import { IDerog } from '../child/child.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  parentForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    const derogData: IDerog = {
      isDerog: true,
      reason: 'In the demo ...'
    };

    this.parentForm = new FormGroup({
      name: new FormControl(),
      isDerog: new FormControl(derogData)  ,
      nestedGroup: new FormGroup({
        
      })    
    });
  }

  onSubmit() {   
    console.log(this.parentForm.value);
  }
}
