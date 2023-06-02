import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  features: any[] = [
    {
      id: 1,
      name: '',
      src: 'assets/icon/list.png',
      page: 'list',
    },
    {
      id: 2,
      name: '',
      src: 'assets/icon/add.png',
      page: 'add',
    },
  ];
  currentLang: any;

  constructor(
    private appService: AppointmentService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.appService.getRecrods();

    this.translocoService.langChanges$.subscribe((lang) => {
      this.currentLang = lang;
    });

    this.translocoService
      .selectTranslate('home.appointments')
      .subscribe((value) => (this.features[0].name = value));

    this.translocoService
      .selectTranslate('home.new')
      .subscribe((value) => (this.features[1].name = value));
  }

  toggleLanguage() {
    if (this.currentLang === 'tr') {
      this.translocoService.setActiveLang('en');
    } else {
      this.translocoService.setActiveLang('tr');
    }
  }
}
