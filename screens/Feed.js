import React, { Component } from 'react';
import { Text, View,Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-web';
import PostCard from './PostCard';

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fontsLoaded: false,
          posts:[],
        };
      }
    
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }
      fetchStories=()=>{
        firebase
        .database()
        .ref("/posts/")
        .on("value",(snapShot)=>{
          let stories=[]
          if(snapShot.val()){Object.keys(snapShot.val()).forEach(function(key){
            stories.push({
              key:key,
              value:snapShot.val()[key],
            })
          })}
    
        })
        this.setState({stories:stories})
      }
    
    
      renderItem = ({ item: post }) => {
        return <PostCard post={post}  navigation={this.props.navigation}/>;
      };
    
      keyExtractor = (item, index) => index.toString();
    
    render() {
        return (
            <View style={styles.container}> 
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                        source={require("../assets/logo.png")
                    }
                        style={styles.iconImage}
                        ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={styles.appTitleText}>Spectagram</Text>
                    </View>

                </View>
                <View style={styles.cardContainer}>
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={posts}
                    renderItem={this.renderItem}/>
                </View>
            </View>
     
        );
    }
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"black"
    },
    droidSafeArea:{
        marginTop: Platform.OS === "android"? StatusBar.currentHeight : RFValue(35)
    },
    appTitle:{
        flex:0.07,
        flexDirection:"row"
    },
    appIcon:{
        flex: 0.2,
        justifyContent:"center",
        alignItems:"center"
    },
    iconImage:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    appTitleTextContainer:{
        flex:0.8,
        justifyContent:"center"
    },
    appTitleText:{
        color:"white",
        fontSize:RFValue(28),
    },
    cardContainer:{
        flex:0.85
    }

});