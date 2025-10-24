import {Text, TouchableOpacity} from 'react-native';

export async function asyncFun() {
  console.log('asyncFun start');
  //下面的 promise 同步调用，阻塞 ‘promiseFun end’ 打印
  let ret = await promiseJob();
  console.log(`asyncFun stop ${ret}`);
}

export const asyncFun2 = async () => {
  console.log('asyncFun start');
  //下面的 promise 同步调用，阻塞 ‘promiseFun end’ 打印
  let ret = await promiseJob();
  console.log(`asyncFun stop ${ret}`);
};

export function promiseFun() {
  console.log('promiseFun start');
  //下面的 promise 异步调用，不阻塞 ‘promiseFun end’ 打印
  promiseJob()
    .then(result => {
      console.log('promiseFun then:', result);
    })
    .catch(error => {
      console.log('promiseFun catch:', error);
    });
  console.log('promiseFun end');
}

export function promiseJob(): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log('promiseJob start');
    setTimeout(() => {
      if (Date.now() % 2 === 0) resolve('Success');
      else reject('Error');
      console.log('promiseJob end');
    }, 2000);
  });
}

export const CaseBtn = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#2d8ddd',
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 10,
        alignSelf: 'flex-start',
        margin: 3,
      }}>
      <Text style={{color: 'white', fontSize: 12}}>{title}</Text>
    </TouchableOpacity>
  );
};
