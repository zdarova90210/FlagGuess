import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {ICountry} from '../../models/country';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  private readonly gameService = inject(GameService);

  form = new FormGroup({
    answer: new FormControl<string>('', { nonNullable: true }),
  });

  countries = signal<ICountry[]>([]);
  currentIndex = signal(0);
  score = signal(0);

  currentCountry = computed(() => this.countries()[this.currentIndex()] ?? null);
  isFinished = computed(() => this.currentIndex() >= this.countries().length);

  ngOnInit(): void {
    this.gameService.getCountries().subscribe(countries => {
      this.countries.set(countries);
      this.currentIndex.set(0);
    });
  }

  submitAnswer(): void {
    const country = this.currentCountry();
    if (!country) return;

    const answer = this.normalizeString(this.form.controls.answer.value);
    const isCorrect =
      country.namesRu.some(name => this.normalizeString(name) === answer) ||
      country.namesEn.some(name => this.normalizeString(name) === answer);

    if (isCorrect) {
      this.score.update(value => value + 1);
    }

    this.form.reset({ answer: '' });
    this.currentIndex.update(index => index + 1);
  }

  private normalizeString(value: string): string {
    return value.trim().toLowerCase();
  }
}
