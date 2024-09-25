import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

export default async function requestCameraRoll() {
  const permissionsToAsk = [
    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ];

  try {
    await requestMultiple(permissionsToAsk);
  } catch (error) {
    //
  }
}
