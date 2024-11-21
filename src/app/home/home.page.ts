import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppGlobalsService, TextServices } from 'src/services/services';
import { PushNotifications } from '@capacitor/push-notifications';
// import { SharePage } from '../share/share.page';
import { LoginPage } from '../login/login.page';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    public myGlobals: AppGlobalsService,
    private textServiceBE: TextServices
  ) { };

  ngOnInit() {
    this.initializeFCM();
  }

  async initializeFCM() {
    // Register with Apple / Google to receive push via APNS/FCM
    await PushNotifications.requestPermissions();
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: any) => {
        console.log('Push registration success, token: ' + token.value);
        this.saveToken(token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.error('Push registration error: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: any) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: any) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  async saveToken(token: string) {
    if (this.myGlobals.isFirstUse) {
      const data = {
        DeviceID: token,
        OSType: (window as any).device.platform
      };
      await this.textServiceBE.saveNotificationToken(data);
    }
  }

  // async login() {
  //   const modal = await this.modalController.create({
  //     component: LoginPage
  //   });

  //   modal.onDidDismiss().then(result => {
  //     if (result.data && result.data.page === 'Reg') {
  //       this.navCtrl.navigateForward('/register');
  //     }
  //   });

  //   return await modal.present();
  // }

  async login() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'login-modal',
      backdropDismiss: false
    });
    return await modal.present();
  }

  logout() {
    this.myGlobals.showConfirmationAlert('home.msg2', 'home.title2', 'errors.ok', 'errors.cancel').then(succ => {
      if (succ) {
        this.myGlobals.setLoginStatus(false);
        this.myGlobals.userDetails = null;
      }
    });
  }

  async share() {
    await Share.share({
      title: 'Check this out!',
      text: 'I wanted to share God Calling with you.',
      // url: 'https://example.com',
      dialogTitle: 'Share with buddies',
    });
    
    // const modal = await this.modalController.create({
    //   component: SharePage
    // });
    // return await modal.present();
  }

  dailyDetails() {
    this.navCtrl.navigateForward('/day-details', {
      queryParams: {
        data: JSON.stringify({ /* your data object here */ })
      }
    });
  }
  
  openAllTxt() {
    this.navCtrl.navigateForward('/start-day');
  }

  contactus() {
    this.navCtrl.navigateForward('/contact-us');
  }

  getAllImages() {
    this.textServiceBE.getAllImages().then((result: any) => {
      // Handle images
    }).catch((error: any) => {
      this.myGlobals.dismissLoadingSpinner();
    });
  }
}
