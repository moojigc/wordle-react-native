import { action, computed, makeAutoObservable, observable } from 'mobx';
import { GameConstants } from '../constants/GameConstants';
import { Row, RowSerialized } from './Row';
import { Utils } from './utils';
import english_words_5 from '../temp/english_words_5.json';
import PersistentStore from './PersistentStorage';

export class Game {
	static readonly MAX_GUESSES_ALLOWED = 5;
	static readonly PLACEHOLDER = Utils.padEmptyStrings(Row.MAX_LEN);
	static instance = new this();
	static async getWordOfTheDay() {
		const today = Date.now() / 1000 / 60 / 60 / 24;
		const index = Math.floor(today - GameConstants.JAN_1_2022);
		return new Promise<string>((resolve) => {
			setTimeout(() => {
				resolve(english_words_5[index].toUpperCase());
			}, 500);
		});
	}

	private constructor() {
		makeAutoObservable(this);
		this.usedLetterMap = new Map();
	}
	private _getNewRows() {
		return [0, 1, 2, 3, 4].map((r) => new Row(this, r));
	}

	WORD_OF_THE_DAY: string = Game.PLACEHOLDER;
	status: GameConstants.GAME_STATUS = GameConstants.GAME_STATUS.PROGRESS;
	rows = this._getNewRows();
	store = new PersistentStore<RowSerialized[]>('puzzled-store');

	@computed
	get activeRow(): Row {
		return this.rows.find((r) => !r.isFinalAnswer) || this.rows[4];
	}

	@action
	async start() {
		this.setWordOfTheDay(await Game.getWordOfTheDay());
		const existingRows = await this.store.read();
		if (existingRows) {
			for (let i = 0; i < existingRows.length; i++) {
				const guess = existingRows[i];
				this._setRow(new Row(this, i, guess));
			}
		}
		return this;
	}

	@action
	reload() {
		this.status = GameConstants.GAME_STATUS.PROGRESS;
		this.usedLetterMap = new Map();
		this.rows = this._getNewRows();
	}

	@action
	private _setRow(row: Row) {
		this.rows[row.index] = row;
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
		this;
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
		return (
			this.rows.filter((r) => r.isFinalAnswer).length ===
			Game.MAX_GUESSES_ALLOWED
		);
	}

	@computed
	get isReady() {
		return this.WORD_OF_THE_DAY !== Game.PLACEHOLDER;
	}

	@observable
	usedLetterMap: Map<string, GameConstants.LETTER_STATUS>;
}

const game = Game.instance;
export default game;
