import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation, ImageBackground, ScrollView} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component{
    static navigationOptions = {
        headerShown: false
    }

    state = {
        email : "",
        password : "",
        errorMessage : null
    };

    handleLogin = () => {
        const {email, password} = this.state

        firebase.auth().signInWithEmailAndPassword(email,password).catch(
            error => this.setState({errorMessage : error.message})
        )
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        return(
            <View style={styles.in}>
            <ImageBackground source = {require('../images/loginback.jpg')} resizeMode={'stretch'} // or cover
                style={{flex: 1}} >
                <StatusBar barStyle="light-content"></StatusBar>
                <Image source={require("../images/logo.png")} style={{alignSelf:"center"}}></Image>
                <Text style={styles.greeting} >{'Hello.\n Welcome Back..!'}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style = {styles.form}>
                    <View>
                        <Text style={styles.inputTitle} >Email</Text>
                        <TextInput style={styles.input} autoCapitalize="none" 
                        onChangeText={email => this.setState({email})}
                        value={this.state.email} ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle} >Password</Text>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none" 
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin} >
                    <Text style={{color: "#FFF", fontWeight:"600",textTransform: "uppercase"}} a>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf:"center", marginTop: 32}} 
                onPress={()=>this.props.navigation.navigate("Register") } >
                    <Text style={{color: "#ff0000", fontSize: 14}}>
                        New to Wesharedo? <Text style={{color : "#ff5959", fontWeight:"600", fontWeight:"bold", fontSize: 15}}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    in : {
        flex:1,
    },
    greeting : {
        marginTop: 12,
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#f70000"
    },
    errorMessage : {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error : {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    form : {
        marginBottom: 48,
        marginHorizontal: 60
    },
    inputTitle : {
        color: "#ff5959",
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    input : {
        borderBottomColor: "#ff5959",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 16,
        fontWeight: "bold"
    },
    button : {
        marginHorizontal: 30,
        backgroundColor: "#ff5959",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
})
