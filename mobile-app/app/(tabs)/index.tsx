import { Text, View } from 'react-native';
import { Link } from 'expo-router'; 

export default function Unicorns() {
  return (
    <View>
      <Text>Haha World! 🐥</Text>
      <Link href="/contact">🦖 Contact</Link>
      <Link href="/about">🐳 About</Link>
    </View>
  ) 
}