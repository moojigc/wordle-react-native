import { useEffect, useState } from 'react';
import {
	ColorValue,
	Dimensions,
	StyleSheet,
	StyleSheetProperties,
	Text,
	View
} from 'react-native';
import type { Row } from '../state/Row';
import Box from './Box';

const localStyles = StyleSheet.create({
	row: {
		flexDirection: 'row'
	}
});

export default function GuessRow({
	styles,
	guess
}: {
	styles?: any;
	guess: Row;
}) {
	return (
		<>
			<View
				style={{
					...localStyles.row,
					...(styles || {})
				}}
			>
				{guess.map((letter, i) => (
					<Box
						key={i}
						letter={letter}
						styles={{
							width: 50,
							height: 50
						}}
					></Box>
				))}
			</View>
		</>
	);
}
