import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-game',
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  form: FormGroup = new FormGroup({
    answer: new FormControl()
  });

  constructor(private gameService: GameService) {

  }

  ngOnInit(): void {
    // this.gameService.getFlags(5, 1);
  }
}
