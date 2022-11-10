import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

 const IMAGE = 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-1.png?ssl=1'

export default function RegisterScreen({ navigation, route }) {
  const types = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const [user_name, set_user_name] = useState(null);
  const [password, set_password] = useState(null);
  const [email, set_email] = useState(null);

  const [user_name_error, set_user_name_error] = useState(null); //for Setting error msgs
  const [password_error, set_password_error] = useState(null);
  const [email_error, set_email_error] = useState(null);

  const [vaild_user_name, set_vaild_user_name] = useState(false); //for valaditon
  const [vaild_password, set_vaild_password] = useState(false);
  const [vaild_email, set_vaild_email] = useState(false);

  const [sex, setsex] = useState(null);
  

  const [error, set_error] = useState(null);

  return (
    <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={1}>
      <View styles={styles.mainview}>
        <View style={styles.backgroundimage}>
          <TextInput
            placeholderTextColor="grey"
            style={styles.txtinput}
            placeholder="Enter a UserName"
            onChangeText={(user_name) => {
              var vildate = new RegExp('^\\w[\\w.]{4,14}\\w$');
              if (user_name.match(vildate)) {
                set_user_name(user_name);
                set_user_name_error(null);
                set_error(null);
                set_vaild_user_name(true);
              } else {
                set_user_name_error(
                  "User Name Should be \n 1 - Between 6 - 14 Charachters \n 2 - Shouldn't have empty spaces \n 3 - Shouldn't end with a Specia Charachter "
                );
              }
            }}></TextInput>
          <View>
            <Text style={styles.text_error}>{user_name_error}</Text>
          </View>

          <TextInput
            placeholderTextColor="grey"
            style={styles.txtinput}
            placeholder="Enter a Password"
            onChangeText={(password) => {
              var vildate = new RegExp('^\\w[\\w.]{6,20}\\w$');
              if (password.match(vildate)) {
                set_password(password);
                set_password_error(null);
                set_error(null);
                set_vaild_password(true);
              } else {
                set_password_error(
                  "Password Should be \n 1 - Between 8 - 20 Charachters \n 2 - Shouldn't have empty spaces \n 3 - Shouldn't end with a Specia Charachter "
                );
              }
            }}
            secureTextEntry={true}></TextInput>
          <View>
            <Text style={styles.text_error}>{password_error}</Text>
          </View>

          <TextInput
            placeholderTextColor="grey"
            style={styles.txtinput}
            placeholder="Enter Your Email"
            onChangeText={(email) => {
              if (EmailValidator.validate(email)) {
                set_email_error(null);
                set_email(email);
                set_error(null);
                set_vaild_email(true);
              } else {
                set_email_error('Please enter a vaild Email');
              }
            }}
            keyboardType="email-address"></TextInput>
          <View>
            <Text style={styles.text_error}>{email_error}</Text>
          </View>

          <View style={styles.gender_view}>
            <RadioButtonRN
              animationTypes={['pulse', 'shake']}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40%',
              }}
              box={true}
              activeColor={ORANGE}
              deactiveColor={SHADOWGREY}
              boxStyle={styles.box}
              data={types}
              textStyle={styles.txttypesstyle}
              selectedBtn={(type) => {
                setsex(type.value);
              }}
              icon={<Icon name="check-circle" size={25} color={ORANGE} />}
            />
          </View>
          <View>
          <Text style={styles.text_error}>{error}</Text>
</View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              const urlget =
                'https://dsms0-7e9f.restdb.io/rest/contributors?q={"user_name":"' +
                user_name +
                '"}';
              var optionsget = {
                method: 'GET',
                headers: {
                  'cache-control': 'no-cache',
                  'x-apikey': 'your api key',
                },
              };

              const url = 'https://dsms0-7e9f.restdb.io/rest/contributors';

              var options = {
                method: 'POST',

                headers: {
                  'cache-control': 'no-cache',
                  'x-apikey': 'your api key',
                  'content-type': 'application/json',
                },

                body: JSON.stringify({
                  user_name: user_name,
                  password: password,
                  email: email,
                  gender: sex,
                  profile_image: IMAGE,
                  joined_projects : [],
                  invites : [],
                  balance : 0

                }),
                json: true,
              };
              if (
                user_name === null ||
                password === null ||
                email === null ||
                sex === null
              ) {
                set_error(' Please Make Sure to Fill all Fields');
              } else if (
                vaild_password !== true &&
                vaild_user_name !== true &&
                vaild_email != true
              ) {
                set_error(' Make Sure All Fiedls Are Vaild');
              } else {
                fetch(url, options).then((res) => {
                  if (res.ok) {
                    getData();
                  } else {
                    set_error(' One or More of the Fields Are Used ');
                  }
                  async function getData() {
                    let response = await fetch(urlget, optionsget);
                    let res = await response.json();
                    console.log(Date());
                    console.log('The User ' + user_name + ' Registerd');
                    navigation.navigate('Home', { user: res[0] });
                  }
                });
              }
            }}>
            <Text style={styles.btntxt}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  txttypesstyle: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontSize: 13,
    paddingLeft: '19%',
  }, 
  box: {
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
  gender_view: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    margin: 5,
    alignItems: 'center',
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
    marginBottom:"3%"
  },
  mainview: {
    height: '100%',
    width: '100%',
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
});
