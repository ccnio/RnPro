import {Text, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useRef, useState} from 'react';

interface Props {
  initialPage?: number;
}

const Pager = (props?: Props) => {
  const [currentPage, setCurrentPage] = useState(props?.initialPage || 0);
  const pagerRef = useRef<PagerView>(null);
  return (
    <View style={{width: '100%', height: 60, backgroundColor: 'gray'}}>
      <PagerView
        ref={pagerRef}
        style={{flex: 1}}
        initialPage={props?.initialPage || 0} /* 初始页面: 只在第一次渲染时生效 */
        onPageSelected={e => {
          setCurrentPage(e.nativeEvent.position);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}>
          <Text>Page 1</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
          }}>
          <Text>Page 2</Text>
        </View>
      </PagerView>
      <Text
        style={{position: 'absolute', right: 10, top: 10, color: 'white'}}
        onPress={() => {
          pagerRef.current?.setPage(currentPage === 0 ? 1 : 0);
        }}>
        cur:{currentPage + 1} 点击切换
      </Text>
    </View>
  );
};

export default Pager;
