import AsyncStorage from '@react-native-async-storage/async-storage';

export default class PersistentStore<T = any> {
	constructor(public key: string) {}
	async read() {
		const item = await AsyncStorage.getItem(this.key);
		if (item) {
			return this._deserialize(item) as T;
		} else {
			return null;
		}
	}

	async save(value: T) {
		await AsyncStorage.setItem(this.key, this._serialize(value));
		return value;
	}

	private _serialize(obj: any) {
		return JSON.stringify(obj);
	}

	private _deserialize(value: string) {
		return JSON.parse(value);
	}
}
