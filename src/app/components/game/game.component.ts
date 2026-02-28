import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {Observable} from 'rxjs';
import {ICountry} from '../../models/country';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  private gameService = inject(GameService);
  countries$: Observable<ICountry[]> = this.gameService.getCountries();
  form: FormGroup = new FormGroup({
    answer: new FormControl<string>('', {nonNullable: true})
  });

  ngOnInit(): void {
    this.countries$.subscribe(countries => {
      console.log('Countries loaded:', countries);
    });
  }
}
