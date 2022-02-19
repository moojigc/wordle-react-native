import { GameConstants } from '../constants';

export namespace Utils {
	export function padEmptyStrings(length = 6) {
		return ''.padEnd(length, GameConstants.FILLER_VALUE);
	}
}
