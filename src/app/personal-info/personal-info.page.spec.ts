import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalInfoPage } from './personal-info.page';
import { IonicModule } from '@ionic/angular';

describe('PersonalInfoPage', () => {
  let component: PersonalInfoPage;
  let fixture: ComponentFixture<PersonalInfoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalInfoPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

