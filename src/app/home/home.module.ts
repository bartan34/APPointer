import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './pages/home/home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslocoRootModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
