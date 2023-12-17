import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

/**
 * 检查或请求录音权限
 * @param type 1: 检查 2: 请求
 */
export const checkOrRequestAudioPermission = async (type: 1 | 2) => {
  const _platform = Platform.select({
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
    ios: PERMISSIONS.IOS.MICROPHONE,
    default: PERMISSIONS.IOS.MICROPHONE,
  })
  let res = type === 1 ? await check(_platform) : await request(_platform)
  switch (res) {
    case RESULTS.UNAVAILABLE:
      console.log('录音功能不可用');
      break;
    case RESULTS.DENIED:
      console.log('录音权限被拒绝但可请求');
      break;
    case RESULTS.GRANTED:
      console.log('已有录音权限');
      break;
    case RESULTS.BLOCKED:
      console.log('录音权限被拒绝且不再可请求');
      break;
  }
}
