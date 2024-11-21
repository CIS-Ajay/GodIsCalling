import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayDetailsPage } from './day-details.page';
import { IonicModule } from '@ionic/angular';

describe('DayDetailsPage', () => {
  let component: DayDetailsPage;
  let fixture: ComponentFixture<DayDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayDetailsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DayDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
