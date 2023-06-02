import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Record, services } from '../../interfaces/record';
import { FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import * as uuid from 'uuid';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string | null;
  form: any;
  _services = services;
  record: any;
  isAlertOpen = false;
  isAlertOpen2 = false;

  public alertButtons = ['OK'];
  successStatus: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.appointmentService.getRecord(this.id);
    this.appointmentService.getRecord$().subscribe((res) => {
      if (res) {
        this.record = res.record;
        this.form = this.fb.group({
          name: [this.record.name, Validators.required],
          lastname: [this.record.lastname, Validators.required],
          date: [this.record.date, Validators.required],
          services: [[], Validators.required],
        });
        this.initServices();
      }
    });
    this.appointmentService.getIsSuccess$().subscribe((res) => {
      this.successStatus = res;
    });
  }

  goBack() {
    this.location.back();
  }

  initServices() {
    let services: any = [];
    Object.keys(this.record.services).forEach((key) => services.push(key));
    services.forEach((service: any) =>
      this.form.get('services').value.push(service)
    );
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  setOpen2(isOpen: boolean) {
    this.isAlertOpen2 = isOpen;
  }

  onComplete() {
    this.router.navigate(['/home/list']);
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

    this.appointmentService.updateRecord({ ...record }, this.id);

    setTimeout(() => {
      // this.router.navigate(['/home/list']);
      this.setOpen2(this.successStatus);
    }, 300);
  }
}
