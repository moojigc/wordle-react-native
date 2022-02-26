import type { Row } from './Row';
import type { Text, View } from 'react-native';

import { action, computed, makeAutoObservable, observable } from 'mobx';
import { GameConstants } from '../constants';
import { Utils } from './utils';

export class Letter {
	constructor(value: string, public index: number, public row: Row) {
		this.value = value;
		this.isCurrent = this.row.currentLetter?.index === this.index;
		makeAutoObservable(this);
	}

	@action
	setIsCurrent(bool: boolean) {
		this.isCurrent = bool;
	}

	@observable
	isCurrent: boolean;

	private _value: string = '';
	set value(v: string) {
		if (v.length > 1) {
			throw new TypeError('Expected single character for Letter.value!');
		} else if (!/[aA-zZ]| /.test(v)) {
			throw new TypeError(
				`Letter.value must be alphabet character! Instead got ${v} (char code ${v.charCodeAt(
					0
				)})`
			);
		}
		this._value = v.toUpperCase();
	}
	get value() {
		return this._value === GameConstants.FILLER_VALUE ? '' : this._value;
	}

	inputRef: Text | null = null;
	// only called on game load or when a new row is created
	setInputRef(e: Text | null) {
		if (this.inputRef) {
			return;
		}
		this.inputRef = e;
		if (this.isFirst && !this.row.isFirst) {
			this.inputRef?.focus();
		}
	}

	valueOf() {
		return this.value;
	}

	[Symbol.toPrimitive](hint: string) {
		switch (hint) {
			case 'number':
				return this.value.charCodeAt(0);
			case 'boolean':
				return !!this.value;
			default:
				return this.value;
		}
	}

	next() {
		return this.isLast ? null : this.row.letters[this.index + 1];
	}
	previous() {
		return this.isFirst ? null : this.row.letters[this.index - 1];
	}

	get isFirst() {
		return this.index === 0;
	}
	get isLast() {
		return this.index === this.row.letters.length - 1;
	}

	get debugID() {
		return `Letter[${this.index}]`;
	}

	@action
	// @Utils.debug()
	update(newLetter: string) {
		switch (newLetter) {
			case GameConstants.SPECIAL_KEYS.BACKSPACE:
				if (this.isEmpty) {
					this.previous()?.update(newLetter);
				} else {
					this.value = GameConstants.FILLER_VALUE;
					this.row.update();
					this.moveToPreviousInputRef();
				}
				break;
			case GameConstants.SPECIAL_KEYS.ENTER:
				this.moveToNextInputRefIfNotEmpty();
				if (this.isLast) {
					this.row.setIsFinalAnswer(true);
				}
				break;
			case this.value:
				break;
			default:
				this.value = newLetter;
				this.row.update();
				this.moveToNextInputRefIfNotEmpty();
				break;
		}
		return this;
	}

	moveToPreviousInputRef() {
		const previous = this.previous();
		if (!previous) {
			return;
		}
		this.row.setCurrentLetter(previous);
		previous.inputRef?.focus();
		return previous;
	}

	moveToNextInputRef() {
		const next = this.next();
		if (!next) {
			return;
		}
		this.row.setCurrentLetter(next);
		next.inputRef?.focus();
		return next;
	}

	moveToNextInputRefIfNotEmpty() {
		if (this.isEmpty) {
			return;
		}
		return this.moveToNextInputRef();
	}

	@computed
	get matches() {
		const correctLetter = this.row.game.WORD_OF_THE_DAY.charAt(
			this.index
		).toUpperCase();
		return this.value === correctLetter;
	}

	@computed
	get kindOfMatches() {
		return this.row.game.WORD_OF_THE_DAY.includes(this.value);
	}

	get charCode() {
		return this.value.charCodeAt(0);
	}

	@computed
	get isEmpty() {
		return !this.value;
	}

	@computed
	get status() {
		if (this.isEmpty) {
			return GameConstants.LETTER_STATUS.INCOMPLETE;
		} else if (this.matches) {
			return GameConstants.LETTER_STATUS.RIGHT;
		} else if (this.kindOfMatches) {
			return GameConstants.LETTER_STATUS.HALF_RIGHT;
		} else {
			return GameConstants.LETTER_STATUS.WRONG;
		}
	}
}
