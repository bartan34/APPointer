import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { services } from '../../interfaces/record';
import { AppointmentService } from '../../services/appointment.service';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  form: any;
  _services = services;

  isAlertOpen = false;
  public alertButtons = ['OK'];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      date: [null, Validators.required],
      services: [null, Validators.required],
    });
  }

  goBack() {
    this.location.back();
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.setOpen(true);
    }

    const services: any = {};

    this.form.get('services').value.forEach((service: string) => {
      services[service] = true;
    });

    const record = {
      ...this.form.getRawValue(),
      services: {
        ...services,
      },
    };

    this.appointmentService.createRecord({ ...record }, uuid.v4());
    setTimeout(() => {
      this.router.navigate(['/home/list']);
    }, 300);
  }
}
