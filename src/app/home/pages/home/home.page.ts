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
      page: '',
    },
    {
      id: 2,
      name: 'Yeni Randevu',
      src: 'assets/icon/add.png',
      page: '',
    },
  ];

  transactions: any[] = [
    {
      id: 1,
      vendor: 'Received from PhonePe',
      image: '',
      amount: 1500,
      time: '3:00PM',
    },
    { id: 2, vendor: 'Flaticons', image: '', amount: -1200, time: '4:00PM' },
  ];

  constructor(private appService: AppointmentService) {}

  ngOnInit(): void {
    // this.appService.getAllRecords();
    this.appService.getRecrods();
    // this.appService.getRecord('1');
  }
}
