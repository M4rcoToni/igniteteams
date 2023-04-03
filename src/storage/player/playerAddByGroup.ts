import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';

import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { PLayerStorageDTO } from './PlayerStorageDTO';
import { playersGetByGroup } from './playersGetByGroup';

export async function playerAddGroup(newPlayers: PLayerStorageDTO, group: string) {
  try {
    const storagePlayers = await playersGetByGroup(group);

    const playerAlredyExists = storagePlayers.filter(player => player.name === newPlayers.name);

    if (playerAlredyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em time aqui.');
    }

    const storage = JSON.stringify([...storagePlayers, newPlayers]);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw new AppError('');
  }

}