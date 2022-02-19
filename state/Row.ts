import type { Game } from './Game';

import { GameConstants } from '../constants';
import { Letter } from './Letter';
import { Utils } from './utils';
import { action, computed, makeAutoObservable } from 'mobx';

export class Row {
	static readonly MAX_LEN = 6;

	constructor(public game: Game, public index: number) {
		makeAutoObservable(this);
	}

	get isFirst() {
		return this.index === 0;
	}

	letters = Utils.padEmptyStrings(Row.MAX_LEN)
		.split('')
		.map((c, i) => new Letter(c, i, this));

	/**
	 * needed to determine if row is complete
	 */
	@computed
	get allPositionsGuessed() {
		return !this.letters.find(
			({ value }) => value === GameConstants.FILLER_VALUE
		);
	}

	map<T>(callback: (letter: Letter, index: number) => T): T[] {
		return this.letters.map((letter, index) => {
			return callback(letter, index);
		});
	}

	@action
	update() {
		if (this.game.WORD_OF_THE_DAY === this.string) {
			this.game.setStatus(GameConstants.GAME_STATUS.WON);
		} else if (this.allPositionsGuessed) {
			if (this.game.maxGuessesReached) {
				this.game.setStatus(GameConstants.GAME_STATUS.LOST);
			} else {
				this.game.rows = [
					...this.game.rows,
					new Row(this.game, this.index + 1)
				];
			}
		}
		this.game.refresh();
		return this;
	}

	@computed
	get string() {
		return this.letters.map((l) => l.displayValue).join('');
	}
}
