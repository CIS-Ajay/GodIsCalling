import { Component, OnInit } from '@angular/core';
import { DayDetailsPage } from '../day-details/day-details.page';
import { AppGlobalsService, TextServices } from 'src/services/services';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-text-fav',
  templateUrl: './text-fav.page.html',
  styleUrls: ['./text-fav.page.scss'],
})
export class TextFavPage {

  allTxt: any = [];
  year: string = "";
  pageNo: number = 1;
  size: number = 10;
  showMore: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private myGlobals: AppGlobalsService, private textServicesBE: TextServices) {
  }

  ionViewDidLoad() {
    this.getData();
  }

  getData() {
    this.myGlobals.displayLoadingSpinner();
    this.textServicesBE.getUserFav(this.myGlobals.userDetails.id).then((result: any) => {
      this.year = new Date().getFullYear().toString();
      this.allTxt = this.allTxt.concat(result);
      this.myGlobals.dismissLoadingSpinner();
    }, (error: any) => {
      this.myGlobals.showAlert("errors.general", "errors.title", "errors.ok");
      this.myGlobals.dismissLoadingSpinner();
    });
  }

  openHome() {
    this.navCtrl.navigateRoot('/home');
  }

  openDetails(item: any) {
    this.navCtrl.navigateForward('/day-details', {
      queryParams: { item: JSON.stringify(item) }
    });
  }

  getMonthName(month: any) {
    return this.myGlobals.getMonthName(month);
  }

  removeFav(id: any) {
    this.myGlobals.displayLoadingSpinner();
    this.textServicesBE.deleteFav(id).then((result: any) => {
      this.myGlobals.dismissLoadingSpinner();
      this.myGlobals.showAlert("errors.delete-succ", "errors.success", "errors.ok");
      this.allTxt = this.allTxt.filter((a: { FavoriteID: any; }) => {
        return (a.FavoriteID != id);
      });
    }, (error: any) => {
      this.myGlobals.showAlert("errors.general", "errors.title", "errors.ok");
      this.myGlobals.dismissLoadingSpinner();
    });
  }
}

