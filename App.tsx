import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
	ColorValue,
	Dimensions,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import Row from './components/Row';
import { observer } from 'mobx-react';
import game, { type Game } from './state/Game';
import Result from './components/Result';

import { TITLE } from './constants/text';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	backgroundImage: {
		opacity: 0.5,
		flex: 1,
		justifyContent: 'center',
		zIndex: 0
	}
});

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const _App = ({ game }: { game: Game }) => {
	const [dimensions, setDimensions] = useState({ window, screen });
	game.start('WORDLE');
	useEffect(() => {
		Dimensions.addEventListener('change', ({ window, screen }) => {
			setDimensions({ window, screen });
		});
	}, []);
	return (
		<View style={styles.container}>
			<View
				style={{
					marginTop: dimensions.window.fontScale * 100,
					alignItems: 'center',
					flexDirection: 'column'
				}}
			>
				<Text>{TITLE}</Text>
				{game.rows.map((r, i) => (
					<Row
						key={i}
						guess={r}
						styles={{
							width: dimensions.screen.width,
							justifyContent: 'center'
							// marginLeft: dimensions.window.fontScale * 100
						}}
					/>
				))}
			</View>
			<Result />
			<Image
				width={dimensions.window.width}
				height={dimensions.window.height}
				resizeMode='contain'
				style={styles.backgroundImage}
				source={require('./assets/images/cute_selfie.jpg')}
			/>
			<StatusBar style='auto' />
		</View>
	);
};

const _AppWithState = observer(_App);

export default function App() {
	return <_AppWithState game={game} />;
}
