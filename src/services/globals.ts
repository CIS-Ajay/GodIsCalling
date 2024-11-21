import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular'; // Updated import
import { TranslateService } from '@ngx-translate/core'; // Updated import
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Updated import
// import { Device } from '@ionic-native/device/ngx'; // Updated import
import { Device } from '@capacitor/device';
import { ConfigClass } from './configs';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class AppGlobalsService {
  public IsLoggedInFlag = false;
  spinner: any;
  public userDetails: any;
  public isFirstUse: boolean = true;
  public trialEnd: boolean = false;
  public trialCallDone: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private loaderCtrl: LoadingController,
    private translateService: TranslateService,
    private http: HttpClient,
  ) {}

  setLoginStatus(isLoggedIn: boolean) {
    this.IsLoggedInFlag = isLoggedIn;
  }

  setUserDetails(obj: any) {
    this.userDetails = obj;
  }

  async showAlert(messageKey: string, title: string, okBtn: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: await this.translateService.get(messageKey).toPromise(),
      buttons: [await this.translateService.get(okBtn).toPromise()]
    });
    await alert.present();
  }

  async showConfirmationAlert(messageKey: string, title: string, okBtn: string, cancelBtn: string): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header: title,
      message: await this.translateService.get(messageKey).toPromise(),
      buttons: [
        {
          text: await this.translateService.get(cancelBtn).toPromise(),
          role: 'cancel',
          handler: () => {
            return false;
          }
        },
        {
          text: await this.translateService.get(okBtn).toPromise(),
          handler: () => {
            return true;
          }
        }
      ]
    });
    await alert.present();
    return new Promise((resolve) => {
      alert.onDidDismiss().then((result) => {
        resolve(result.role !== 'cancel');
      });
    });
  }

  async showForgetPasswordAlert(): Promise<string> {
    const alert = await this.alertCtrl.create({
      header: await this.translateService.get('forgetpassword.send').toPromise(),
      inputs: [
        {
          name: 'mail',
          placeholder: await this.translateService.get('forgetpassword.mail').toPromise()
        }
      ],
      buttons: [
        {
          text: await this.translateService.get('forgetpassword.cancel').toPromise(),
          role: 'cancel'
        },
        {
          text: await this.translateService.get('forgetpassword.send').toPromise(),
          handler: data => {
            return data.mail;
          }
        }
      ]
    });
    await alert.present();
    const { data } = await alert.onDidDismiss();
    return data ? data.mail : null;
  }

  async showTrialPopup(): Promise<string> {
    const alert = await this.alertCtrl.create({
      header: await this.translateService.get('home.msg').toPromise(),
      buttons: [
        {
          text: await this.translateService.get('forgetpassword.cancel').toPromise(),
          role: 'cancel'
        },
        {
          text: await this.translateService.get('home.open').toPromise(),
          handler: () => {
            return true;  // Return true to indicate the handler executed successfully
          }
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'cancel' ? '' : 'open';  // Ensure return type is always a string
  }

  async displayLoadingSpinner() {
    if (!this.spinner) {
      this.spinner = await this.loaderCtrl.create({
        spinner: 'dots',
        message: 'Loading...' // Optional message
      });
      this.spinner.present();
    }
  }

  async dismissLoadingSpinner() {
    if (this.spinner) {
      try {
        await this.spinner.dismiss();
      } catch (error) {
        console.error('Error dismissing loading spinner:', error);
      }
      this.spinner = null;
    }
  }

  getMonthName(month: any): string {
    const monthNames = [
      'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 
      'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    return monthNames[month - 1] || month.toString();
  }

  checkApp() {
    const data = {
      // deviceId: Device.serial
      deviceId: Device.getId
    };
    this.checkAppStatus(data).then(result => {
      this.displayTrialPopup(result);
      this.trialCallDone = true;
    }, error => {
      this.trialCallDone = false;
    });
  }

  async displayTrialPopup(response: any) {
    if (response.Message === 'true') {
      this.trialEnd = true;
      const data = await this.showTrialPopup();
      if (data === 'open') {
        if (window.device.platform.toLowerCase() === 'android') {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.JC2day.godis';
        } else {
          window.location.href = 'https://itunes.apple.com/us/app/god-is-calling/id1386057576?ls=1&mt=8';
        }
      }
    }
  }

  checkAppStatus(data: any): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return new Promise((resolve, reject) => {
      this.http.post(ConfigClass.getEndpoint + 'freeapp/check', data, { headers })
        .toPromise()
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  }
}
