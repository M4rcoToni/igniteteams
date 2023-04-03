import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { AppError } from '@utils/AppError';

import { Container, Content, Icon } from './styles';
import { groupCreate } from '@storage/group/groupCreate';
import { Alert } from 'react-native';

export function NewGroup() {
  const [group, setGroup] = useState('');
  const nav = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        Alert.alert('Novo Grupo', 'Informe o nome da turma.');
      }
      await groupCreate(group)
      nav.navigate('players', { group })

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Não foi possivelo criarum um novo grupo');
        console.log(error);
      }
    }
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