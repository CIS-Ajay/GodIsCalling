import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppGlobalsService, TextServices } from 'src/services/services';
import { DatePicker } from '@capacitor-community/date-picker';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = "";
  image: string = "";
  birthdate: string = "";
  country: string = "";
  tel: string = "";
  email: string = "";
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private navCtrl: NavController,
    private textBE: TextServices,
    private myGlobals: AppGlobalsService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    console.log('ngOnInit RegisterPage');
  }

  register() {
    let data = {
      Fullname: this.name,
      birthdate: this.birthdate,
      country: this.country,
      telephone: this.tel,
      email: this.email,
      username: this.username,
      password: this.password
    };
    console.log('data',data)
    if (this.validateInputs()) {
      let data = {
        Fullname: this.name,
        img: this.image,
        birthdate: this.birthdate,
        country: this.country,
        telephone: this.tel,
        email: this.email,
        username: this.username,
        password: this.password
      };
      this.myGlobals.displayLoadingSpinner();
      this.textBE.registerUser(data).then((result: any) => {
        this.myGlobals.dismissLoadingSpinner();
        this.clearInputs();
        this.myGlobals.showAlert("register.success", "errors.title", "errors.ok");
      }).catch((error: any) => {
        this.myGlobals.showAlert("errors.general", "errors.title", "errors.ok");
        this.myGlobals.dismissLoadingSpinner();
      });
    }
  }

  validateInputs() {
    if (this.name === "" || this.email === "" || this.username === "" || this.password === "" || (this.password !== this.confirmPassword)) {
      this.myGlobals.showAlert("errors.validation", "errors.title", "errors.ok");
      return false;
    }

    if (new Date(this.birthdate) > new Date()) {
      this.myGlobals.showAlert("errors.birthdate.future", "errors.title", "errors.ok");
      return false;
    }

    const phonePattern = /^\d{10,16}$/;
    if (!phonePattern.test(this.tel)) {
      this.myGlobals.showAlert("errors.tel.invalid", "errors.title", "errors.ok");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      this.myGlobals.showAlert("errors.email.invalid", "errors.title", "errors.ok");
      return false;
    }

    return true;
  }

  async getImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 50,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      this.image = image.dataUrl || '';
    } catch (err) {
      console.error('Error occurred while getting image: ', err);
    }
  }

  openHome() {
    this.navCtrl.navigateRoot('/home');
  }

  async openDate() {
    let today = new Date();
    const options: any = {
      date: today.toISOString().split('T')[0], // Format the date as 'YYYY-MM-DD'
      mode: 'date', // Use the correct DatePickerMode enum value
      maxDate: today.toISOString().split('T')[0], // Format the date as 'YYYY-MM-DD'
      androidTheme: 'THEME_HOLO_DARK', // Ensure this is the correct theme
      okText: this.translate.instant("errors.ok"),
      cancelText: this.translate.instant("errors.cancel")
    };

    try {
      const { value } = await DatePicker.present(options);
      this.birthdate = new Date(value).toDateString();
    } catch (err) {
      console.error('Error occurred while getting date: ', err);
    }
  }

  clearInputs() {
    this.name = "";
    this.image = "";
    this.birthdate = "";
    this.country = "";
    this.tel = "";
    this.email = "";
    this.username = "";
    this.password = "";
    this.confirmPassword = "";
  }
}
