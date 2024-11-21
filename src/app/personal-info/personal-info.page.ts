import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppGlobalsService } from 'src/services/services';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {

  data: any = {};

  constructor(
    private navCtrl: NavController,
    private myGlobals: AppGlobalsService
  ) {
    this.data = this.myGlobals.userDetails;
  }

  ngOnInit() {
    console.log('ngOnInit PersonalInfoPage');
  }

  openHome() {
    this.navCtrl.navigateRoot('/home'); // Adjust the path to your actual HomePage route
  }

  edit() {
    // Implement edit functionality if needed
  }

  maskPassword(password: string): string {
    return Array(password.length + 1).join("*");
  }

  formatDate(date: string): string {
    if (date.indexOf("T") > -1) {
      return date.split("T")[0];
    } else {
      return date;
    }
  }
}
