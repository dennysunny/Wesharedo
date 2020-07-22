import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity,Image, TextInput, PermissionsAndroid, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome';

import Fire from '../Firebase/Fire';

const firebase = require("firebase");
require("firebase/firestore");

export default class PostScreen extends React.Component{
    state = {
        text: "",
        image: null
    };

    componentDidMount() {
        console.disableYellowBox = true;
        this.getPhotoPermission();
    }
//https://subscription.packtpub.com/book/application_development/9781786464750/2/ch02lvl1sec32/platform
//https://reactnative.dev/docs/permissionsandroid

    getPhotoPermission = async () => {
        // if (Platform.OS === 'android') {
        //     const granted = await PermissionsAndroid.request(PERMISSIONS.ANDROID.CAMERA);
        //     console.log("granteddd", granted)
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //         console.log("You can use the Camera")
        //     }
        //     else{
        //         alert("Wesharedo need permission to use your camera, if you'd like to upload image.");
        //     }
        // }
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                'title': 'Access Storage',
                'message': 'Access Storage for the pictures'
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("You can use read from the storage")
            } else {
              console.log("Storage permission denied")
            }
          } catch (err) {
            console.warn(err)
          }

    };

    handlePost = () => {
        console.log("INSIDE HANDLE POST")
        Fire.shared
            .addPost({ text: this.state.text.trim(), localUri: this.state.image })
            .then(ref => {
                this.setState({ text: "", image: null });
                this.props.navigation.goBack();
            })
            .catch(error => {
                console.log("Inside Catch")
                alert(error);
            });
    };

    pickImage = async () => {
        //https://www.positronx.io/react-native-pick-images-from-camera-gallery-example/
        var options = {
            title: 'Select Image',
            customButtons: [
              { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
            ImagePicker.showImagePicker(options, (response) => {
            //console.log("reesssuulllttt", result)
            console.log('Response = ', response);
            console.log('jsonn', JSON.stringify(response))
            console.log('URRRIIIII ISS', response.uri)

            if (response.didCancel) {
                console.log('You cancelled image picker');
              }
              else if(response.error) {
                console.log('ImagePicker Error: ', response.error);
              } 
              else if (response.customButton) {
                console.log('You tapped custom button: ', response.customButton);
              }
              else {
                let source = response.uri
                this.setState({
                    image: source,
                  });
              }
  
        })
    };

    render(){
        return(
            <SafeAreaView style={styles.container}>

               <View style={styles.header} >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Icon name="chevron-left" size={24} color="#bdbfbd" ></Icon >
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={this.handlePost} >
                        <Text style={{fontWeight: "500"}} >Post  </Text>
                    </TouchableOpacity>
               </View>

               <View style={styles.inputContainer}>
                    <Image source={require("../images/avatar.jpg")} style={styles.avatar}></Image>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder="Wanna share something?"
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
               </View>

               <TouchableOpacity style={styles.photo} onPress={this.pickImage} >
                   <Icon name="camera" size={32} color="#bdbfbd"></Icon>
               </TouchableOpacity>

               <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                    <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    header : {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#bdbfbd"
    },
    inputContainer: {
        margin: 32,
        flexDirection: "row"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32
    }
})