import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Dimensions, StyleSheet, ViewProps } from 'react-native';
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

function _KeyComponent(
	props: Omit<ButtonProps, 'onPress' | 'title'> & {
		style?: ViewProps['style'];
		keyState: KeyState;
	}
) {
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
			onPress={(e) => {
				state.onPress();
			}}
			onPressIn={(e) => state.reverseColors()}
			onPressOut={(e) => state.reverseColors()}
		></Button>
	);
}

const StatefulKeyComponent = observer(_KeyComponent);

export default function KeyComponent(
	props: Omit<ButtonProps, 'onPress'> & {
		style?: ViewProps['style'];
		keyState: KeyState;
	}
) {
	return <StatefulKeyComponent {...props} />;
}
