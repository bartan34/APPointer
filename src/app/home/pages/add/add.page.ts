import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  form: any;

  constructor(private location: Location, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null],
      lastname: [null],
      date: [null],
      services: [null],
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.form.getRawValue());
  }
}
