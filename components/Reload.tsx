import { Button } from 'react-native-elements';
import game, { Game } from '../state/Game';

export default function TryAgain(props: { title: string }) {
	return (
		<Button
			title={props.title}
			onPress={() => {
				game.reload();
			}}
		></Button>
	);
}
