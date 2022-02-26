import { action, computed, makeAutoObservable } from 'mobx';
import { GameConstants } from '../constants';
import { Row } from './Row';
import { Utils } from './utils';

export class Game {
	static readonly MAX_GUESSES_ALLOWED = 5;
	static readonly PLACEHOLDER = Utils.padEmptyStrings(Row.MAX_LEN);

	static instance = new this();
	private constructor() {
		makeAutoObservable(this);
	}

	WORD_OF_THE_DAY: string = Game.PLACEHOLDER;
	status: GameConstants.GAME_STATUS = GameConstants.GAME_STATUS.PROGRESS;
	rows = [new Row(this, 0)];

	get activeRow() {
		return this.rows[this.rows.length - 1];
	}

	async start() {
		setTimeout(() => {
			this.setWordOfTheDay('WORDLE');
		}, 1000);
		return this;
	}

	@action
	setWordOfTheDay(WORD_OF_THE_DAY: string) {
		if (this.WORD_OF_THE_DAY !== WORD_OF_THE_DAY) {
			this.WORD_OF_THE_DAY = WORD_OF_THE_DAY;
		}
		return this;
	}

	@action
	setWon() {
		this.status = GameConstants.GAME_STATUS.WON;
		return this;
	}

	@action
	setLost() {
		this.status = GameConstants.GAME_STATUS.LOST;
		return this;
	}

	@action
	refresh() {
		this.rows = [...this.rows];
		return this;
	}

	@computed
	get maxGuessesReached() {
		return this.rows.length === Game.MAX_GUESSES_ALLOWED;
	}

	@computed
	get isReady() {
		return this.WORD_OF_THE_DAY !== Game.PLACEHOLDER;
	}
}

const game = Game.instance;
export default game;
