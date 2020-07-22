import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import Fire from '../Firebase/Fire';



export default class LoadingScreen extends React.Component{

    componentDidMount() {
        if (Fire.shared.uid) {
            this.props.navigation.navigate("App");
        } else {
            firebase.auth().onAuthStateChanged(user => {
                this.props.navigation.navigate(user ? "App" : "Auth");
            });
        }
    }

    render() {
        return(
            <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                <Text>Loading ..</Text>
                <ActivityIndicator size="large" color="#e31414" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center"
      },
});

