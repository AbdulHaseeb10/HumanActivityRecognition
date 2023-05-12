import { SafeAreaView ,Text} from "react-native";
import FileReading from "./FileReading";
import { Stack,useRouter } from "expo-router";
const Home = ()=>{
    return(
        <SafeAreaView>
           <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#DEFCF9" },
          headerShadowVisible: false,
          headerTitle: () => (
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: 20,
                color: "#362FD9",
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