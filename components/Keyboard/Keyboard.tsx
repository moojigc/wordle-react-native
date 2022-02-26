import type { Game } from '../../state/Game';
import { useState } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TextInputProps,
	View,
	ViewProps
} from 'react-native';
import {
	Icon,
	colors,
	Colors,
	Button,
	ButtonProps
} from 'react-native-elements';
import { IconNode } from 'react-native-elements/dist/icons/Icon';
import { GameConstants } from '../../constants';
import { KeyState } from '../../state/Key';
import KeyComponent from './KeyComponent';
import game from '../../state/Game';

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

	return (
		<View style={styles.container}>
			<View style={styles.flex}>
				{KeyState.TOP_ROW.map((r) => (
					<KeyComponent
						style={{
							width: keyWidth,
							height: keyHeight
						}}
						keyState={r}
						key={r.value}
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
						key={r.value}
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
					disabled={!game.activeRow.allPositionsGuessed}
					keyState={KeyState.ENTER}
				/>
				{KeyState.BOTTOM_ROW.map((r) => (
					<KeyComponent
						style={{
							width: keyWidth,
							height: keyHeight
						}}
						keyState={r}
						key={r.value}
					/>
				))}
				<KeyComponent
					style={{
						width: enterAndBackSpaceWidth,
						height: keyHeight
					}}
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
