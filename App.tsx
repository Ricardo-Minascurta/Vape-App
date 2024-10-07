import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import PuffCard from './src/components/PuffCard'
import GraphCard from './src/components/GraphCard'
import StatsPage from './src/components/StatsPage'
import BottomMenu from './src/components/BottomMenu'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const Stack = createStackNavigator()

interface PuffData {
  timestamp: Date
  count: number
}

function MainApp() {
  const [puffs, setPuffs] = useState<PuffData[]>([])
  const [currentPage, setCurrentPage] = useState<'timer' | 'add' | 'stats'>('add')

  const handleAddPuff = () => {
    const newPuff: PuffData = {
      timestamp: new Date(),
      count: puffs.length + 1
    }
    setPuffs(prevPuffs => [...prevPuffs, newPuff])
  }

  const handlePageChange = (page: 'timer' | 'add' | 'stats') => {
    setCurrentPage(page)
  }

  const calculateNicotineIntake = (puffCount: number) => {
    return (puffCount * 0.205).toFixed(4)
  }

  // Mock data for StatsPage
  const mockDailyData = [4, 6, 8, 5, 7, 9, 4]
  const mockWeeklyData = [30, 35, 28, 40, 45, 38, 42]
  const mockMonthlyData = [120, 140, 135, 150, 160, 155, 170, 165]

  const renderContent = () => {
    switch (currentPage) {
      case 'add':
        return (
          <>
            <View style={styles.cardContainer}>
              <PuffCard 
                puffCount={puffs.length} 
                nicotineIntake={parseFloat(calculateNicotineIntake(puffs.length))}
              />
            </View>
            <View style={styles.cardContainer}>
              <GraphCard puffs={puffs} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleAddPuff}>
                <Text style={styles.buttonText}>+ Add Puff</Text>
              </TouchableOpacity>
            </View>
          </>
        )
      case 'stats':
        return (
          <StatsPage 
            dailyData={mockDailyData}
            weeklyData={mockWeeklyData}
            monthlyData={mockMonthlyData}
          />
        )
      case 'timer':
        return (
          <View style={styles.timerContainer}>
            <Text>Timer Page (To be implemented)</Text>
          </View>
        )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          currentPage === 'add' && styles.scrollContentAdd
        ]}
        scrollEnabled={currentPage !== 'timer'}
      >
        {renderContent()}
      </ScrollView>
      <View style={styles.bottomMenuContainer}>
        <BottomMenu currentPage={currentPage} onPageChange={handlePageChange} />
      </View>
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5FB',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 15,
    paddingTop: 20,
    paddingBottom: 90, // Increased padding to account for BottomMenu
  },
  scrollContentAdd: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#5097FF',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomMenuContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F2F5FB',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})