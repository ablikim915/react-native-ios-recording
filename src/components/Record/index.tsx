import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioSet,
} from 'react-native-audio-recorder-player';
import { Button } from 'react-native-paper';
import { checkOrRequestAudioPermission } from '../../utils/permissions.ts'
import styles from './styles.ts'

type IProps = {
  isStopRecording: boolean
  callback: (type: string , data?: {fileName: string, path: string}) => void
}

// 录音的路径
let fileName: string = ''
const audioSet: AudioSet = {
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac
};

// 定义一个新的录音播放器实例
const audioRecorderPlayer: AudioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.01)  // 音频的订阅间隔 单位是秒


const Record = React.memo(function Record({
  isStopRecording,
  callback
}: IProps) {
  const [recordSecs, setRecordSecs] = useState<number>(0)
  const [recordTime, setRecordTime] = useState<string>('00:00:00')
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [isRecordFinish, setIsRecordFinish] = useState<boolean>(true)

  useEffect(() => {
    checkOrRequestAudioPermission(1)
    return () => {
      onHandleRecord('stop');
    }
  }, [])

  // useEffect(() => {
  //   if (isStopRecording) {
  //       onHandleRecord('pause')
  //   }
  // }, [isStopRecording])

  const onHandleRecord = async (type: string) => {
    console.log('---type---', type)
    let path: string = '';
    switch (type) {
      case 'start':
        await checkOrRequestAudioPermission(2)
        // fileName = `${Date.now()}.m4a`;
        fileName = `myRecord.m4a`;
        path = await audioRecorderPlayer.startRecorder(fileName, audioSet);
        audioRecorderPlayer.addRecordBackListener((e: any) => {
          setRecordSecs(e.currentPosition)
          setRecordTime(audioRecorderPlayer.mmssss(
            Math.floor(e.currentPosition),
          ))
        });
        console.log('start-1----',path);
        setIsRecording(true)
        setIsRecordFinish(false)
        callback(type, {
          fileName, 
          path
        })
        break;
      case 'pause':
        path = await audioRecorderPlayer.pauseRecorder();
        setIsRecording(false)
        console.log('pause-2----',path);
        callback(type)
        break;
      case 'resume':
        path = await audioRecorderPlayer.resumeRecorder();
        setIsRecording(true)
        console.log('resume-3----',path);
        callback(type)
        break;
      default:
        path = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setIsRecording(false)
        setIsRecordFinish(true)
        setRecordSecs(0)
        setRecordTime('00:00:00')
        if (!isStopRecording) {
          callback(type, {
            fileName, 
            path
          })
        }
        console.log('stop-4----',path);
        break;
    }
  }

  return (
    <View style={styles.recorder}>
      <Text style={styles.recordTime}>{recordTime}</Text>
      <View style={styles.recordButton}>
        <Button disabled={isStopRecording} mode="contained" onPress={() => {
          if (isRecordFinish) {
            onHandleRecord('start')
          } else if (isRecording) {
            onHandleRecord('pause')
          } else {
            onHandleRecord('resume')
          }
        }}>{isRecordFinish ? '录音' : isRecording ? '暂停' : '继续录音'}</Button>
        <Button mode="contained" onPress={() => onHandleRecord('stop')}>停止</Button>
      </View>
    </View>
  );
});

export default Record