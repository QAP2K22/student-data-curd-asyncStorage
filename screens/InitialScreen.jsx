import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import ScreenData from '../Components/ScreenData'
import { useState } from 'react'
import { useEffect } from 'react'

const InitialScreen = ({ navigation }) => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    async () => {
      const response = await AsyncStorage.getItem("studentData")
      const students = response ? JSON.parse(response) : []
      setStudents(students)
    }
  }, [])

  async function deleteStudent(data) {
    const novaListaPessoa = students.filter(p => p.name !== data)
    await AsyncStorage.setItem("studentData", JSON.stringify(novaListaPessoa));
    setStudents(novaListaPessoa)
  }

  async function setNewStudent(returnData) {
    const studentsList = students
    studentsList.push(returnData)
    await AsyncStorage.setItem("studentData", JSON.stringify(returnData));
    setStudents(studentsList)
  }
  return (
    <View style={styles.container}>
      {students.map((key, item) => (
        <ScreenData name={item.name} registration={item.registration} schoolHour={item.schoolHour} course={item.course} navigation={navigation} deleteStudent={(e) => deleteStudent(e)} />
      ))}

      <Button mode="contained" onPress={() => navigation.push("create-student", { returnData: setNewStudent })} style={styles.button}>
        Adicionar
      </Button>
    </View>
  )
}

export default InitialScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    top: 15
  },

  button: {
    width: "90%",
    position: 'absolute',
    bottom: 0,
    marginBottom: 30
  }
});