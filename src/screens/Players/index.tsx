import { Alert, FlatList, TextInput } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { AppError } from '@utils/AppError';

import { playerAddGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroup } from '@storage/player/playersGetByGroup';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupandTeam';
import { PLayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

type RouteParams = {
  group: string;
}

export function Players() {
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const navigation = useNavigation();
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PLayerStorageDTO[]>([]);
  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova Pessoa', 'Informe o nome da para adicionar!')
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova Pessoa', error.message)
      } else {
        Alert.alert('Nova pessoa', 'Não foi possivel adicionar!')
        console.log(error);

      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possivel carregar as pesoas di time selecionado')
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();

    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Remover Pessoa', error.message)
      } else {
        Alert.alert('Remover Pessoa', 'Não foi possivel remover!')
        console.log(error);
      }
    }
  }
  async function groupRemove() {
    try {
      await groupRemoveByName(group);

      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
      Alert.alert('Remover Grupo', 'Não foi possivel remocer o grupo.')
    }
  }
  async function handleRemoveGroup() {
    Alert.alert(
      'Remover turma',
      'Tem certeza que deseja remover essa turma?',
      [
        { text: 'não', style: 'cancel' },
        { text: 'sim', onPress: () => groupRemove() }
      ]
    )
  }
  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

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
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          placeholder='Nome do Pessoa'
          value={newPlayerName}
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon
          icon='add'
          onPress={handleAddPlayer}
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
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            onRemove={() => handlePlayerRemove(item.name)}
            name={item.name}
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
        onPress={handleRemoveGroup}
      />
    </Container>
  )
}