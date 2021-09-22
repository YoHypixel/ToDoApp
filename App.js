import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, Animated, View } from 'react-native';
import Task from './components/Task';
import * as Haptics from 'expo-haptics';

const App = () => {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [longPress, setPress] = useState();
  const [alpha, setAlpha] = useState(10.0);



  const handleAddTask = () => {
    Keyboard.dismiss()
    if (task != null) {
      setTaskItems([...taskItems, task])
      setTask(null);
    }
  }

  const completeTask = (index) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    let itemsCopy = [...taskItems]
    setPress(false)
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)

  }
  return (
    <View style={styles.container}>
      <StatusBar style='dark' />

      <View style={styles.tasksWrapper}>

        <Text style={styles.sectionTitle}>
          Today's Tasks
        </Text>

        <View style={styles.items} >

          {taskItems.map((item, index) => {
            return (

              <Pressable key={index} delayLongPress={200}
              

              style={({opacity:alpha})}

                onPressIn={setAlpha(0.5)}

                onLongPress={() => {
                  Keyboard.dismiss()
                  completeTask(index)
                }}>


                <Task text={item} />
              </Pressable>

            )
          })
          }

        </View>

      </View>

      <KeyboardAvoidingView
        style={styles.writeTaskWrapper}
      >
        <TextInput
          collapsable={true}
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)} />

        <Pressable onPress={() => handleAddTask()}>

          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>

          </View>

        </Pressable>


      </KeyboardAvoidingView>


    </View>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,


  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,


  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,


  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 12,

  }
});
