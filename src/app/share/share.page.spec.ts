import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharePage } from './share.page';
import { IonicModule } from '@ionic/angular';

describe('SharePage', () => {
  let component: SharePage;
  let fixture: ComponentFixture<SharePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

