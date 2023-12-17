import React, { useState, useEffect } from 'react';
import { View, Text, Alert} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Button, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';
import styles from './styles.ts'

type IProps = {
    isStopPlaying: boolean
  path: string
  audioName: string
  onHandlePlay: (type: string , audioName: string) => void
  onHandleSave: (name: string, path: string) => void
  onHandleRemove: (name: string, path: string) => void
}

// 定义一个新的录音播放器实例
const audioRecorderPlayer: AudioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.01)  // 音频的订阅间隔 单位是秒

const Player = React.memo(function Player({
    isStopPlaying,
  path,
  audioName,
  onHandlePlay,
  onHandleSave,
  onHandleRemove
}: IProps) {
  const [currentPositionSec, setCurrentPositionSec] = useState<number>(0)
  const [currentDurationSec, setCurrentDurationSec] = useState<number>(0)
  const [playTime, setplayTime] = useState<string>('00:00:00')
  const [duration, setDuration] = useState<string>('00:00:00')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isAudioFinish, setIsAudioFinish] = useState<boolean>(true)

  useEffect(() => {
    return () => {
        onHandleAudioPlay('stop')
    }
  }, [])

//   useEffect(() => {
//     if (isStopPlaying) {
//         console.log('--1----')
//         onHandleAudioPlay('stop')
//     }
//   }, [isStopPlaying])

  const onHandleAudioPlay = async (type: string) => {
    switch (type) {
        case 'play':
            await audioRecorderPlayer.startPlayer(path);
            audioRecorderPlayer.setVolume(1.0);
            audioRecorderPlayer.addPlayBackListener((e: any) => {
                if (e.currentPosition === e.duration) {
                    console.log('finished');
                    setIsAudioFinish(true)
                    setIsPlaying(false)
                    audioRecorderPlayer.stopPlayer();
                    audioRecorderPlayer.removePlayBackListener();
                    onHandlePlay('stop', audioName)
                }
                if (currentDurationSec !== e.duration) {
                    setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
                    setCurrentDurationSec(e.duration || 0)
                }
                // setCurrentPositionSec(e.currentPosition || 0)
                // setplayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
            });
            setIsPlaying(true)
            setIsAudioFinish(false)
            onHandlePlay(type, audioName)
            break;
        case 'pause':
            await audioRecorderPlayer.pausePlayer();
            setIsPlaying(false)
            onHandlePlay(type, audioName)
            break;
        case 'resume':
            await audioRecorderPlayer.resumePlayer();
            setIsPlaying(true)
            onHandlePlay(type, audioName)
            break;
        default:
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
            setIsPlaying(false)
            setIsAudioFinish(true)
            onHandlePlay(type, audioName)
            break;
    }
  }

  const handleSave = async () => {
    const localPath = `${RNFS.DocumentDirectoryPath}/${audioName}` // 你可以选择自己的路径
    console.log('---存储地址---', localPath)
    RNFS.exists(path)
    .then(async () => {
        // 如果文件存在，exists 为 true，执行这里的代码
        await RNFS.copyFile(path, localPath).then(res => {
            // 如果复制成功，执行这里的代码
            console.log('保存成功',res)
            Alert.alert('保存成功')
          })
          .catch(err => {
            // 如果复制失败，执行这里的代码
            console.log('保存失败',err)
            Alert.alert('保存失败')
          });;
        onHandleSave(audioName, path)
    })
    .catch((err) => {
        // 如果发生错误，err 为错误对象，执行这里的代码
        console.log('文件不存在', err)
    });
  }
  const handleRemove = () => {
    onHandleRemove(audioName, path)
  }

  return (
    <View style={styles.recortItem}>
        <View style={styles.itemHeader}>
            <Text style={styles.recordName}>{ audioName }</Text>
            <View style={styles.headerEditor}>
            <Button style={styles.editBtn} mode='text' textColor='#000' onPress={handleSave}>保存</Button>
            <Button style={styles.editBtn} mode='text' textColor='#000' onPress={handleRemove}>移除</Button>
            </View>
        </View>
        <Text>长度：{duration}</Text>
        {/* <ProgressBar
            style={styles.playProgress}
            animatedValue={Number(currentPositionSec / currentDurationSec)}
        /> */}
        {/* <View style={styles.timeWrap}>
            <Text>{playTime}</Text>
            <Text>{duration}</Text>
        </View> */}
        <View style={styles.controler}>
            <Button 
                disabled={isStopPlaying}
                textColor='#000'
                onPress={() => {
                    if (isAudioFinish) {
                        onHandleAudioPlay('play')
                    } else if (isPlaying) {
                        onHandleAudioPlay('pause')
                    } else {
                        onHandleAudioPlay('resume')
                    }
                }}>
                <Icon name={isAudioFinish || !isPlaying ? 'play' : 'pause'} size={20}/>
            </Button>
            <Button disabled={isStopPlaying} textColor='#000' onPress={() => onHandleAudioPlay('stop')}>
                <Icon name="stop" size={20}/>
            </Button>
        </View>
    </View>
  );
});

export default Player