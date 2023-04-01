import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const [group, setGroup] = useState('');
  const nav = useNavigation();
  function handleNew() {
    nav.navigate('players', { group })
  }

  return (
    <Container>
      <Header
        showBackButton
      />
      <Content>
        <Icon />
        <Highlight
          title='Nova turma'
          subtitle='Crie a turma para adicionar as pessoas'
        />
        <Input
          // value={group}
          onChangeText={setGroup}
          placeholder='Nome da turma'
        />
        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  );
}