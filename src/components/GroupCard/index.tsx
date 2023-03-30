import React from 'react';
import { Conatiner, Title, Icon } from './styles';
import { TouchableOpacityProps } from 'react-native';
type Props = TouchableOpacityProps & {
  title: string;
}
export function GroupCard({ title, ...rest }: Props) {
  return (
    <Conatiner {...rest}>
      <Icon />
      <Title>
        {title}
      </Title>
    </Conatiner>
  );
}