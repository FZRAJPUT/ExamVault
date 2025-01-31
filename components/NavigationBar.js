import { StyleSheet, View } from "react-native";
import React, { Component } from "react";
import IconIon from "react-native-vector-icons/SimpleLineIcons";
import IconIonOct from "react-native-vector-icons/Octicons";

export class NavigationBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <IconIon name="home" size={24} color="#fff" />
        <IconIonOct name="search" size={24} color="#fff" />
        <IconIon name="plus" size={24} color="#fff" />
        <IconIonOct name="image" size={24} color="#fff" />
        <IconIon name="settings" size={24} color="#fff" />
      </View>
    );
  }
}

export default NavigationBar;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    borderTopColor:"#fff",
    borderTopWidth:0.5,
    paddingHorizontal:10
  },
});
