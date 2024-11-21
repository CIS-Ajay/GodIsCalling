import { TextFavPage } from './text-fav.page';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

describe('TextFavPage', () => {
  let component: TextFavPage;
  let fixture: ComponentFixture<TextFavPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextFavPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents(); 

    fixture = TestBed.createComponent(TextFavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

