import type { Row } from './Row';
import type { TextInput } from 'react-native';

import { action, computed, makeAutoObservable } from 'mobx';
import { GameConstants } from '../constants';

export class Letter {
	constructor(public value: string, public index: number, public row: Row) {
		makeAutoObservable(this);
	}
	inputRef: TextInput | null = null;
	// only called on game load
	setInputRef(e: TextInput | null) {
		if (this.inputRef) {
			return;
		}
		this.inputRef = e;
		if (this.isFirst) {
			this.inputRef?.focus();
		}
	}

	get isFirst() {
		return this.index === 0;
	}
	get isLast() {
		return this.index === this.row.letters.length - 1;
	}

	next() {
		return this.isLast ? null : this.row.letters[this.index + 1];
	}
	previous() {
		return this.isFirst ? null : this.row.letters[this.index - 1];
	}

	@action
	update(newLetter: string) {
		this.value = newLetter;
		this.row.update();
		this.next()?.inputRef?.focus();
	}

	matches() {
		const correctLetter = this.row.game.WORD_OF_THE_DAY.charAt(
			this.index
		).toUpperCase();
		return this.value.toUpperCase() === correctLetter;
	}

	@computed
	get isEmpty() {
		return this.value === GameConstants.FILLER_VALUE || this.value === '';
	}

	@computed
	get displayValue() {
		return this.isEmpty ? '' : this.value.toUpperCase();
	}

	@computed
	get status() {
		if (this.isEmpty) {
			return GameConstants.LETTER_STATUS.INCOMPLETE;
		} else if (this.matches()) {
			return GameConstants.LETTER_STATUS.RIGHT;
		} else {
			return GameConstants.LETTER_STATUS.WRONG;
		}
	}
}
