export namespace GameConstants {
	export const enum GAME_STATUS {
		PROGRESS = 'IN_PROGRESS',
		WON = 'WON',
		LOST = 'LOST'
	}

	export const enum LETTER_STATUS {
		HALF_RIGHT = 0.5,
		RIGHT = 1,
		WRONG = 0,
		INCOMPLETE = -1
	}

	export const FILLER_VALUE = ' ';
	export const WORD_LENGTH = 5 as const;
	export const JAN_1_2022 = 18993;
	Object.freeze(WORD_LENGTH);
	Object.freeze(FILLER_VALUE);

	export const enum SPECIAL_KEYS {
		BACKSPACE = 'Backspace',
		ENTER = 'Enter'
	}
}
