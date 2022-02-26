import AsyncStorage from '@react-native-async-storage/async-storage';

class NonUniqueError extends Error {
	constructor(key: string) {
		super(`${key} already exists.`);
	}
	readonly name = 'NonUniqueError';
}
export default class PersistentStore {}
