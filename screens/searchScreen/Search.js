import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

export class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Search</Text>
      </View>
    )
  }
}

export default Search

const styles = StyleSheet.create({
  container:{
    flex:1,
    color:"#fff",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",

  }
})