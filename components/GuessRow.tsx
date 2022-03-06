import type { Row } from '../state/Row';
import { StyleSheet, View } from 'react-native';

import LetterBox from './LetterBox';
import screenSize from '../state/Dimensions';

export default function GuessRow({ styles, row }: { styles?: any; row: Row }) {
	const localStyles = StyleSheet.create({
		row: {
			flexDirection: 'row',
			maxWidth: screenSize.dimensions.width,
			paddingStart: 10,
			paddingEnd: 10,
			opacity: row.opacity
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
				{row.map((letter, i) => (
					<LetterBox key={i} letter={letter}></LetterBox>
				))}
			</View>
		</>
	);
}
