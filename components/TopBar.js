import { Image, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

export class TopBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>EndSem</Text>
        <View>
        <Image 
        source={{ uri: 'data:image/png;base64,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' }} 
        style={styles.image} 
      />
        </View>
      </View>
    )
  }
}

export default TopBar

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
    backgroundColor: "#F2F9FF",
    position: "absolute",
    top: 28,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:40,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius:50,
},
logo:{
    fontSize:30,
    color:'#2A3335',
    fontWeight:500
  }
});