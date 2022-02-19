import { Text, View } from 'react-native';
import { GameConstants } from '../constants';
import game from '../state/Game';

const _Result = () => {
	switch (game.status) {
		case GameConstants.GAME_STATUS.PROGRESS:
			return <></>;
		case GameConstants.GAME_STATUS.LOST:
			return (
				<Text style={{ color: 'red', fontSize: 50 }}>
					YOU LOSE! Try again next time!
				</Text>
			);
		case GameConstants.GAME_STATUS.WON:
			return (
				<Text style={{ color: 'green', fontSize: 50 }}>YOU WIN!!!</Text>
			);
	}
};

export default function Result() {
	return (
		<View>
			<_Result />
		</View>
	);
}
