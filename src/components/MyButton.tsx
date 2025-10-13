// 1. 使用 interface 或 type 定义 Props 的类型和每个属性的类型
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

interface MyBtnProps {
  /**
   * 按钮的主要文字内容
   */
  text: string;

  /**
   * 点击按钮时触发的回调函数
   */
  onClick: (props: string) => void;

  /**
   * 按钮是否被禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 按钮的样式类型
   * @default 'primary'
   */
  type?: 'primary' | 'secondary' | 'danger';
}

// 2. 将 Props 类型应用于函数组件
// React.FC<ButtonProps> 是 FunctionComponent 的简写，一个泛型类型
const MyButton: React.FC<MyBtnProps> = ({
  text,
  onClick,
  disabled = false,
  type = 'primary',
}) => {
  // 根据 props 计算样式等
  const buttonStyle = `btn btn-${type} ${disabled ? 'disabled' : ''}`;

  // 定义一个处理点击事件的函数
  const handleClick = () => {
    onClick(buttonStyle);
  };

  return (
    <TouchableOpacity onPress={handleClick} disabled={disabled}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};
export default MyButton;
