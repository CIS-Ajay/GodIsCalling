import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppGlobalsService, TextServices } from 'src/services/services';
import { DatePicker } from '@capacitor-community/date-picker'

@Component({
  selector: 'app-start-day',
  templateUrl: './start-day.page.html',
  styleUrls: ['./start-day.page.scss'],
})
export class StartDayPage {

  allTxt: any = [];
  year: string = "";
  pageNo: number = 1;
  size: number = 10;
  showMore: boolean = true;

  constructor(
    private navCtrl: NavController,
    private myGlobals: AppGlobalsService,
    private textServicesBE: TextServices,
    private translate: TranslateService
  ) { }

  async openDate() {
    const today = new Date();
    try {
      const datePickerOptions:any = {
        date: today, // Convert the date to a string
        mode: 'date',
        maxDate: today, // Convert the date to a string
        okText: this.translate.instant("errors.ok"),
        cancelText: this.translate.instant("errors.cancel")
      }

      const result = await DatePicker.present(datePickerOptions);

      if (result.value) {
        const selectedDate = new Date(result.value); // Convert the result string back to a Date object
        this.myGlobals.displayLoadingSpinner();
        const day = selectedDate.getDate();
        const month = selectedDate.getMonth() + 1;
        const textResult = await this.textServicesBE.getSelectedDayText(day, month);
        this.myGlobals.dismissLoadingSpinner();
        this.navCtrl.navigateForward('/day-details', { queryParams: textResult }); // Adjust if necessary
      }
    } catch (err) {
      console.log('Error occurred while getting date: ', err);
      this.myGlobals.dismissLoadingSpinner();
    }
  }


  ionViewDidLoad() {
    this.getData();
  }

  getData() {
    this.myGlobals.displayLoadingSpinner();
    this.textServicesBE.getAllText(this.pageNo, this.size).then((result: any) => {
      this.allTxt = this.allTxt.concat(result);
      this.myGlobals.dismissLoadingSpinner();
      if (result.length < this.size) {
        this.showMore = false;
      }
    }).catch(error => {
      this.myGlobals.showAlert("errors.general", "errors.title", "errors.ok");
      this.myGlobals.dismissLoadingSpinner();
    });
  }

  openHome() {
    this.navCtrl.navigateRoot('/home'); // Adjust if necessary
  }

  openDetails(item: any) {
    this.navCtrl.navigateForward('/day-details', { queryParams: item }); // Adjust if necessary
  }

  getMonthName(month: any) {
    return this.myGlobals.getMonthName(month);
  }

  more() {
    this.pageNo += 1;
    this.getData();
  }

}
