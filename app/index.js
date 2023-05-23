import {useEffect,useCallback} from "react"
import { SafeAreaView ,Text} from "react-native";
import FileReading from "./FileReading";
import { Stack,useRouter } from "expo-router";
import { loadFonts } from "../expo-font";
import RecordData from './RecordData';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Home = ()=>{
        
  const [fontsLoaded,error] = useFonts({
    Poppins: require('./assets/fonts/poppinsmed.ttf'),
    PoppinsLg: require('./assets/fonts/PoppinsRegular.ttf')

  });

 
  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return a loading screen or component while fonts are being loaded
  }

    return(
        <SafeAreaView >
           <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#362FD9" },
          headerShadowVisible: false,
          headerTitle: () => (
            <Text
              style={{
                flex: 1,
                // textAlign: "center",
                fontFamily: 'Poppins',
                // justifyContent: 'center',
                fontSize: 25,
                color: "#ffff",
              }}
            >
              Human Activity Recognition
            </Text>
          ),
        }}
      />
      
            <FileReading/>
            {/* <RecordData/> */}
        </SafeAreaView>
    )
}
export default Home;