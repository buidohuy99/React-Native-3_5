import React from 'react';
import {Alert, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default class App extends React.Component {
  _alertString= (s) => {
    return (Alert.alert(
      `You have performed \"${s}\"`,
      'Press OK to exit',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    ));
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.profileBox}>
            <View style={styles.profileImageWrapper}>
              <Image style={styles.profileImage}
              source={require('./assets/myProfileDesu.jpg')}/>
            </View >
            <View style={styles.profileRight}>
              <Text style={styles.profileName}>Huy Bui</Text>
              <Text style={styles.profileJob}>Student</Text>
              <View style={styles.profileButtons}>
                <TouchableOpacity style={styles.followButton}
                onPress={() => this._alertString("followed")}>
                  <Text style={styles.buttonText}>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendButton}
                onPress={() => this._alertString("message sent")}>
                  <Feather style={styles.buttonText} color='white' name='send'/>
                </TouchableOpacity>
              </View>
            </View>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Text style={styles.infoTextBold}>210</Text>{"\n"}Photos
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoTextBold}>15k</Text>{"\n"}Followers
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoTextBold}>605</Text>{"\n"}Following  
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.imagesGrid}>
            <View style={styles.imageColumn}>
              {imgData.slice(0,centerImgData).map(item=>{
                return(
                  <Image source={item.imgSource} key={item.id}
                  style={styles.imageColumnItem}/>
                );
              })}
            </View>
            <View style={styles.imageColumn}>
              {imgData.slice(centerImgData).map(item=>{
                return(
                  <Image source={item.imgSource} key={item.id}
                  style={styles.imageColumnItem}/>
                );
              })}
            </View>
        </ScrollView>
      </View>
    );
  }
}

const POLO_BLUE_COLOR = 'rgb(51,60,87)';
const FOLLOW_COLOR = 'rgb(71,113,246)';
const SEND_MESSAGE_COLOR = 'rgb(120,213,250)';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 70,
  },
  profileBox: {
    width: '100%',
    display: 'flex',
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  infoBox: {
    width: "100%",
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imagesGrid: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "nowrap",
    paddingBottom: 80,
  },
  profileImageWrapper: {
    flex: 0.4,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "black", 
  },
  profileRight: {
    flex: 0.6,
    flexDirection: 'column',
    
  },
  profileButtons: {
    width: '100%',
    display: 'flex',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  profileJob: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 10,
    justifyContent: 'center',
    color: 'gray',
  },
  followButton: {
    flex: 0.6,
    height: '100%',
    marginRight: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${FOLLOW_COLOR}`,
    borderRadius: 25,
    shadowColor: `${POLO_BLUE_COLOR}`,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  sendButton: {
    flex: 0.4,
    height: '100%',
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${SEND_MESSAGE_COLOR}`,
    fontSize: 20,
    borderRadius: 25,
    shadowColor: `${POLO_BLUE_COLOR}`,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  infoText: {
    flex: 1,
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  infoTextBold: {
    fontWeight: "bold",
  },
  imageColumn: {
    flex: 0.5,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    paddingBottom: 0,
  },
  imageColumnItem: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  }
});

const imgData = [
  { id: 1, imgSource: require('./assets/1.jpg') },
  { id: 2, imgSource: require('./assets/2.jpeg') },
  { id: 3, imgSource: require('./assets/3.jpg') },
  { id: 4, imgSource: require('./assets/4.jpg') },
  { id: 5, imgSource: require('./assets/5.jpeg') },
  { id: 6, imgSource: require('./assets/6.jpg') }
];

const centerImgData = Math.floor(imgData.length / 2);