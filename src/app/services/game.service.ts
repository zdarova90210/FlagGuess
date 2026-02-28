import {inject, Injectable} from '@angular/core';
import {ICountry} from '../models/country';
import {HttpClient} from '@angular/common/http';
import {map, Observable, shareReplay} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly httpClient = inject(HttpClient);

  private readonly countriesByDifficulty$: Observable<Record<number, ICountry[]>> = this.httpClient.get<ICountry[]>('assets/data/countries.json')
    .pipe(
      map(countries => countries
        .reduce((acc, country) => {
          acc[country.difficulty] ??= [];
          acc[country.difficulty].push(country);
          return acc;
        }, {} as Record<number, ICountry[]>)
      ),
      shareReplay(1)
    );

  getCountries(count: number = 10, difficulty: 1 | 2 | 3 | 4 | 5 = 1): Observable<ICountry[]> {
    return this.countriesByDifficulty$.pipe(
      map(countries => [...(countries[difficulty] ?? [])]
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
      )
    )
  }
}
