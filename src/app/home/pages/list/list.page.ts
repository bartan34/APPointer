// @ts-nocheck
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Record } from '../../interfaces/record';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  list;
  isAlertOpen = false;
  isAlert2Open = false;

  public alertButtons = ['OK'];
  successStatus: boolean;
  constructor(
    private location: Location,
    private appointmentService: AppointmentService
  ) {
    this.list;
  }

  ngOnInit() {
    this.appointmentService.getRecords$().subscribe((res) => {
      if (res) {
        this.list = res;
        console.log(res);
      }
    });

    this.appointmentService.getIsSuccess$().subscribe((res) => {
      this.successStatus = res;
    });
  }

  goBack() {
    this.location.back();
  }

  setOpen(isOpen: boolean) {
    if (isOpen == true) {
      this.isAlertOpen = isOpen;
    } else {
      this.isAlert2Open = false;
    }
  }

  onDelete(record: Record, id) {
    this.appointmentService.deleteRecord(record, id);

    setTimeout(() => {
      this.setOpen(this.successStatus);
    }, 100);
  }
}
