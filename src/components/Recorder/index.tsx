import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Record from '../Record/index.tsx'
import Player from '../Player/index.tsx'
import styles from './styles.ts'



type IProps = {};

type IState = {
  isStopRecording: boolean; // 是否停止录音
  isStopPlaying: boolean; // 是否正在播放
  recordMap: Map<string, string> // 录音记录列表
  fileName: string  // 录音的路径
};

// 定义App组件
class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isStopRecording: false,
      isStopPlaying: false,
      recordMap: new Map(),
      fileName: ''
    };
  }

  // 处理录音组件回调
  onHandleRecord = (type: string, data?: {fileName: string, path: string}) => {
    console.log('--1----------', type)
    switch (type) {
      case 'start':
        this.setState({
          isStopRecording: false,
          isStopPlaying: true
        })
        break;
      case 'pause':
        this.setState({
          isStopRecording: false,
          isStopPlaying: false
        })
        break;
      case 'resume':
        this.setState({
          isStopRecording: false,
          isStopPlaying: true
        })
        break;
      default:
        const _recordMap = this.state.recordMap.set(data?.fileName as string, data?.path as string)
        this.setState({
          isStopRecording: false, 
          isStopPlaying: false,
          recordMap: _recordMap,
          fileName: data?.fileName as string
        });
        break;
    }
  }

  onHandlePlay = (type: string , audioName: string) => {
    if (type === 'play' || type === 'resume') {
      this.setState({
        // isStopPlaying: false,
        isStopRecording: true
      });
    } else {
      this.setState({
        // isStopPlaying: true,
        isStopRecording: false
      });
    }
  }
  onHandleSave = (name: string, path: string) => {

  }
  onHandleRemove = (name: string, path: string) => {
    this.state.recordMap.delete(name)
    this.setState({
      recordMap: this.state.recordMap
    })
  }

  // 渲染录音列表
  renderRecordList() {
    const { recordMap, fileName, isStopPlaying } = this.state;
    const _list = [...recordMap.keys()].map((item: any) => (
      <Player 
        isStopPlaying={isStopPlaying}
        audioName={item} 
        key={item} 
        path={recordMap.get(fileName) as string}
        onHandleSave={this.onHandleSave}
        onHandleRemove={this.onHandleRemove}
        onHandlePlay={this.onHandlePlay}>
      </Player>
    ))
    return (
      <View style={styles.recordList}>
        <Text style={styles.recordListTitle}>录音列表</Text>
        { recordMap.size > 0 ? 
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 40}}>
            {_list}
          </ScrollView> :
          <View style={styles.emptyList}>
            <Text style={styles.emptyListText}>暂无录音</Text>
          </View>
        }
      </View>
    )
  }

  // 渲染界面
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>录音</Text>
        <Record 
          isStopRecording={this.state.isStopRecording}
          callback={this.onHandleRecord}>
        </Record>
        {this.renderRecordList()}
      </View>
    );
  }
}

export default App;