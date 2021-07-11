import { Component, OnInit, ViewChild } from '@angular/core';
import { InputData } from '../input-data';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  // public inputData;
  
  public formResponse: string;
  public formData = [];
  @ViewChild('userForm', {static: false}) formValues;

  constructor() { }

  ngOnInit() {
    // this.inputData = new InputData('', '');
  }

  handleForm(userForm) {
    console.log("Form submitted");
    // console.log(this.inputData);
    console.log(userForm.input1);

    // this.formResponse = this.inputData.input1 + ' ' + this.inputData.input2;
    this.formResponse = userForm.input1 + ' ' + userForm.input2;
    this.formData.push(this.formResponse);
    this.formValues.reset();
  }

}
