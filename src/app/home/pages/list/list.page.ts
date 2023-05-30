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
  list: any;

  constructor(
    private location: Location,
    private appointmentService: AppointmentService
  ) {
    this.list = [];
  }

  ngOnInit() {
    this.appointmentService.getRecords$().subscribe((res) => {
      if (res) {
        this.list = res;
        console.log(res);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
