import React from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';

interface GlobalLoadingProps {
  visible: boolean;
  message?: string;
}

const GlobalLoading: React.FC<GlobalLoadingProps> = ({
  visible,
  message = '加载中...',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#f86442" />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    minWidth: 120,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default GlobalLoading;


