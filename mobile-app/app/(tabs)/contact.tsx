import { Text, View } from 'react-native';
import { Link } from 'expo-router'; 

export default function Page() {
  return (
    <View>
      <Text>Hehe World!</Text>
      <Link href="/about">🐳 About</Link>
    </View>
  ) 
}