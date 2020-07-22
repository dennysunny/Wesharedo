import React from 'react';
//import { AppRegistry } from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoadingScreen from './src/screens/LoadingScreen'
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import MessageScreen from './src/screens/MessageScreen'
import NotificationScreen from './src/screens/NotificationScreen'
import PostScreen from './src/screens/PostScreen'
import ProfileScreen from './src/screens/ProfileScreen';


import Icon from 'react-native-vector-icons/FontAwesome';

// var firebaseConfig = {
//   apiKey: "AIzaSyBaOGEiBPGdbOwtyeQG9-t9bqu6jQNAVII",
//   authDomain: "socialapp-87332.firebaseapp.com",
//   databaseURL: "https://socialapp-87332.firebaseio.com",
//   projectId: "socialapp-87332",
//   storageBucket: "socialapp-87332.appspot.com",
//   messagingSenderId: "794173392536",
//   appId: "1:794173392536:web:3fe8c9a2603bc184bbf2ed"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const AppContainer = createStackNavigator(
  {
    default : createBottomTabNavigator(
      {
        Home : {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="hashtag" size={24} color={tintColor} />
          }
        },
        Message : {
          screen: MessageScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="envelope" size={24} color={tintColor} />
          }
        },
        Post : {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="plus-circle" size={40} color="#e94444" style={{shadowColor: "#e94444", shadowOffset: {width: 0, height: 0, 
              shadowRadius: 10, shadowOpacity: 0.3}}}  />
          }
        },
        Notification : {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="bell" size={24} color={tintColor} />
          }
        },
        Profile : {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="user" size={24} color={tintColor} />
          }
        }
        },
      {
        defaultNavigationOptions: {
        tabBarOnPress: ({navigation, defaultHandler}) => {
          if(navigation.state.key == "Post"){
            navigation.navigate("postModal")
          }
          else{
            defaultHandler();
          }
        }
      },
      
        tabBarOptions: {
          activeTintColor: "#ff0000",
          inactiveTintColor: "#474747",
          showLabel: false
        }
      }
    ),
      postModal: {
        screen: PostScreen
      }
  },

  {
    mode: "modal",
    headerMode: "none",
    //initialRouteName: "postModal"
  }
  
);


const AuthStack = createStackNavigator({
  Login : LoginScreen,
  Register : RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading : LoadingScreen,
      App : AppContainer,
      Auth : AuthStack
    },
    {
      initialRouteName : "Loading"
    }
  )
);