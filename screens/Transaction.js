import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component {
constructor(props){
  super(props)
  this.state={
    domState:"normal",
    hasCameraPermission:null,
    scanned:false,
    scannedData:""
  }
}
getCameraPermission=async domState=>{
  const {status} = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({
    hasCameraPermission:status==="granted",
    domState:domState,
    scanned:false
  })
}
handleBarCodeScanned=async({type,data})=>{
  this.setState({
    scannedData:data,
    domState:"normal",
    scanned:true
  })
}
render(){
  const {domState,hasCameraPermission,scannedData,scanned}=this.state
  if(domState==="scanner"){
    return(
      <BarCodeScanner
      onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
      style = {StyleSheet.absoluteFillObject}
      />
    )
  }
  return (
    <View style={styles.container}>
      <Text>E-Lib</Text>
      <Text>
{hasCameraPermission?scannedData:"request for camera permission"}
      </Text>
      <TouchableOpacity
      style={styles.button}
      onPress={()=>this.getCameraPermission("scanner")}
      >
        <Text
        style={styles.buttonText}
        >
          scan QR code
        </Text>
      </TouchableOpacity>
    </View>
  
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
width:"80%",
height:60,
justifyContent:"center",
alignItems:"center",
backgroundColor:"teal",
borderRadius:30,
borderWidth:2
  },
  buttonText:{
    fontSize:14,
    color:"white"
  }
});
