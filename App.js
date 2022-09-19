/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "./providers/AuthProvider";
import { TasksProvider } from "./providers/TasksProvider";

import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { WelcomeView } from "./views/WelcomeView";

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debugs">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

    return(
      // <WithSplashScreen isAppReady={isAppReady}>
          <AuthProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Welcome View"
                  component={WelcomeView}
                  options={{ 
                    title: "WEAR TECH" ,
                    headerTitleStyle:{
                      alignSelf: 'center',
                      fontWeight:'bold',
                  },
                  }}
                />
                <Stack.Screen
                  name="Projects"
                  component={ProjectsView}
                  // title="ProjectsView"
                  headerBackTitle="log out"
                  options={{
                    title: "Welcome to Wear-Tech",
                    headerRight: function Header() {
                      return <Logout />;
                    },
                    headerLeft: ()=> null,
                    headerTitleStyle:{
                      alignSelf: 'center',
                      fontWeight:'bold',
                  },
                    headerBackVisible:true
                  }}
                />
                <Stack.Screen name="Task List">
                  {(props) => {
                    const { navigation, route } = props;
                    const { user, projectPartition } = route.params;
                    return (
                      <TasksProvider user={user} projectPartition={projectPartition}>
                        <TasksView navigation={navigation} route={route} />
                      </TasksProvider>
                    );
                  }}
                </Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        // </WithSplashScreen>
      );
  }

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
