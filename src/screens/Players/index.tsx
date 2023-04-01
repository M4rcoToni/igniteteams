import { FlatList } from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';

import { Container, Form, HeaderList, NumberOfPlayers as NumberOfPlayers } from './styles';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

type RouteParams = {
  group: string;
}

export function Players() {
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState(['marco', 'Vini']);

  return (
    <Container>
      <Header
        showBackButton
      />
      <Highlight
        title={group}
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
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
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