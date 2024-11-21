import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Share } from '@capacitor/share';
import { NavController, NavParams } from '@ionic/angular';
import { AppGlobalsService, TextServices } from 'src/services/services';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.page.html',
  styleUrls: ['./day-details.page.scss'],
})
export class DayDetailsPage {

  dateStr: string = "";
  img: string = "assets/images/post_photo.jpg";
  options: string = "add";
  soundSrc: string = "";
  data: any = {};
  name: string = "";
  email: string = "";
  comment: string = "";
  comments: any = [];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public myGlobals: AppGlobalsService,
    private textServices: TextServices,
    private router: Router,

  ) {}

  ngOnInit() {
    // For queryParams
    this.route.queryParams.subscribe(params => {
      if (params && params['data']) {
        this.data = JSON.parse(params['data']);
      }
    });

    // For state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['data']) {
      this.data = navigation.extras.state['data'];
    }
  }

  ionViewDidLoad() {
    let date = new Date();
    if (!this.data.sound) {
      this.myGlobals.displayLoadingSpinner();
      let day = date.getDate().toString().padStart(2, '0');
      let month = (date.getMonth() + 1).toString();

      month = this.myGlobals.getMonthName(month);
      this.dateStr = `${day} - ${month}`;
      this.textServices.getDayText().then(result => {
        this.data = result;
        this.soundSrc = this.data.sound;
        if (this.data.img) {
          this.img = this.data.img;
        }
        this.myGlobals.dismissLoadingSpinner();
      }).catch(() => {
        this.myGlobals.showAlert("errors.general", "errors.title", "errors.ok");
        this.myGlobals.dismissLoadingSpinner();
      });
    } else {
      this.dateStr = `${this.data.DateDay} - ${this.myGlobals.getMonthName(this.data.DateMounth)}`;
      this.soundSrc = this.data.sound;
      if (this.data.img) {
        this.img = this.data.img;
      }
    }
  }

  openList() {
    this.navCtrl.navigateForward('/start-day');
  }

  segmentChanged(event: any) {
    if (event.detail.value === "show") {
      this.myGlobals.displayLoadingSpinner();
      this.textServices.getAllComments(this.data.s_id).then((result: any) => {
        this.myGlobals.dismissLoadingSpinner();
        this.comments = result.reverse();
      }).catch(() => {
        this.myGlobals.showAlert("errors.general", "errors.title", "errors.ok");
        this.myGlobals.dismissLoadingSpinner();
      });
    }
  }

  addToFav() {
    this.myGlobals.displayLoadingSpinner();
    const data = {
      Userid: this.myGlobals.userDetails.id,
      TextID: this.data.s_id
    };

    this.textServices.addUserFav(data).then(() => {
      this.myGlobals.dismissLoadingSpinner();
      this.myGlobals.showAlert("errors.add-succ", "errors.success", "errors.ok");
    }).catch(() => {
      this.myGlobals.showAlert("errors.general", "errors.title", "errors.ok");
      this.myGlobals.dismissLoadingSpinner();
    });
  }
  
  async share() {
    const url = (window as any).device.platform.toLowerCase() === "android"
      ? 'https://play.google.com/store/apps/details?id=com.JC2day.godis'
      : 'https://itunes.apple.com/us/app/god-is-calling/id1386057576?ls=1&mt=8';

    await Share.share({ 
      text: this.data.details,
      title: this.data.title,
      url: url
    });
  }

  download() {
    window.open(this.soundSrc, "_self");
  }

  addComment() {
    if (!this.name || !this.email || !this.comment) {
      this.myGlobals.showAlert("errors.validation", "errors.title", "errors.ok");
    } else {
      this.myGlobals.displayLoadingSpinner();
      const data = {
        username: this.name,
        email: this.email,
        comment: this.comment,
        TextID: this.data.s_id
      };
      this.textServices.addComment(data).then(() => {
        this.myGlobals.dismissLoadingSpinner();
        this.name = '';
        this.email = '';
        this.comment = '';
        this.myGlobals.showAlert("errors.comment-added", "errors.success", "errors.ok");
      }).catch(() => {
        this.myGlobals.showAlert("errors.general", "errors.title", "errors.ok");
        this.myGlobals.dismissLoadingSpinner();
      });
    }
  }

  openHome() {
    this.navCtrl.navigateRoot('/home');
  }


}
