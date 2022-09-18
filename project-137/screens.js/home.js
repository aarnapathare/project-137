import React, {Component} from "react";
import{
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Alert, 
  SafeAreaView
} from "react-native";
import {ListItem} from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      listData:[],
      url:"httpL//localhost:5000/"
    };
  }

  componentDidMount(){
    this.getPlanets();
  }

  getPlanets = () =>{
    const {url} = this.state;
    axios
    .get(url)
    .then(response =>{
      listData: response.data.data
    });
  };

  renderItem = ({item,index}) =>(
    <ListItem
    key = {index}
    title={`Planet: ${item.name}`}
    titleStyle = {styles.title}
    containerStyle={styles.listContainer}
    bottomDivider
    chevron
    onPress={()=>
      this.props.navigation.navigate("Details", {star_name:item.name})
      }
      />
  );

  keyExtractor = (item,index) =>index.toString();

  render(){
    const{ listData } = this.state;

  
    if(listData.length ===0){
      return(
        <View style = {styles.emptyContainer}>
          <Text>Loading</Text>
        </View>

      );
    }

    return (
      <View style = {styles.container}>
        <SafeAreaView />
        <View style = {styles.upperContainer}>
          <Text style = {styles.headerText}>Stars</Text>
        </View>
        <View style = {Styles.lowerContainer}>
          <FlatList 
            keyExtractor = {this.keyExtractor}
            data={this.state.listData}
            renderItem={this.renderItem}
        />
        </View>
        </View>

    );

  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'edc988'
  },
  upperContainer:{
    flex:0.1,
    justifyContent:"center",
    alignItems:"center"
  },
  headerText:{
    fontSize:30,
    fontWeight:"bold",
    color:'#132743'
  },
  title:{
    fontSize:18,
    fontWeight:"bold",
    color:'#d7385e'
  },
  listContainer:{
    backgroundColor:'eeecda'
  }
  
})









