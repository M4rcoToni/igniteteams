import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Container, Form } from './styles';
import { Filter } from '@components/Filter';

export function Players() {
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
      <Filter
        title='Time A'
      />
    </Container>
  )
}