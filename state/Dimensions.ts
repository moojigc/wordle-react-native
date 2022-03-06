import { action, computed, observable } from 'mobx';
import { Dimensions, ScaledSize, StatusBar } from 'react-native';

export class ScreenSize {
	static instance = new this();
	private constructor() {
		this.dimensions = Dimensions.get('window');
		this.screen = Dimensions.get('screen');
		Dimensions.addEventListener('change', ({ window, screen }) => {
			this.setDimensions(window, screen);
		});
	}

	@action
	setDimensions(window: ScaledSize, screen: ScaledSize) {
		this.dimensions = window;
		this.screen = screen;
	}

	@observable
	screen: ScaledSize;

	@observable
	dimensions: ScaledSize;

	@computed
	get fontSize() {
		return this.screen.fontScale * 20;
	}
}

const screenSize = ScreenSize.instance;
export default screenSize;
