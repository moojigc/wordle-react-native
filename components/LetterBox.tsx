import React, { useState } from 'react';
import {
	Dimensions,
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputTextInputEventData,
	TextStyle,
	View,
	Text,
	ViewStyle
} from 'react-native';
import { GameConstants } from '../constants/GameConstants';
import { Colors } from '../constants/Colors';
import screenSize from '../state/Dimensions';
import { Letter } from '../state/Letter';

const colorMap = {
	[GameConstants.LETTER_STATUS.INCOMPLETE]: Colors.white,
	[GameConstants.LETTER_STATUS.WRONG]: Colors.error,
	[GameConstants.LETTER_STATUS.RIGHT]: Colors.success,
	[GameConstants.LETTER_STATUS.HALF_RIGHT]: Colors.warning
};

const window = Dimensions.get('window');

export default function LetterBox({
	letter,
	children
}: {
	letter: Letter;
	children?: React.ReactNode;
}) {
	const localStyles = StyleSheet.create({
		box: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: letter.row.isFinalAnswer
				? colorMap[letter.status]
				: Colors.gray,
			opacity: 1,
			margin: 1,
			borderColor: '#3a3a3c',
			height: window.width / 6,
			width: window.width / 6,
			borderStyle: 'solid',
			borderWidth: 4,
			borderBottomColor: Colors.white,
			borderTopColor: Colors.white,
			borderLeftColor: Colors.white,
			borderRightColor: Colors.white,
			borderStartColor: Colors.white,
			borderEndColor: Colors.white,
			borderRadius: 1,
			shadowColor: Colors.white,
			shadowOffset: { width: 10, height: 0 },
			shadowRadius: 100,
			shadowOpacity: 0.1
		},
		text: {
			fontSize: screenSize.dimensions.fontScale * 40,
			color: Colors.white,
			textAlign: 'center',
			fontWeight: 'bold'
		}
	});
	return (
		<View style={localStyles.box}>
			<Text style={localStyles.text} ref={(e) => letter.setInputRef(e!)}>
				{letter.value}
			</Text>
		</View>
	);
}
