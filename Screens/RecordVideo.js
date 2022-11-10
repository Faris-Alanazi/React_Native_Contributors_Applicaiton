import * as React from 'react';
import { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
const LIGHTBLUE = '#A8CFFF';
const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

export default function Videos({ navigation }) {
  const [cameraperm, setcameraperm] = useState(null);
  const [audioperm, setaudioperm] = useState(null);
  useEffect(() => {}, [picker, setpicker]);
  // const { user, project } = route.params;
  let user = {
    _id: '62ce6c7f699a691e0000b5e4',
    email: 'Wde@gmail.com',
    password: '11111111',
    user_name: 'Far1dsssss',
    gender: 'male',
    profile_image:
      'https://www.polhuisfd.nl/wp-content/uploads/User-Icon-Grey.png',

    _created: '2022-07-13T06:55:59.202Z',
    _changed: '2022-07-14T04:59:43.625Z',
    _createdby: 'api',
    _changedby: 'api',
    _version: 16,
    invites: [
      {
        invite_from: '1',
        project_name: 'Ooooooooo',
        cost: '0.88',
        duration: '5',
        role: 'Annotator',
        decs: 'This is a video role annotatie',
        _id: '1Ooooooooo0.885AnnotatorThis is a video role annotatie',
      },
      {
        invite_from: '1',
        project_name: 'Ooooooooo',
        cost: '0.88',
        duration: '5',
        role: 'Annotator',
        decs: 'This is a video role annotatie',
        _id: '1Ooooooo0.885AnnotatorThis is a video role annotatie',
      },
    ],
    joined_projects: [],
  };
  const [picker, setpicker] = useState(null);
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={{ backgroundColor: BACKGROUND }}>
        <View style={styles.maincard}>
          <View style={styles.headerandgoback}>
            <View style={{ width: '20%' }}>
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
            <View style={{ width: '50%', marginRight: '20%' }}>
              <Text style={styles.screenheader}>Task Screen</Text>
            </View>
          </View>
          <View style={styles.infocard}>
            <Image
              source={{ uri: user.profile_image }}
              style={styles.usericon}
            />
            <View style={styles.userinfocard}>
              <Text style={styles.userinfoHeader}>Info</Text>
              <Text style={styles.userinfo}>Username : {user.user_name}</Text>
              <Text style={styles.userinfo}>Email : {user.email}</Text>
              <Text style={styles.userinfo}>Phone : 05342304928</Text>
            </View>
          </View>
        </View>
        <View style={styles.backgroundview}>
          <View style={styles.rolebtns}>
            <TouchableOpacity
              onPress={() => {
                selectvideo();

                const options = {
                  mediaType: 'video',
                };

                async function selectvideo() {
                  let permissionResult =
                    await Picker.requestMediaLibraryPermissionsAsync();

                  if (permissionResult.granted === false) {
                    alert('Permission to access camera roll is required!');
                    return;
                  }
                  const hi = null;
                  let pickerResult = await launchImageLibrary(options, hi);

                  if (pickerResult.cancelled === true) {
                    return;
                  }
                  setpicker(pickerResult.uri);
                }
              }}
              style={styles.btn}>
              <Text style={styles.btntxt}>Select a Video</Text>
            </TouchableOpacity>
            <Image style={styles.pickedphoto} source={{ uri: picker }} />
            <TouchableOpacity
              style={styles.uploadbtn}
              onPress={() => {
                const url = 'https://dsms0-7e9f.restdb.io/rest/data';

                var options = {
                  method: 'POST',
                  headers: {
                    'cache-control': 'no-cache',
                    'x-apikey': 'your api key',
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    data_belongs_to: project.project_name,
                    data_belongs_to_project_id: project._id,
                    data_type: project.project_info.project_type,
                    data: picker,
                    collected_by: user.user_name,
                    collected_date: Date(),
                    annotated: false,
                    annotated_by: '',
                    dec: '',
                  }),
                  json: true,
                };

                postphoto();
                async function postphoto() {
                  if (picker == null || picker == '') {
                    alert('Select or Take a Photo First');
                  } else {
                    let res = await fetch(url, options);
                    console.log(res);
                    if (res.ok) {
                      setpicker(null);
                      alert('Photo Posted');
                    }
                  }
                }
              }}>
              <Text style={styles.btntxt}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  userinfo: {
    color: ALMOSTBLACK,
    textAlign: 'center',

    fontSize: 15,
    
  },
  userinfoHeader: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 0,
  },
  userinfocard: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'white',
    marginLeft: '10%',
    borderRadius: '20%',
    padding: '5%',
    shadowColor:  'grey',
    shadowOpacity:0.5,
    shadowOffset:-1
  },
  infocard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%',
    flexDirection: 'row',
    width: '50%',
  },
  usericon: {
    width: 80,
    height: 80,
    borderWidth: 1.5,
    borderColor: ORANGE,
    borderRadius: '100%',
  },
  headerandgoback: {
    flexDirection: 'row',
    height: '10%',
  },
  safearea: {
    backgroundColor: 'white',
    justifyContent:'center',
    height:"105%"
  },
  uploadbtn: {
    margin: 10,
    marginTop: '5%',
    width: '40%',
    backgroundColor: BLUESH,
    height: 50,
    borderRadius: 22,

    justifyContent: 'center',
  },
  pickedphoto: {
    width: '50%',
    height: '50%',
    borderWidth: 1.5,
    borderColor: ORANGE,
  },
  btntxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  rolebtns: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    width: '100%',
  },
  btn: {
    margin: 10,
    marginTop: '5%',
    width: '90%',
    backgroundColor: BLUESH,
    height: 50,
    borderRadius: 22,

    justifyContent: 'center',
  },
  screenheader: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },

  gobackarrow: {
    height: 60,
    width: 60,
    paddingRight: '20%',
    marginBottom: '10%',
    borderRadius: '100%',
  },
  maincard: {
    flexDirection: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '30%',
    borderColor: SHADOWGREY,
    backgroundColor: 'white',
    borderBottomLeftRadius: '50%',
    borderBottomRightRadius: '50%',
    borderBottomWidth: 1.5,
    borderStartWidth: 1.5,
    borderEndWidth: 1.5,
  },
  projectscards: {
    backgroundColor: ORANGE,
    width: 300,
    height: 200,
    borderWidth: 1.5,
    borderColor: SHADOWGREY,
    shadowOpacity: 1,
    shadowColor: SHADOWGREY,
    borderRadius: '30%',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_icon: {
    height: 90,
    width: 90,
    borderRadius: '100%',
    borderWidth: 1.5,
    borderColor: ORANGE,
    margin: 10,
  },
  backgroundview: {
    height: '70%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
  },
  changephoto: {
    textDecorationLine: 'underline',
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
