import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';
import { AppGlobalsService, TextServices } from "../../services/services";
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage {

  data: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private myGlobals: AppGlobalsService, private textServiceBE: TextServices) {
  }

  ionViewDidLoad() {
    this.myGlobals.displayLoadingSpinner();
    this.textServiceBE.getSocial().then((result) => {
      this.myGlobals.dismissLoadingSpinner();
      this.data = result;
    });
  }

  close() {
    this.navCtrl.pop();
    console.log('Popup closed');
  }

  imgClicked(id: string) {
    let item = this.data.find((item: { key: string }) => item.key === id);
    if (item) {
      window.open(item.value, '_blank');
    }
  }

}