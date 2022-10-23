import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import styles from './styles';
import 'expo-dev-menu';

export default function App() {
	const [welcome, setWelcome] = useState('');
	console.log(welcome);

	const getAllItems = () =>
		fetch('http://localhost:4000/welcome', {
			credentials: 'include',
		})
			.then((res) => res.text())
			.catch((error) => console.log('error', error));

	useEffect(() => {
		let canceled = false;
		getAllItems().then((data) => {
			if (canceled || !data) {
				return;
			}
			setWelcome(data);
		});
		return () => {
			canceled = true;
		};
	}, []);

	return (
		<View style={styles.container}>
			<Text>{welcome}!</Text>

			<StatusBar style="auto" />
		</View>
	);
}
