import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import IconFont from '@/assets/iconfont';
import {useUser} from '@/hooks/useUserContext';

// 定义表单数据类型
interface LoginFormData {
  username: string;
  password: string;
}

// 登录方式枚举
type LoginType = 'username' | 'email';

const Login = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {login} = useUser();
  const [loginType, setLoginType] = useState<LoginType>('username');

  // 使用 React Hook Form
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting, isValid},
    reset,
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange', // 实时校验模式
    reValidateMode: 'onChange', // 重新校验模式
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // 模拟登录API调用
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      // 模拟登录成功
      const userInfo = {
        id: '1',
        username: loginType === 'email' ? data.username.split('@')[0] : data.username.trim(),
        avatar: 'https://via.placeholder.com/100',
      };

      login(userInfo);

      Alert.alert('登录成功', `欢迎回来，${userInfo.username}！`, [
        {
          text: '确定',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('登录失败', '用户名或密码错误，请重试');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const switchLoginType = (type: LoginType) => {
    setLoginType(type);
    reset(); // 清空表单
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <IconFont name="icon-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>登录</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 登录表单 */}
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <IconFont name="icon-user" size={80} color="#f86442" />
          <Text style={styles.logoText}>欢迎登录</Text>
        </View>

        {/* 登录方式切换 */}
        <View style={styles.loginTypeContainer}>
          <TouchableOpacity
            style={[
              styles.loginTypeButton,
              loginType === 'username' && styles.loginTypeButtonActive,
            ]}
            onPress={() => switchLoginType('username')}>
            <Text
              style={[
                styles.loginTypeText,
                loginType === 'username' && styles.loginTypeTextActive,
              ]}>
              用户名登录
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.loginTypeButton,
              loginType === 'email' && styles.loginTypeButtonActive,
            ]}
            onPress={() => switchLoginType('email')}>
            <Text
              style={[
                styles.loginTypeText,
                loginType === 'email' && styles.loginTypeTextActive,
              ]}>
              邮箱登录
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          {/* 用户名/邮箱输入 */}
          <View style={styles.inputWrapper}>
            <IconFont name="icon-user" size={20} color="#999" />
            <Controller
              control={control}
              name="username"
              rules={
                loginType === 'email'
                  ? {
                      required: '请输入邮箱地址',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: '请输入有效的邮箱地址',
                      },
                    }
                  : {
                      required: '请输入用户名',
                      minLength: {
                        value: 3,
                        message: '用户名至少3个字符',
                      },
                      maxLength: {
                        value: 20,
                        message: '用户名不能超过20个字符',
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                        message: '用户名只能包含字母、数字、下划线和中文',
                      },
                    }
              }
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    style={[
                      styles.input,
                      errors.username && styles.inputError,
                      value && !errors.username && styles.inputSuccess,
                    ]}
                    placeholder={
                      loginType === 'email' ? '请输入邮箱地址' : '请输入用户名'
                    }
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={loginType === 'email' ? 'email-address' : 'default'}
                  />
                  {value && !errors.username && (
                    <Text style={styles.successIcon}>✓</Text>
                  )}
                </>
              )}
            />
          </View>
          {errors.username && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          )}

          {/* 密码输入 */}
          <View style={styles.inputWrapper}>
            <IconFont name="icon-user" size={20} color="#999" />
            <Controller
              control={control}
              name="password"
              rules={{
                required: '请输入密码',
                minLength: {
                  value: 6,
                  message: '密码至少6个字符',
                },
                maxLength: {
                  value: 20,
                  message: '密码不能超过20个字符',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
                  message: '密码必须包含字母和数字',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    style={[
                      styles.input,
                      errors.password && styles.inputError,
                      value && !errors.password && styles.inputSuccess,
                    ]}
                    placeholder="请输入密码"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {value && !errors.password && (
                    <Text style={styles.successIcon}>✓</Text>
                  )}
                </>
              )}
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            (isSubmitting || !isValid) && styles.loginButtonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || !isValid}>
          <Text style={styles.loginButtonText}>
            {isSubmitting ? '登录中...' : '登录'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>还没有账号？</Text>
          <TouchableOpacity>
            <Text style={styles.registerText}>立即注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  loginTypeContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
    marginBottom: 32,
  },
  loginTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  loginTypeButtonActive: {
    backgroundColor: '#f86442',
  },
  loginTypeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  loginTypeTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  inputError: {
    borderBottomColor: '#ff4444',
  },
  inputSuccess: {
    borderBottomColor: '#4CAF50',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 32,
  },
  successIcon: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#f86442',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
  registerText: {
    fontSize: 14,
    color: '#f86442',
    marginLeft: 4,
  },
});

export default Login;
