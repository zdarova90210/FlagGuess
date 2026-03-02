import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {Observable} from 'rxjs';
import {ICountry} from '../../models/country';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
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





// import {Component, computed, inject, OnInit, signal} from '@angular/core';
// import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
// import {take} from 'rxjs';
// import {GameService} from '../../services/game.service';
// import {ICountry} from '../../models/country';
//
// @Component({
//   selector: 'app-game',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './game.component.html',
//   styleUrl: './game.component.scss',
// })
// export class GameComponent implements OnInit {
//   private readonly gameService = inject(GameService);
//
//   form = new FormGroup({
//     answer: new FormControl<string>('', { nonNullable: true }),
//   });
//
//   countries = signal<ICountry[]>([]);
//   currentIndex = signal(0);
//   score = signal(0);
//
//   currentCountry = computed(() => this.countries()[this.currentIndex()] ?? null);
//   isFinished = computed(() => this.currentIndex() >= this.countries().length);
//
//   ngOnInit(): void {
//     this.gameService.getCountries().pipe(take(1)).subscribe(countries => {
//       this.countries.set(countries);
//       this.currentIndex.set(0);
//     });
//   }
//
//   submitAnswer(): void {
//     const country = this.currentCountry();
//     if (!country) return;
//
//     const answer = this.normalize(this.form.controls.answer.value);
//     const isCorrect =
//       country.namesRu.some(name => this.normalize(name) === answer) ||
//       country.namesEn.some(name => this.normalize(name) === answer);
//
//     if (isCorrect) {
//       this.score.update(value => value + 1);
//     }
//
//     this.form.reset({ answer: '' });
//     this.currentIndex.update(index => index + 1);
//   }
//
//   private normalize(value: string): string {
//     return value.trim().toLowerCase();
//   }
// }


// @if (!isFinished() && currentCountry(); as country) {
//   <img [src]="country.flagSvgPath" [alt]="country.namesRu[0]">
//
//   <form [formGroup]="form" (ngSubmit)="submitAnswer()">
//   <input class="answer" type="text" formControlName="answer">
//   <button type="submit">Проверить</button>
//     </form>
//
//     <p>{{ currentIndex() + 1 }} / {{ countries().length }}</p>
// } @else {
//   <p>Игра окончена. Счёт: {{ score() }}</p>
// }
