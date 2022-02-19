import React, { useState } from 'react';
import {
	NativeSyntheticEvent,
	TextInput,
	TextInputTextInputEventData,
	View
} from 'react-native';
import { GameConstants } from '../constants';
import { Letter } from '../state/Letter';

const colors = {
	[GameConstants.LETTER_STATUS.INCOMPLETE]: 'yellow',
	[GameConstants.LETTER_STATUS.WRONG]: 'red',
	[GameConstants.LETTER_STATUS.RIGHT]: 'green'
};

export default function Box({
	letter,
	styles,
	children
}: {
	letter: Letter;
	children?: React.ReactNode;
	styles: any;
}) {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: colors[letter.status],
				...(styles || {})
			}}
		>
			<TextInput
				maxLength={1}
				style={{
					fontSize: 20,
					// orderBottomColor: 'black',
					borderColor: 'black',
					borderStyle: 'solid',
					borderWidth: 2,
					textAlign: 'center',
					...(styles || {})
				}}
				value={letter.displayValue}
				returnKeyType='none'
				autoCapitalize='characters'
				onChangeText={(e) => {
					letter.update(e);
				}}
				onKeyPress={(e) => {
					console.log(e.nativeEvent.key.charCodeAt(0));
				}}
				ref={(e) => letter.setInputRef(e!)}
			>
				{children}
			</TextInput>
		</View>
	);
}
