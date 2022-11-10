import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

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

export default function AnotatePhotos({ route,navigation }) {
  const[photos,  setphotos]=useState(null)

  useEffect(() => {
    const url = 'https://dsms0-7e9f.restdb.io/rest/data?={"data_belongs_to":"'+project.project_owner+'"}'
    var options = { method: 'GET',
  headers: 
   { 'cache-control': 'no-cache',
     'x-apikey': 'your api key' } };
   getdata(url,options)
  }, [photos, setphotos]);
  async function getdata(url,options){
    let req = await fetch(url,options)
    let res = await req.json()
    setphotos(res)
    console.log(res)
 return res
  }
 
const { user, project } = route.params;

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
        <View style={styles.flatlistplace}>
         <FlatList inverted={true} numColumns={2} style={styles.flatliststyle}  data={photos} renderItem={({item})=>(
           <View style={styles.flatlistblock}>
          
           <Image style={styles.imagesample}  source={{uri : item.data}}/>
           <TouchableOpacity><Text style={styles.anotation}> Aprrove</Text></TouchableOpacity>
           </View>
         )}></FlatList>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  anotation:{
    fontSize:20,
    color:ORANGE,
    fontWeight:'bold'
  },
  flatlistplace:{
justifyContent:"center",
alignItems:"center"
  },
  flatliststyle:{
 
    width:"100%"
    ,height:"40%",
    margin:"10%"
    
  },
  imagesample:{
    height:150,width:150, borderWidth:1
  },
  flatlistblock:{
    
    marginTop:"10%",
    
    justifyContent:'center',
    alignItems:"center",
width:"50%",


  },
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
