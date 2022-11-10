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
export default function InvitesScreen({ route, navigation }) {
  const { user } = route.params;
  const [userr, setuser] = useState(user);
  let temp;
  let body;

  return (
    <View style={styles.backgroundview}>
      <View style={styles.view_goback}>
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
          <Text style={styles.screenheader}>Invites Page</Text>
        </View>
      </View>

      <FlatList
        style={styles.flatliststyle}
        data={userr.invites}
        horizontal={false}
        inverted={false}
        renderItem={({ item }) => (
          <View style={styles.flatlistusers}>
            <Text style={styles.btntxt}>Invite From : {item.invite_from}</Text>
            <Text style={styles.btntxt}>
              Project Name : {item.project_name}
            </Text>
            <Text style={styles.btntxt}>Unit Cost : {item.cost} RS</Text>
            <Text style={styles.btntxt}>Duration : {item.duration} Days</Text>
            <Text style={styles.btntxt}>
              Given Role : {item.role}
              {'\n'}
            </Text>
            <Text style={styles.btntxt}>Description</Text>
            <Text style={styles.btntxt}>{item.decs}</Text>

            <View style={styles.answerviewlayout}>
              <TouchableOpacity
                onPress={() => {
                  setuser(removedata(userr, item));
                }}>
                <Image
                  source={require('./assets/reject.webp')}
                  style={styles.answericon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  temp = userr.joined_projects;
                  const bodycontent = item.project_name;
                  if (temp == null || temp == '') {
                    body = [bodycontent];
                  } else {
                    body = temp;
                    body.push(bodycontent);
                  }

                  const url =
                    'https://dsms0-7e9f.restdb.io/rest/contributors/' +
                    userr._id;
                  var options = {
                    method: 'PATCH',

                    headers: {
                      'cache-control': 'no-cache',
                      'x-apikey': 'your api key',
                      'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                      joined_projects: body,
                    }),
                    json: true,
                  };
                  postdata();
                  async function postdata() {
                    try {
                      let res = await fetch(url, options);
                      
                      setuser(removedata(userr, item));

                      const url2 =
                        'https://dsms0-7e9f.restdb.io/rest/data-scientist-projects?q={"project_name" :"' +
                        item.project_name +
                        '"}';

                      var optionsget = {
                        method: 'GET',
                        headers: {
                          'cache-control': 'no-cache',
                          'x-apikey': 'your api key',
                        },
                      };
                      let cut;
                      let wating = await fetch(url2, optionsget);
                      let newres = await wating.json();
                      let content = await newres[0].members;
                      const bodycontent = {
                        user_name: user.user_name,
                        role: item.role,
                        unit_cost: item.cost,
                        join_date: Date(),
                      };
                      if (content == null || content == '') {
                        cut = [bodycontent];
                      } else {
                        cut = content;
                        cut.push(bodycontent);
                      }
                      const urlmembers =
                        'https://dsms0-7e9f.restdb.io/rest/data-scientist-projects/' +
                        newres[0]._id;

                      var optionsmembers = {
                        method: 'PATCH',

                        headers: {
                          'cache-control': 'no-cache',
                          'x-apikey': 'your api key',
                          'content-type': 'application/json',
                        },
                        body: JSON.stringify({
                          members: cut,
                        }),
                        json: true,
                      };
                      let postmembers = await fetch(urlmembers, optionsmembers);
                      if(postmembers.ok){
                        alert('You Joined the Project');
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }}>
                <Image
                  source={require('./assets/aceept.png')}
                  style={styles.answericon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}></FlatList>
    </View>
  );
}
async function removedata(userr, item) {
  const cut = userr.invites;
  const index = cut.findIndex((x) => x._id === item._id);
  if (index !== undefined) cut.splice(index, 1);

  const url = 'https://dsms0-7e9f.restdb.io/rest/contributors/' + userr._id;

  var options = {
    method: 'PATCH',

    headers: {
      'cache-control': 'no-cache',
      'x-apikey': 'your api key',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      invites: cut,
    }),
    json: true,
  };
  const urlget =
    'https://dsms0-7e9f.restdb.io/rest/contributors?q={"user_name":"' +
    userr.user_name +
    '"}';
  var optionsget = {
    method: 'GET',
    headers: {
      'cache-control': 'no-cache',
      'x-apikey': 'your api key',
    },
  };

  try {
    let res = await fetch(url, options);
    if (res.ok) {
      let response = await fetch(urlget, optionsget);
      if (response.ok) {
        let data = response.json();
        return data[0];
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const styles = StyleSheet.create({
  answericon: {
    height: 50,
    width: 50,
    borderRadius: '100%',
    borderColor: ORANGE,
  },
  answerviewlayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: '10%',
  },

  btntxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    margin: '2%',
  },

  flatlistusers: {
    backgroundColor: ORANGE,
    borderWidth: 2.5,
    borderColor: SHADOWGREY,

    width: '100%%',
    height: 400,
    shadowOpacity: 0.25,
    shadowColor: SHADOWGREY,
    borderRadius: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
  },

  flatliststyle: {
    borderWidth: 2.5,
    borderColor: SHADOWGREY,
    height: '60%',
    backgroundColor: ALMOSTBLACK,
    width: '90%',
    borderRadius: '25%',

    alignItems: 'center',
  },
  text_error: {
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btn: {
    marginTop: '5%',
    width: '50%',
    backgroundColor: BLUESH,
    height: 50,
    borderRadius: 22,

    justifyContent: 'center',
  },
  box: {
    marginTop: 0,
    marginBottom: '5%',
    fontSize: 16,
    alignItems: 'center',
    width: '60%',
    backgroundColor: 'white',
    height: 55,
    borderRadius: 40,
    borderWidth: 1.5,
    color: ALMOSTBLACK,
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
  },

  gobackarrow: {
    height: 40,
    width: 40,
    paddingRight: '20%',
  },
  view_goback: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 0.5,
  },

  screenheader: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },

  backgroundview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
    paddingBottom: '25%',
  },
});
