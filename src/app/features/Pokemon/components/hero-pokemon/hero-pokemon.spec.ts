import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPokemon } from './hero-pokemon';

describe('HeroPokemon', () => {
  let component: HeroPokemon;
  let fixture: ComponentFixture<HeroPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroPokemon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
