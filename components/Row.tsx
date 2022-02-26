import type { Row } from '../state/Row';
import { StyleSheet, View } from 'react-native';

import LetterBox from './LetterBox';
import screenSize from '../state/Dimensions';

export default function GuessRow({
	styles,
	guess
}: {
	styles?: any;
	guess: Row;
}) {
	const localStyles = StyleSheet.create({
		row: {
			flexDirection: 'row',
			maxWidth: screenSize.dimensions.width
		}
	});
	return (
		<>
			<View
				style={{
					...localStyles.row,
					...(styles || {})
				}}
			>
				{guess.map((letter, i) => (
					<LetterBox key={i} letter={letter}></LetterBox>
				))}
			</View>
		</>
	);
}
