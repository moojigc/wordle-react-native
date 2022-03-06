import { Dimensions, StyleSheet, Vibration, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { KeyState } from '../../state/Key';
import KeyComponent from './KeyComponent';

const dimensions = Dimensions.get('window');
const styles = StyleSheet.create({
	flex: {
		// flexGrow: ,
		height: dimensions.width / 6.5,
		width: dimensions.width,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		position: 'absolute',
		bottom: 10,
		width: dimensions.width
	}
});

export default function Keyboard() {
	const keyWidth = dimensions.width / (KeyState.TOP_ROW.length + 1);
	const keyHeight = keyWidth * 1.5;
	const enterAndBackSpaceWidth =
		dimensions.width - keyWidth * (KeyState.TOP_ROW.length - 0.5);

	let vibration = false;
	const vibrate = (pattern: number) => {
		if (!vibration) {
			vibration = true;
			Vibration.vibrate(pattern);
			vibration = false;
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.flex}>
				{KeyState.TOP_ROW.map((r) => (
					<KeyComponent
						style={{
							width: keyWidth,
							height: keyHeight
						}}
						vibrate={vibrate}
						keyState={r}
						key={r.value}
						disabled={r.disabled}
					/>
				))}
			</View>
			<View style={styles.flex}>
				{KeyState.MIDDLE_ROW.map((r) => (
					<KeyComponent
						style={{
							width: keyWidth,
							height: keyHeight
						}}
						keyState={r}
						vibrate={vibrate}
						key={r.value}
						disabled={r.disabled}
					/>
				))}
			</View>
			<View style={styles.flex}>
				<KeyComponent
					style={{
						// @ts-ignore
						fontSize: 18,
						width: enterAndBackSpaceWidth,
						height: keyHeight,
						paddingLeft: 1,
						paddingRight: 1
					}}
					keyState={KeyState.ENTER}
					vibrate={vibrate}
					disabled={KeyState.ENTER.disabled}
				/>
				{KeyState.BOTTOM_ROW.map((r) => (
					<KeyComponent
						style={{
							width: keyWidth,
							height: keyHeight
						}}
						vibrate={vibrate}
						keyState={r}
						key={r.value}
						disabled={r.disabled}
					/>
				))}
				<KeyComponent
					style={{
						width: enterAndBackSpaceWidth,
						height: keyHeight
					}}
					disabled={false}
					vibrate={vibrate}
					icon={
						<Icon
							name='backspace'
							type='ionicon'
							color={KeyState.BACKSPACE.color}
							style={{
								// paddingRight: enterAndBackSpaceWidth / 4,
								// paddingLeft: enterAndBackSpaceWidth / 4,
								alignSelf: 'center',
								textAlign: 'center'
							}}
						/>
					}
					keyState={KeyState.BACKSPACE}
				/>
			</View>
		</View>
	);
}
