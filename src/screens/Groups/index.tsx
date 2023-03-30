import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { StatusBar } from 'expo-status-bar';
import { Container } from './styles';

export function Groups() {
  return (
    <Container >
      <Header />
      <Highlight
        title='Turmas'
        subtitle='Jogue com sua turma!'
      />
      <GroupCard title='Galera do Ignite' onPress={() => { }} />
    </Container>
  );
}