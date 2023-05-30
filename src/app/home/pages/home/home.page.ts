import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  features: any[] = [
    {
      id: 1,
      name: 'Randevular',
      src: 'assets/icon/list.png',
      page: 'list',
    },
    {
      id: 2,
      name: 'Yeni Randevu',
      src: 'assets/icon/add.png',
      page: 'add',
    },
  ];

  constructor(private appService: AppointmentService) {}

  ngOnInit(): void {
    this.appService.getRecrods();
  }
}
