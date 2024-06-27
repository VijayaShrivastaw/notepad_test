import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import colors from '../misc/colors';

const Note = ({ item, onPress }) => {
  const [note, setNote] = useState(item);
  // const { title, desc } = item;

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};
//  console.log(note)
  return (
    <>
    <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />

    <TouchableOpacity onPress={onPress} style={styles.container}>
   
      <Text style={styles.title} numberOfLines={2}>
        Title : {note.title}
      </Text>
      <Text>Status : {note.label}</Text>

      <Text>Date : {formatDate(note.time)}</Text>
     
     
    </TouchableOpacity>
    </>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.PRIMARY ,
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.LIGHT,
  },
});

export default Note;
