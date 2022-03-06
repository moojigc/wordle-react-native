import { action, computed, makeAutoObservable, observable } from 'mobx';
import { colors } from 'react-native-elements';
import { GameConstants } from '../constants/GameConstants';
import game from './Game';

export class KeyState {
	static TOP_ROW = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(
		(l) => new this(l)
	);
	static MIDDLE_ROW = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(
		(l) => new this(l)
	);
	static BOTTOM_ROW = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(
		(l) => new this(l)
	);
	static ENTER = new this(
		GameConstants.SPECIAL_KEYS.ENTER,
		(key) => !key.game.activeRow.allPositionsGuessed
	);
	static BACKSPACE = new this(GameConstants.SPECIAL_KEYS.BACKSPACE);

	constructor(
		public readonly value: string | GameConstants.SPECIAL_KEYS,
		private _getDisabled?: (key: KeyState) => boolean
	) {
		makeAutoObservable(this);
	}

	game = game;

	get backgroundColor() {
		return this.disabled ? colors.grey0 : this._backgroundColor;
	}
	private _backgroundColor = colors.black;

	get color() {
		return this.disabled ? colors.grey5 : this._color;
	}
	private _color = colors.white;

	reverseColors() {
		const [color, bgColor] = [this._backgroundColor, this._color];
		this._color = color;
		this._backgroundColor = bgColor;
		return this;
	}

	onPress() {
		this.game.activeRow.currentLetter.update(this.value);
	}

	@computed
	get disabled() {
		if (this._getDisabled) {
			return this._getDisabled(this);
		} else {
			return (
				this.game.usedLetterMap.get(this.value) ===
				GameConstants.LETTER_STATUS.WRONG
			);
		}
	}
}
