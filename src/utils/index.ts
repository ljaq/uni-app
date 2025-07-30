import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import zh from 'dayjs/locale/zh-cn';
import qs from 'query-string';

dayjs.locale(zh);
dayjs.extend(relativeTime);

export const sleep = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, time);
  });

export function formatTime(t?: string | Dayjs | number, formats = 'YYYY-MM-DD HH:mm:ss') {
  if (!t || t === '0001-01-01T00:00:00') return '--';
  return dayjs(t).format(formats);
}

// 哈弗辛公式
// export function getDistanceFromLatLonInKm(pos1: { lat: number; lon: number }, pos2: { lat: number; lon: number }) {
//   const { lat: lat1, lon: lon1 } = pos1;
//   const { lat: lat2, lon: lon2 } = pos2;
//   const R = 6371; // 地球半径，单位为千米
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // 距离，单位为千米
//   return Number(distance.toFixed(3));
// }

// 普通三角函数计算
export function getDistanceFromLatLonInKm(pos1: { lat: number; lon: number }, pos2: { lat: number; lon: number }) {
  const { lat: lat1, lon: lon1 } = pos1;
  const { lat: lat2, lon: lon2 } = pos2;

  const latDiff = lat2 - lat1;
  const lonDiff = lon2 - lon1;

  const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 110.574;

  return Number(distance.toFixed(3));
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function getBaiduTextToAudioUrl(text: string) {
  const { VITE_BAIDU_AUDIO_CLIENT, VITE_BAIDU_AUDIO_SECRET, VITE_BAIDU_AUDIO_APP_ID, VITE_BAIDU_AUDIO_CUID } =
    import.meta.env;

  return `https://tsn.baidu.com/text2audio?${qs.stringify({
    tex: text,
    client_id: VITE_BAIDU_AUDIO_CLIENT,
    client_secret: VITE_BAIDU_AUDIO_SECRET,
    appid: VITE_BAIDU_AUDIO_APP_ID,
    apikey: VITE_BAIDU_AUDIO_CLIENT,
    cuid: VITE_BAIDU_AUDIO_CUID,
    ctp: 1,
    lan: 'zh',
    spd: 5,
    pit: 5,
    vol: 5,
    per: 5118,
    aue: 3,
  })}`;
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 计算距离现在多长时间
export function getDistanceFromNow(t: string | Dayjs) {
  return dayjs(t).from(dayjs(), true);
}
