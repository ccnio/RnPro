import {ScrollView} from 'react-native';
import Pager from './widgets/Pager';

const Widget = () => {
  return (
    <ScrollView>
      <Pager initialPage={1} />
    </ScrollView>
  );
};
export default Widget;
