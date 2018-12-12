import React,{Component} from 'react';
import {View,Image} from 'react-native';
import styles from './style';
import GlobalStyles from '../../config/style';

class Splash extends Component{
  render() {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.center]}>
        <Image style={styles.image} source={require('../../Imgs/splash.png')}></Image>
      </View>
    );
  }
}

export default Splash;

