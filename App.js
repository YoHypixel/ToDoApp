import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';

const App = () => {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [longPress, setLongPress] = useState(false)

  const handleAddTask = () => {
    if (task != null) {
    setTaskItems([...taskItems, task])
    setTask(null);
  }
  }

  const completeTask = (index) => {
    if(longPress != false){
    let itemsCopy = [...taskItems]
    setLongPress=false
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  }
  }
  return (
    <View style={styles.container}>
    <StatusBar style='dark' />

      <View style={styles.tasksWrapper}>

        <Text style={styles.sectionTitle}>
          Today's Tasks
          </Text>

          <View style={styles.items}>

          {  taskItems.map((item, index) => {
              return( 
                <Pressable  key={index} onLongPress={() => {
                  setLongPress(true)
                  completeTask(index)}} >

              <Task text ={item}/>

                </Pressable >

              )
            })
            }

          </View> 
          
      </View>

      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" || Platform.OS =="android" ? "padding": "height"}
      style={styles.writeTaskWrapper}
      >
        <TextInput 
        collapsable={true}
        style={styles.input} 
        placeholder={'Write a task'} 
        value={task} 
        onChangeText={text => setTask(text)}/>

        <TouchableOpacity onPress={() => handleAddTask()}>

        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>

        </View>
 
        </TouchableOpacity>


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
  position:'absolute',
  bottom:60,
  width:'100%',
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
  backgroundColor:'#FFF',
  borderRadius: 60,
  justifyContent: 'center',
  alignItems:'center',
  borderColor:'#C0C0C0',
  borderWidth:1,
},
addText: {
  fontSize:12,

}
});
