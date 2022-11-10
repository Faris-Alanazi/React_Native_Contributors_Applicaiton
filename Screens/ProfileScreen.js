import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

export default function ProfileScreen({ route, navigation }) {
  const { user } = route.params;
 
  const [profileimg, setprofileimg] = useState(user.profile_image);
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    const url =
      'https://dsms0-7e9f.restdb.io/rest/contributors/' + user._id;

    var options = {
      method: 'PATCH',
      headers: {
        'cache-control': 'no-cache',
        'x-apikey': 'your api key',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        profile_image: pickerResult.uri,
      }),
      json: true,
    };

    async function upload_photo() {
      const data = await fetch(url, options);
      const res = await data.json();

      if (data.ok) {
        setprofileimg(pickerResult.uri);
      }
    }
    upload_photo();
  };
  return (
    <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={1}>
      <View style={styles.backgroundimage}>
        <View style={styles.mainview}>
          <View style={styles.view_2}>
            <View style={styles.view_goback}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  source={require('./assets/GoBackArrow.png')}
                  style={styles.gobackarrow}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.view_4}>
              <Text style={styles.screenheader}>Profile Screen</Text>
            </View>

            <View style={styles.view_5}>
              <Text></Text>
            </View>
          </View>
          <View style={styles.view_5}></View>
          <View style={styles.view_profilebackground}>
            <Image style={styles.profileimage} source={{ uri: profileimg }} />
            <View style={styles.editview}>
              <TouchableOpacity
                onPress={() => {
                  openImagePickerAsync();
                }}>
                <Text style={styles.changephoto}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infocard}>
            <Text style={styles.userinfoHeader}>Info</Text>
            <Text style={styles.userinfo}>Username : {user.user_name}</Text>
            <Text style={styles.userinfo}>Email : {user.email}</Text>
            <Text style={styles.userinfo}>Phone : 05342304928</Text>
          </View>
        </View>
        <View style={styles.view_8}></View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  changephoto: {
    textDecorationLine: 'underline',
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userinfo: {
    color: ALMOSTBLACK,
    textAlign: 'center',

    fontSize: 16,
    margin: 10,
  },
  userinfoHeader: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },

  profileimage: {
    opacity: 1,
    borderRadius: '220%',
    marginTop: '15%',
    marginBottom: '5%',
    alignContent: 'center',
    justifyContent: 'cetner',
    alignItems: 'center',
    height: '75%',
    width: '75%',
    borderWidth: 2.5,
    borderColor: ORANGE,
  },
  gobackarrow: {
    height: 40,
    width: 40,
    margin: 5,
  },
  screenheader: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  view_2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
  },
  view_goback: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30%',
    margin: 10,
  },
  view_4: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '40%',
    margin: 5,
  },
  view_5: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30%',
    margin: 5,
  },
  view_profilebackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '40%',
    marginTop: '15%',
  },
  editview: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '50%',
    width: '100%',
  },

  infocard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '20%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: SHADOWGREY,
    borderRadius: '60%',
  },
  view_8: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundimage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
  },
});
