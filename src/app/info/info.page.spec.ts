import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoPage } from './info.page';
import { IonicModule } from '@ionic/angular';

describe('InfoPage', () => {
  let component: InfoPage;
  let fixture: ComponentFixture<InfoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
