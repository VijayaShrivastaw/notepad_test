import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  Alert 
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Todo', value: '1' },
  { label: 'In Progress', value: '2' },
  { label: 'Done', value: '3' }
];

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null); 

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') {
      setTitle(text);
      setTitleError(false);
    }
    if (valueFor === 'desc') {
      setDesc(text);
      setDescError(false);
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    if (!desc.trim()) {
      setDescError(true);
      return;
    }
    if (!selectedLabel) {
      Alert.alert('Please select an item','Select Dropdown Value');
      return;
    }

    if (isEdit || selectedLabel) {
      onSubmit(title, desc, Date.now(), selectedLabel.label,selectedLabel.value);
      
    } else {
      onSubmit(title, desc, null, selectedLabel.label,selectedLabel.value); 
      setTitle('');
      setDesc('');
      setSelectedLabel(null)
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
      setSelectedLabel(null)
    }
    onClose();
  };

  useEffect(() => {

    if (isEdit) {
      // console.log(note,'555')
      const initialSelectedItem = data.find(item => item.label === note.label);

      setTitle(note.title);
      setDesc(note.desc);
      setSelectedLabel(initialSelectedItem);

    }
  }, [isEdit]);
  return (
    <>
      <StatusBar />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            placeholder='Title'
            style={[styles.input, styles.title, titleError && styles.error]}
          />
          {titleError && <Text style={styles.errorText}>Please enter a title</Text>}
          <TextInput
            value={desc}
            multiline
            placeholder='Note'
            style={[styles.input, styles.desc, descError && styles.error]}
            onChangeText={text => handleOnChangeText(text, 'desc')}
          />
          {descError && <Text style={styles.errorText}>Please enter a description</Text>}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={selectedLabel}
            onChange={item => {
              setSelectedLabel(item);
            }}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.icon} onPress={handleSubmit}>
              <Image source={require('../../assets/check.png')} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
           
              <TouchableOpacity style={styles.icon} onPress={() => closeModal()}>
                <Image source={require('../../assets/close1.webp')} style={{ height: 30, width: 30 }} />
              </TouchableOpacity>
           
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 15,
  },
  icon: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    borderBottomColor: 'red', // Red border color for error
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  dropdown: {
    marginVertical: 10,
    borderBottomColor: colors.PRIMARY,
    borderBottomWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default NoteInputModal;
