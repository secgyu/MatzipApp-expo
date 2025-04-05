import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import * as Location from 'expo-location';

import useAppState from './useAppState';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const { isComeback } = useAppState();

  useEffect(() => {
    (async () => {
      try {
        // 위치 권한 요청
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setIsUserLocationError(true);
          return;
        }

        // 현재 위치 가져오기
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
        setIsUserLocationError(false);
      } catch (error) {
        setIsUserLocationError(true);
      }
    })();
  }, [isComeback]);

  return { userLocation, isUserLocationError };
}

export default useUserLocation;
