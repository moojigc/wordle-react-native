import { StatusBar, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { TITLE } from '../constants/text';
import screenSize from '../state/Dimensions';

export default function NavBar() {
	return (
		<View
			style={{
				position: 'absolute',
				top: StatusBar.currentHeight,
				backgroundColor: Colors.white,
				width: screenSize.screen.width,
				height: screenSize.fontSize * 4,
				justifyContent: 'center'
			}}
		>
			<Text
				style={{
					fontSize: screenSize.fontSize,
					textAlign: 'center'
				}}
			>
				{TITLE}
			</Text>
		</View>
	);
}
