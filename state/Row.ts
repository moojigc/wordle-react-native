import type { Game } from './Game';

import { GameConstants } from '../constants';
import { Letter } from './Letter';
import { Utils } from './utils';
import { action, computed, makeAutoObservable, observable } from 'mobx';

export class Row {
	static readonly MAX_LEN = 6;

	constructor(public game: Game, public index: number) {
		makeAutoObservable(this);
	}

	get isFirst() {
		return this.index === 0;
	}

	isFinalAnswer = false;

	@action
	setIsFinalAnswer(bool: boolean) {
		this.isFinalAnswer = bool;
		if (this.game.WORD_OF_THE_DAY === this.string) {
			this.game.setWon();
		} else if (this.allPositionsGuessed) {
			if (this.game.maxGuessesReached) {
				this.game.setLost();
			}
		} else {
			this.createNextRow();
		}
		return this;
	}

	letters = Utils.padEmptyStrings(Row.MAX_LEN)
		.split('')
		.map((c, i) => new Letter(c, i, this));

	@action
	setCurrentLetter(letter: Letter) {
		this.currentLetter = letter;
	}

	@observable
	currentLetter = this.letters[0];

	/**
	 * needed to determine if row is complete
	 */
	@computed
	get allPositionsGuessed() {
		return !this.letters.filter((l) => l.isEmpty).length;
	}

	map<T>(callback: (letter: Letter, index: number) => T): T[] {
		return this.letters.map((letter, index) => {
			return callback(letter, index);
		});
	}

	@action
	update() {
		this.letters = [...this.letters];
		this.game.refresh();
		return this;
	}

	@action
	createNextRow() {
		this.game.rows = [
			...this.game.rows,
			new Row(this.game, this.index + 1)
		];
	}

	@computed
	get string() {
		return this.letters.map((l) => l.value).join('');
	}
}
