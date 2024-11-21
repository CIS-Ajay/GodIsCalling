import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartDayPage } from './start-day.page';
import { IonicModule } from '@ionic/angular';

describe('StartDayPage', () => {
  let component: StartDayPage;
  let fixture: ComponentFixture<StartDayPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartDayPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

