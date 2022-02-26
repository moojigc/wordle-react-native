import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { GameConstants } from '../constants';
import game from '../state/Game';

const _Result = ({ style }: { style: TextStyle }) => {
	switch (game.status) {
		case GameConstants.GAME_STATUS.PROGRESS:
			return <></>;
		case GameConstants.GAME_STATUS.LOST:
			return (
				<Text style={{ color: 'red', fontSize: 50, ...style }}>
					YOU LOSE! Try again next time!
				</Text>
			);
		case GameConstants.GAME_STATUS.WON:
			return (
				<Text style={{ color: 'green', fontSize: 50, ...style }}>
					YOU WIN!!!
				</Text>
			);
	}
};

export default function Result(props: Parameters<typeof _Result>[0]) {
	return (
		<View>
			<_Result {...props} />
		</View>
	);
}
