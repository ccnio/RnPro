import {Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percent: number) {
  return Math.round(percent * viewportWidth) / 100;
}

function hp(percent: number) {
  return Math.round(percent * viewportHeight) / 100;
}

export {viewportWidth, viewportHeight, wp, hp};
