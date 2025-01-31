
import { StatusBar,View } from 'react-native';
import "@/global.css";
import {GluestackUIProvider, Text, Center} from '@gluestack-ui/themed'
import {useFonts, Roboto_700Bold, Roboto_400Regular} from '@expo-google-fonts/roboto'
import {config} from './config/gluestack-ui.config'
import { Loading } from './src/componets/Loading';
import { Routes } from '@routes/index';
export default function App() {
  const [fontsLoader]=useFonts({Roboto_700Bold, Roboto_400Regular})
  return (
    <GluestackUIProvider config={config}>
    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
    {fontsLoader? <Routes/>: <Loading/>}
  </GluestackUIProvider>
  );
}


