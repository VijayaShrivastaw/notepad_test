import React from 'react';
import { View, StyleSheet ,TouchableOpacity,Image} from 'react-native';
import colors from '../misc/colors';


const RoundIconBtn = ({  onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.icon}>
      <Image 
      source={require('../../assets/arrow.jpg')}
       style={{ height: 30, width: 30 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    width:50,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    right:15,
    bottom:50,
    zIndex: 1,


  },

});

export default RoundIconBtn;
