import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppGlobalsService, TextServices } from 'src/services/services';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  type: string = "1";
  details: string = "";

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private myGlobals: AppGlobalsService,
    private textBE: TextServices
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.type = params['data'] || "1";
      this.loadInfo();
    });
  }

  loadInfo() {
    this.myGlobals.displayLoadingSpinner();
    this.textBE.getBookInfo().then((result: any) => {
      this.myGlobals.dismissLoadingSpinner();
      if (this.type == "0") {
        this.details = result[0].Brief;
      }
      else if (this.type == "1") {
        this.details = result[0].publisher;
      }
      else {
        this.details = result[0].Details;
      }
    }, (error: any) => {
      this.myGlobals.showAlert("errors.general", "errors.title", "errors.ok");
      this.myGlobals.dismissLoadingSpinner();
    });
  }

  openHome() {
    this.navCtrl.navigateRoot('/home');
  }

}
