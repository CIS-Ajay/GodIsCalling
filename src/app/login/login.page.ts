import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { AppGlobalsService, TextServices } from 'src/services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = "";
  password: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private myGlobals: AppGlobalsService,
    private textServiceBE: TextServices,
    private modalController: ModalController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async closeLogin() {
    await this.modalController.dismiss();
  }

  async login() {
    if (this.username === "" || this.password === "") {
      this.myGlobals.showAlert("errors.validation", "errors.title", "errors.ok");
    } else {
      console.log('username', this.username)
      console.log('password', this.password)
      this.myGlobals.displayLoadingSpinner();
      setTimeout(async () => {
        this.myGlobals.setLoginStatus(true);
        this.myGlobals.setUserDetails(this.username);
        this.myGlobals.dismissLoadingSpinner();
        await this.modalController.dismiss();
      }, 2000);
      return;
      this.myGlobals.displayLoadingSpinner();
      this.textServiceBE.login(this.username, this.password).then(async (result) => {
        this.myGlobals.setLoginStatus(true);
        this.myGlobals.setUserDetails(result);
        this.myGlobals.dismissLoadingSpinner();
        await this.modalController.dismiss();
      }).catch(error => {
        this.myGlobals.showAlert("errors.general", "errors.title", "errors.ok");
        this.myGlobals.dismissLoadingSpinner();
      });
    }
  }

  forgetpassword() {
    this.myGlobals.showForgetPasswordAlert().then((data: string) => {
      if (data === "") {
        this.myGlobals.showAlert("forgetpassword.msg", "errors.title", "errors.ok");
      } else {
        this.myGlobals.displayLoadingSpinner();
        let req = { Email: data };
        this.textServiceBE.forgetPassword(req).then(result => {
          this.myGlobals.dismissLoadingSpinner();
          this.myGlobals.showAlert("forgetpassword.success", "errors.success", "errors.ok");
          this.navCtrl.navigateBack('/home'); 
        }).catch(error => {
          this.myGlobals.showAlert("errors.wrong-email", "errors.title", "errors.ok");
          this.myGlobals.dismissLoadingSpinner();
        });
      }
    });
  }

  async register() {
    await this.modalController.dismiss();
    let data = { 'page': 'Reg' };
    // Navigate to the register page
    this.navCtrl.navigateForward('/register', { queryParams: data });
  }

}
