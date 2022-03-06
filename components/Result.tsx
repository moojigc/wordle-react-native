import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { colors } from 'react-native-elements';
import { GameConstants } from '../constants/GameConstants';
import screenSize from '../state/Dimensions';
import game from '../state/Game';
import Reload from './Reload';

const _Result = () => {
	switch (game.status) {
		case GameConstants.GAME_STATUS.LOST:
			return (
				<>
					<Text style={{ color: 'red', fontSize: 50 }}>
						You lose!
					</Text>
					<Reload title='Try again?' />
				</>
			);
		case GameConstants.GAME_STATUS.WON:
			return (
				<>
					<Text style={{ color: 'green', fontSize: 50 }}>
						YOU WIN!!!
					</Text>
					<Reload title='Again?' />
				</>
			);
		default:
			return <></>;
	}
};

export default function Result() {
	if (game.status == GameConstants.GAME_STATUS.PROGRESS) {
		return <></>;
	}
	return (
		<View
			style={{
				position: 'absolute',
				zIndex: 2,
				backgroundColor: colors.white,
				paddingStart: 10,
				paddingEnd: 10,
				paddingTop: 5,
				paddingBottom: 5,
				borderRadius: 10,
				shadowColor: colors.black,
				shadowRadius: 1,
				top: screenSize.fontSize * 25
			}}
		>
			<_Result />
		</View>
	);
}
