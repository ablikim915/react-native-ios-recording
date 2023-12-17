/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import Recorder from './components/Recorder/index.tsx'

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{width: W, height: H}}>
      <Recorder></Recorder>
    </SafeAreaView>
  );
}

export default App;
