import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements'

export default class App extends React.Component {

  constructor(){ 
    super();
    this.state={word:'',defination:'', phonetics:''}
  }
  getWord=(word)=>{
    
    var url= "https://api.dictionaryapi.dev/api/v2/entries/en/"+word
    return fetch (url)
    .then ((data)=>{
      
      return data.json()
    })
    .then((response)=>{
      console.log(response)
      //var responseObject = JSON.parse(response);
      var word = response[0].word;
       console.log(word)
      var defination = response[0].meanings[0].definitions[0].definition
      console.log(defination)
      this.setState({

      word : word.trim(),
       defination : defination.trim()
    })
    })

    
      }


  render() {
    return (
      <View style={styles.container}>
      <Header
      backgroundColor={'#FC3B72'}
      centerComponent={{text:'Pocket dictionary', style:{color:'#A00005', fontSize:20, fontWeight:'bold'}}}
      />
     
      <TextInput style={{borderWidth:3, marginTop:80, textAlign:"center"}} 
      onChangeText = {text=>{
        this.setState({
       text:text,
        isSearchedPressed:false,
         word:"loading....",
         lexicalCategory:'',
         examples:[],
         defination:""
        })       
        }}
        
      />
      
    <TouchableOpacity style={{backgroundColor:'#1439AE', marginTop:50, marginLeft:230,width:70,height:40,alignItems:"center",justifyContent:"center"}} onPress = {()=>{
       this.setState({isSearchedPressed:true})
       this.getWord(this.state.text)
    }} >
    <Text>Search</Text>
   </TouchableOpacity>

  
  <Text style={{fontSize:18}}>{this.state.word}</Text>
  <Text style={{fontSize:18}}>{this.state.defination}</Text>
     </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#F08A8D',
  }
});
