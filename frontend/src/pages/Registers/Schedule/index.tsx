import React, { useCallback, useRef } from 'react';
import { FiClock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../services/api';

import Input from '../../../components/Input';

import { Container, Content, Time } from './styles';
import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationErrors';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

interface ProfileormData {
  schedule: string;
}

const Schedule: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ProfileormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          schedule: Yup.string().required('Horário obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { schedule } = data;

        const formData = {
          hour: schedule.split(':')[0],
          minute: schedule.split(':')[1],
        };

        const response = await api.post('/schedules', formData);

        addToast({
          type: 'success',
          title: 'Horário cadastrado!',
          description: 'Horário cadastrado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao cadastrar o horário, tente novamente.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Header />

      <Content>
        <Time>
          <h1>Cadastrar Horário</h1>
          <p>
            <span>Informe os dados solicitados</span>
          </p>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="schedule" icon={FiClock} type="time" />
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Time>
      </Content>
    </Container>
  );
};

export default Schedule;
