import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppGlobalsService } from 'src/services/services';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { addIcons } from 'ionicons';
import { homeOutline, personOutline, starOutline, documentTextOutline, informationCircleOutline, mailOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(NavController, { static: true }) nav!: NavController;

  pages: Array<{ title: string, route: string, icon: string, checkForLogin: boolean, data?: string }>;

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    public myGlobals: AppGlobalsService,
    private navCtrl: NavController,
    private menuController: MenuController // Inject IonMenuController
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'home.title', route: '/home', icon: 'home-outline', checkForLogin: false },
      { title: 'personal-info.title', route: '/personal-info', icon: 'person-outline', checkForLogin: true },
      { title: 'fav.title', route: '/text-fav', icon: 'star-outline', checkForLogin: true },
      { title: 'info.title0', route: '/info', icon: 'document-text-outline', checkForLogin: false, data: '0' },
      { title: 'info.title1', route: '/info', icon: 'information-circle-outline', checkForLogin: false, data: '1' },
      { title: 'info.title2', route: '/info', icon: 'document-text-outline', checkForLogin: false, data: '2' },
      { title: 'contact-us.title', route: '/contact-us', icon: 'mail-outline', checkForLogin: false }
    ];
    addIcons({ homeOutline, personOutline, starOutline, documentTextOutline, informationCircleOutline, mailOutline });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.translate.setDefaultLang('ar');

      // Update StatusBar usage
      StatusBar.setStyle({ style: Style.Default });
      StatusBar.setOverlaysWebView({ overlay: false });

      SplashScreen.hide();

      if (localStorage.getItem("isFirsUse") == undefined || localStorage.getItem("isFirsUse") == null) {
        this.myGlobals.isFirstUse = true;
      } else {
        this.myGlobals.isFirstUse = false;
      }
      localStorage.setItem("isFirsUse", "false");

      window.addEventListener('orientationchange', () => {
        let logo = document.getElementById("logo");
        if (logo) {
          switch (window.orientation) {
            case -80:
            case 80:
              logo.className = "landscape-logo";
              break;
            case 0:
              logo.className = "";
              break;
          }
        }
      });
    });
  }

  openPage(page: any) {
    if (page.data) {
      this.navCtrl.navigateRoot([page.route], { queryParams: { data: page.data } });
    } else {
      this.navCtrl.navigateRoot([page.route]);
    }
    this.menuController.close(); // Close the menu after navigation
  }

  showItem(checkForLogin: any) {
    return checkForLogin ? this.myGlobals.IsLoggedInFlag : true;
  }
}
