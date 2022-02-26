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
import Row from './components/Row';
import { observer } from 'mobx-react';
import game, { type Game } from './state/Game';
import Result from './components/Result';

import { TITLE } from './constants/text';
import Keyboard from './components/Keyboard/Keyboard';
import { GameConstants } from './constants';
import screenSize, { ScreenSize } from './state/Dimensions';

const _App = ({ game, screenSize }: { game: Game; screenSize: ScreenSize }) => {
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
			zIndex: -1,
			height: screenSize.dimensions.width,
			width: screenSize.dimensions.height,
			position: 'absolute'
		}
	});

	// Get the word of the day and start!!!
	game.start();

	return (
		<View style={styles.container}>
			<View
				style={{
					marginTop: screenSize.dimensions.fontScale * 100,
					alignItems: 'center',
					flexDirection: 'column'
				}}
			>
				<Text
					style={{
						position: 'absolute',
						top: -screenSize.dimensions.height / 3
					}}
				>
					{TITLE}
				</Text>

				{game.isReady ? (
					game.rows.map((r, i) => (
						<Row
							key={i}
							guess={r}
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

			<Image
				width={screenSize.dimensions.width}
				height={screenSize.dimensions.height}
				resizeMode='contain'
				style={styles.backgroundImage}
				source={require('./assets/images/cute_selfie.jpg')}
			/>
			<StatusBar style='auto' />
			{game.status === GameConstants.GAME_STATUS.PROGRESS ? (
				<Keyboard />
			) : (
				<Result
					style={{
						top: screenSize.dimensions.height * 0.25
					}}
				/>
			)}
		</View>
	);
};

const _AppWithState = observer(_App);

export default function App() {
	return <_AppWithState game={game} screenSize={screenSize} />;
}
