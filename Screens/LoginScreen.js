import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

export default function LoginScreen({ route, navigation }) {
  const [user_name, set_user_name] = useState(null);
  const [password, set_password] = useState(null);
  const [error, set_error] = useState(null);
  return (
    <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={1}>
      <View styles={styles.mainview}>
        <View style={styles.backgroundimage}>
          <Image
            style={styles.mainicon}
            source={require('./assets/back_ground_icon.png')}
          />
          <TextInput
            placeholderTextColor="grey"
            style={styles.txtinput}
            placeholder="Enter a UserName"
            value={user_name}
            onChangeText={set_user_name}></TextInput>

          <TextInput
            placeholderTextColor="grey"
            style={styles.txtinput}
            placeholder="Enter a Password"
            onChangeText={set_password}
            value={password}
            secureTextEntry={true}></TextInput>

          <View>
            <Text style={styles.text_error}>{error}</Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              const url =
                'https://dsms0-7e9f.restdb.io/rest/contributors?q={"user_name":"' +
                user_name +
                '"}';
              var options = {
                method: 'GET',
                headers: {
                  'cache-control': 'no-cache',
                  'x-apikey': 'your api key',
                },
              };

              if (user_name === null) {
                set_error(' Please Enter a Username');
              } else if (password === null) {
                set_error(' Please Enter a Password');
              } else if (user_name === null && password === null) {
                set_error(' Please Enter Your Username and Password');
              } else {
                getData();
              }
              async function getData() {
                let response = await fetch(url, options);
                let res = await response.json();
                if (
                  res[0].user_name === user_name &&
                  res[0].password === password
                ) {
                 
                  navigation.navigate('Home', { user: res[0] });

                  console.log(Date());
                  console.log('The User ' + user_name + ' Logined');
                } else {
                  set_error(
                    ' invaild Username or Password \n * (Case Senstive) '
                  );
                }
              }
            }}>
            <Text style={styles.btntxt}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.singup_btn}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  singup_btn: {
    textDecorationLine: 'underline',
    marginTop: '2.5%',
    color: ORANGE,
    shadowOpacity: 0.5,
    shadowOffset: 1,
    shadowColor: SHADOWGREY,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: '30%',
  },
  btntxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text_error: {
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND,
  },
  txtinput: {
    marginTop: 0,
    marginBottom: '5%',
    fontSize: 16,
    textAlign: 'center',
    width: '85%',
    backgroundColor: 'white',
    height: 55,
    borderRadius: 40,
    borderWidth: 1.5,
    color: ALMOSTBLACK,
    borderColor: SHADOWGREY,
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
  },
  btn: {
    marginTop: '10%',
    width: '50%',
    backgroundColor: BLUESH,
    height: 50,
    borderRadius: 22,
    justifyContent: 'center',
  },
  mainicon: {
    height: 250,
    width: '100%',
    margin: '10%',

    shadowOpacity: 0.2,
    shadowColor: ORANGE,
  },
});
