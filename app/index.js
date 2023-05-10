import { SafeAreaView } from "react-native";
import FileReading from "./FileReading";
import { Stack,useRouter } from "expo-router";
const Home = ()=>{
    return(
        <SafeAreaView>
            <Stack.Screen
            options={{
                headerStyle:{backgroundColor:"#246EE0"},
                headerShadowVisible:false,
                headerTitle:"Human Activity Recognition"
            }
            }
            />
            <FileReading/>
        </SafeAreaView>
    )
}
export default Home;