import { FlatList } from 'react-native';
import { useState } from 'react';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';


export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState(['marco', 'Vini']);

  return (
    <Container>
      <Header
        showBackButton
      />
      <Highlight
        title='Nome da turma'
        subtitle='adicione a galera e separe os times'
      />
      <Form>
        <Input
          placeholder='Nome do Participante'
          autoCorrect={false}
        />
        <ButtonIcon
          icon='add'
        />

      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          horizontal
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />
        <NumbersOfPlayers>
          {players.length}
        </NumbersOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            onRemove={() => { }}
            name={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListEmpty message='Não há pessoas nesse time' />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />
      <Button
        title='Remover turma'
        type='SECUNDARY'
      />
    </Container>
  )
}