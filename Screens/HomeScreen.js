import * as React from 'react';
import { useEffect, useState } from 'react';
import ImagePicker from 'react-native-image-picker';

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

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

export default function HomeScreen({ route, navigation }) {
  const { user } = route.params;

  const [projects, setprojects] = useState(null);

  const [userr, setuser] = useState(user);
  const urlinfo =
    'https://dsms0-7e9f.restdb.io/rest/contributors?q={"user_name":"' +
    userr.user_name +
    '"}';
  const urlprojects =
    'https://dsms0-7e9f.restdb.io/rest/data-scientist-projects?q={"project_name" : {"$in" :' +
    JSON.stringify(userr.joined_projects) +
    '}}';

  var options = {
    method: 'GET',
    headers: {
      'cache-control': 'no-cache',
      'x-apikey': 'your api key',
    },
  };

  useEffect(() => {
    getinfo();
    getprojects();

    async function getinfo() {
      let response = await fetch(urlinfo, options);
      let res = await response.json();
      setuser(res[0]);
    }
    async function getprojects() {
      let response = await fetch(urlprojects, options);
      let res = await response.json();
      setprojects(res);
    }
  }, [user, setuser]);

  return (
    <View style={styles.backgroundview}>
      <View style={styles.view_goback}>
        <View style={{ width: '20%' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Invites', { user: userr });
            }}>
            <Image
              source={require('./assets/invites.png.png')}
              style={styles.gobackarrow}
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%', marginRight: '20%' }}>
          <Text style={styles.screenheader}>Home Page</Text>
        </View>
      </View>
      <View style={styles.infoview}>
        <View style={styles.iconeditview}>
          <Image
            style={styles.profile_icon}
            source={{ uri: userr.profile_image }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', { user: userr });
            }}>
            <Text style={styles.changephoto}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.usernameview}>
          <Text style={styles.usernametxt}>Name : {userr.user_name}</Text>
        </View>
      </View>
      <View style={styles.projectsview}>
        <Text style={styles.screenheader}>Projects</Text>

        <FlatList
          data={projects}
          horizontal={false}
          inverted={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                const urlgetrole =
                  'https://dsms0-7e9f.restdb.io/rest/data-scientist-projects?q={"members" : [ { "user_name" :"' +
                  userr.user_name +
                  '"} ] }';
                getrole();
                async function getrole() {
                  let res = await fetch(urlgetrole, options);
                  let data = await res.json();
                  let role = await data[0].members[0].role;
                  navigation.navigate(role, { user: userr, project: item });
                }
              }}
              style={styles.projectscards}>
              <Text style={styles.projectsinfo}>
                Project Name : {item.project_name}
              </Text>
              <Text style={styles.projectsinfo}>
                Project Budget : {item.project_info.project_budget}
              </Text>
              <Text style={styles.projectsinfo}>
                Project Type : {item.project_info.project_type}
              </Text>
            </TouchableOpacity>
          )}></FlatList>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  addproject: {
    width: '100%',
    height: '20%',
    backgroundColor: BACKGROUND,
    borderRadius: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  addprojectbtn: {
    backgroundColor: BACKGROUND,
    width: '55%',
    height: '25%',
    borderRadius: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectsinfo: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  projectsview: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameview: {
    width: '60%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernametxt: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconeditview: {
    width: '20%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    marginBottom: '5%',
  },
  screenheader: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  infoview: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '15%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: '30%',
    borderWidth: 1,
    borderColor: SHADOWGREY,
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
    marginBottom: 15,
  },
  gobackarrow: {
    height: 60,
    width: 60,
    paddingRight: '20%',
    marginBottom: '10%',
    borderRadius: '100%',
  },
  view_goback: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 0.5,
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
    height: '100%',
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
