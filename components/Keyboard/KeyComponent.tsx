import { observer } from 'mobx-react-lite';
import { Dimensions, StyleSheet, Vibration, ViewProps } from 'react-native';
import { Button, ButtonProps, colors, Icon } from 'react-native-elements';
import { KeyState } from '../../state/Key';

const styles = StyleSheet.create({
	key: {
		backgroundColor: 'white',
		color: 'black',
		borderRadius: 3,
		margin: 1,
		fontSize: 20,
		borderColor: 'black',
		borderWidth: 1,
		borderStyle: 'solid',
		textAlign: 'center',
		textAlignVertical: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

type KeyComponentArgs = Omit<ButtonProps, 'onPress' | 'title'> & {
	style?: ViewProps['style'];
	keyState: KeyState;
	vibrate: (pattern: number) => void;
	disabled: boolean;
};

function _KeyComponent(props: KeyComponentArgs) {
	const { keyState: state, ...rest } = props;
	return (
		<Button
			{...rest}
			disabled={state.disabled}
			disabledStyle={{
				backgroundColor: state.backgroundColor
			}}
			title={props.icon ? '' : state.value}
			buttonStyle={{
				...styles.key,
				// @ts-ignore
				...(props.style || {}),
				backgroundColor: state.backgroundColor
			}}
			titleStyle={{
				// @ts-ignore
				fontSize: props.style?.fontSize || styles.key.fontSize,
				color: state.color
			}}
			onPress={() => {
				state.onPress();
			}}
			onPressIn={(e) => {
				state.reverseColors();
				props.vibrate(10);
			}}
			onPressOut={(e) => {
				state.reverseColors();
				props.vibrate(5);
			}}
		></Button>
	);
}

const StatefulKeyComponent = observer(_KeyComponent);

export default function KeyComponent(props: KeyComponentArgs) {
	return <StatefulKeyComponent {...props} />;
}
