import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppGlobalsService, TextServices } from 'src/services/services';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage  {

  contactForm!: FormGroup;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private translate:TranslateService,
    private myGlobals: AppGlobalsService,
    private textServicesBE: TextServices
  ) {}

  ngOnInit() {
    // this.translate.setDefaultLang('ar');
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  openHome() {
    this.navCtrl.navigateRoot('/home');
  }

  send() {
    if (this.contactForm.invalid) {
      this.myGlobals.showAlert('errors.validation', 'errors.title', 'errors.ok');
      return;
    }

    this.myGlobals.displayLoadingSpinner();
    const data = this.contactForm.value;

    this.textServicesBE.contactUs(data).then(
      () => {
        this.myGlobals.dismissLoadingSpinner();
        this.contactForm.reset();
        this.myGlobals.showAlert('contact-us.success', 'errors.success', 'errors.ok');
      },
      () => {
        this.myGlobals.showAlert('errors.general', 'errors.title', 'errors.ok');
        this.myGlobals.dismissLoadingSpinner();
      }
    );
  }

}
