// @ts-nocheck
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Record } from '../../interfaces/record';
import { TranslocoService } from '@ngneat/transloco';
import { Share } from '@capacitor/share';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  list;
  isAlertOpen = false;
  isAlert2Open = false;
  is_open = false;
  selected_services = '';
  public alertButtons = [''];
  successStatus: boolean;
  constructor(
    private location: Location,
    private appointmentService: AppointmentService,
    private translocoService: TranslocoService
  ) {
    this.list;
  }

  ngOnInit() {
    this.appointmentService.getRecords$().subscribe((res) => {
      this.list = res;
    });

    this.appointmentService.getIsSuccess$().subscribe((res) => {
      this.successStatus = res;
    });

    this.translocoService
      .selectTranslate('buttons.ok')
      .subscribe((value) => (this.alertButtons[0] = value));
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

  stringifyAppointments(appointment) {
    Object.keys(appointment.record.services).forEach(
      (key) =>
        (this.selected_services =
          this.selected_services +
          this.translocoService.translate('services.' + key) +
          ', ')
    );
  }

  onShare(appointment) {
    this.stringifyAppointments(appointment);
    Share.share({
      title: 'APPointer',
      text: `${appointment.record.name} ${appointment.record.lastname} - ${appointment.record.date}  |  ${this.selected_services} `,
      url: 'http://appointer.com/',
    });
  }

  onCopy(appointment) {
    this.is_open = true;
    this.stringifyAppointments(appointment);

    Clipboard.write({
      string: `${appointment.record.name} ${appointment.record.lastname} - ${appointment.record.date}  |  ${this.selected_services} `,
    });
  }
}
