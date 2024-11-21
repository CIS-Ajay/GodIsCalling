import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactUsPage } from './contact-us.page';
import { IonicModule } from '@ionic/angular';


describe('ContactUsPage', () => {
  let component: ContactUsPage;
  let fixture: ComponentFixture<ContactUsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
