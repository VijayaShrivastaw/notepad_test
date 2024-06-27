import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert,Image,TouchableOpacity } from 'react-native';
// import { useHeaderHeight } from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';




const NoteDetail = props => {
  const [note, setNote] = useState(props.route.params.note);
  
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
    // console.log(note,'212')
  // const [selectedLabel, setSelectedLabel] = useState({ value: null, label: null });

  // const note = props.route.params.note

  // const headerHeight = useHeaderHeight();
  // console.log(note,'888')

  const handleOnClose = () => setShowModal(false);
  const handleUpdate = async (title, desc, time,label) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => {
      
      if (n.id === note.id) {
        // console.log(n,'44')
        n.title = title;
        n.desc = desc;
        n.label =label
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }

      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
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
  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };
  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your note permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteNote,
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  // const openEditModal = () => {
  //   // setIsEdit(true);
  //   // setShowModal(true);
  // };

  return (


    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: 70 }]}
      >
        <Text style={styles.time}>
          {note.isUpdated
            ? `Updated At ${formatDate(note.time)}`
            : `Created At ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.icon}   onPress={displayDeleteAlert}>
          <Image source={require('../../assets/delete.png')} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.icon,{marginTop:5}]}
         onPress={openEditModal}
         >
          <Image source={require('../../assets/edit.webp')} style={{ height: 30, width: 30 }} 
        />
        </TouchableOpacity>
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
  icon: {
    backgroundColor: colors.PRIMARY,
    // padding: 15,
    borderRadius: 50,
    // elevation: 5,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // position:'absolute',
    // right:15,
    // bottom:50,
    zIndex: 1,


  },
});

export default NoteDetail;
