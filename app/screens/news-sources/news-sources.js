import React, { Component } from "react";
import { View, Text,  } from "react-native";
import GlobalStyles from "../../config/style";

class NewsSources extends Component {
  render() {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.center]}>
        <Text>News Sources</Text>
      </View>
    );
  }
}

export default NewsSources;