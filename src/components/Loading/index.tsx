import React from 'react';
import { View } from 'react-native';
import { Container, LoadingIdicator } from './styles';


export function Loading() {
  return (
    <Container >
      <LoadingIdicator />
    </Container>
  );
}