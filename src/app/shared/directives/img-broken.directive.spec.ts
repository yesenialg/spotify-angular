import { Component, ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: '<img class="testing-directive" appImgBroken [src]="srcMock">'
}) class TestComponent {
  public srcMock: any = null
}

describe('ImgBrokenDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent> //Fixture ayuda a interactuar con los metodos de testing de los componentes HTML

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        ImgBrokenDirective
      ]
    })
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create an instance', () => {
    const mockElement = new ElementRef('');
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
  });

  it('should create an instance of TestComponent', () => {
    expect(component).toBeTruthy();
  });
  
  it('should change the image', (done: DoneFn) => {
    //Arrange
    const beforeImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement;
    const beforeImgSrc = beforeImgElement.src; //URL antes de cambiar por la diretiva
    
    //Act
    component.srcMock = undefined;
    setTimeout(() => {
      const afterImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement;
      const afterImgSrc = beforeImgElement.src; //URL antes de cambiar por la diretiva
    
      //Assert
      expect(afterImgSrc).toMatch('\assets/images\/');
      done()
    }, 3000)
  });
});
