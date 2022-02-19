import { action, computed, makeAutoObservable } from 'mobx';
import { GameConstants } from '../constants';
import { Row } from './Row';
import { Utils } from './utils';

export class Game {
	static readonly MAX_GUESSES_ALLOWED = 5;

	static async getWordOfTheDay() {
		this.instance.start('WORDLE');
	}
	static instance = new this();
	private constructor() {
		makeAutoObservable(this);
	}

	WORD_OF_THE_DAY: string = Utils.padEmptyStrings(Row.MAX_LEN);
	status: GameConstants.GAME_STATUS = GameConstants.GAME_STATUS.PROGRESS;
	rows = [new Row(this, 0)];

	@action
	start(WORD_OF_THE_DAY: string) {
		if (this.WORD_OF_THE_DAY !== WORD_OF_THE_DAY) {
			this.WORD_OF_THE_DAY = WORD_OF_THE_DAY;
		}
	}

	@action
	setStatus(status: GameConstants.GAME_STATUS) {
		this.status = status;
	}

	@action
	refresh() {
		this.rows = [...this.rows];
	}

	@computed
	get maxGuessesReached() {
		return this.rows.length === Game.MAX_GUESSES_ALLOWED;
	}
}

const game = Game.instance;
export default game;
