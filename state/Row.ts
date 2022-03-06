import type { Game } from './Game';

import { GameConstants } from '../constants/GameConstants';
import { Letter } from './Letter';
import { Utils } from './utils';
import { action, computed, makeAutoObservable, observable } from 'mobx';

export interface RowSerialized {
	isFinalAnswer: boolean;
	letters: string[];
	currentLetterIndex: number;
}

export class Row {
	static readonly MAX_LEN = GameConstants.WORD_LENGTH;

	constructor(
		public game: Game,
		public index: number,
		stored?: RowSerialized
	) {
		makeAutoObservable(this);
		if (stored) {
			for (let i = 0; i < stored.letters.length; i++) {
				if (stored.letters[i]) {
					this.letters[i] = new Letter(stored.letters[i], i, this);
				}
			}
			this.currentLetter = this.letters[stored.currentLetterIndex];
			this.isFinalAnswer = stored.isFinalAnswer;
		}
	}

	get serialized(): RowSerialized {
		return {
			isFinalAnswer: this.isFinalAnswer,
			currentLetterIndex: this.currentLetter.index,
			letters: this.letters.map((l) => l.value)
		};
	}

	get isFirst() {
		return this.index === 0;
	}

	@computed
	get opacity(): 0.95 | 0.5 {
		return this.game.activeRow === this || this.isFinalAnswer ? 0.95 : 0.5;
	}

	isFinalAnswer = false;

	@action
	setIsFinalAnswer(bool: boolean) {
		this.isFinalAnswer = bool;
		if (this.game.WORD_OF_THE_DAY === this.string) {
			this.game.setWon();
		} else if (this.allPositionsGuessed && this.game.maxGuessesReached) {
			this.game.setLost();
		} else if (this.game.rows[this.index + 1]) {
			this.letters.forEach((l) => {
				this.game.usedLetterMap.set(l.value, l.status);
				this.game.usedLetterMap = new Map([
					...this.game.usedLetterMap.entries()
				]);
			});
		}
		this.game.store.save(this.game.rows.map((r) => r.serialized));
		this.game.refresh();
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

	@computed
	get string() {
		return this.letters.map((l) => l.value).join('');
	}
}
