import {useEffect} from "react"
import { SafeAreaView ,Text} from "react-native";
import FileReading from "./FileReading";
import { Stack,useRouter } from "expo-router";
import { loadFonts } from "../expo-font";

const Home = ()=>{

  // useEffect(() => {
  //   loadFonts();
  // }, []);

    return(
        <SafeAreaView>
           <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#362FD9" },
          headerShadowVisible: false,
          headerTitle: () => (
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: 20,
                color: "#ffff",
              }}
            >
              Human Activity Recognition
            </Text>
          ),
        }}
      />
            <FileReading/>
        </SafeAreaView>
    )
}
export default Home;