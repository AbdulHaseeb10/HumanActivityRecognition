import { View,Text,SafeAreaView } from "react-native";
import MainActivity from "./MainActivity";
import { Stack,useRouter } from "expo-router";
const Home = ()=>{
    return(
        <SafeAreaView>
            <Stack.Screen
            options={{
                headerStyle:{backgroundColor:"grey"},
                headerShadowVisible:false,
                headerTitle:"HAR"
            }
            }
            />
            <MainActivity/>
        </SafeAreaView>
    )
}
export default Home;