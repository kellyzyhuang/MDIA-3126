import { Text, View } from 'react-native';
import { Link } from 'expo-router'; 

export default function Page() {
  return (
    <View>
      <Text>Tehe World! 🐒</Text>
      <Link href="/contact">🦖 Contact</Link>
    </View>
  ) 
}