import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
	ColorValue,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import Row from './components/GuessRow';
import { observer } from 'mobx-react';
import game, { type Game } from './state/Game';
import Result from './components/Result';

import Keyboard from './components/Keyboard/Keyboard';
import screenSize, { ScreenSize } from './state/Dimensions';
import { Colors } from './constants/Colors';
import NavBar from './components/Navbar';

const _App = ({ game, screenSize }: { game: Game; screenSize: ScreenSize }) => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Colors.gray,
			alignItems: 'center',
			justifyContent: 'center'
		},
		backgroundImage: {
			opacity: 0.5,
			flex: 1,
			justifyContent: 'center',
			zIndex: -1,
			height: screenSize.dimensions.width,
			width: screenSize.dimensions.height,
			position: 'absolute'
		},
		rowContainer: {
			position: 'absolute',
			top: -screenSize.fontSize * 16
		}
	});

	return (
		<View style={styles.container}>
			<NavBar />
			<View
				style={{
					marginTop: screenSize.dimensions.fontScale * 100,
					alignItems: 'center',
					flexDirection: 'column'
				}}
			>
				<View style={styles.rowContainer}>
					{game.isReady ? (
						game.rows.map((r, i) => (
							<Row
								key={i}
								row={r}
								styles={{
									width: screenSize.dimensions.width,
									justifyContent: 'center'
									// marginLeft: dimensions.window.fontScale * 100
								}}
							/>
						))
					) : (
						<Text>Game loading...</Text>
					)}
				</View>
			</View>

			<Image
				width={screenSize.dimensions.width}
				height={screenSize.dimensions.height}
				resizeMode='contain'
				style={styles.backgroundImage}
				source={require('./assets/images/cute_selfie.jpg')}
			/>
			<StatusBar style='auto' />
			<Result />
			<Keyboard />
		</View>
	);
};

const _AppWithState = observer(_App);

export default function App() {
	// Get the word of the day and start!!!
	game.start();
	return <_AppWithState game={game} screenSize={screenSize} />;
}
