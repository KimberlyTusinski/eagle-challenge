import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../services/api';

import Input from '../../../components/Input';

import { Container, Content, RegisterUser } from './styles';
import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationErrors';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

interface ProfileormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const User: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ProfileormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required().min(6, 'No mínimo 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'As senhas precisam ser iguais',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, password } = data;

        const formData = {
          name,
          email,
          password,
        };

        const response = await api.post('/users/admin', formData);

        addToast({
          type: 'success',
          title: 'Usuário cadastrado!',
          description: 'Usuário cadastrado com sucesso!',
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
            'Ocorreu um erro ao cadastrar o usuário, tente novamente.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Header />

      <Content>
        <RegisterUser>
          <h1>Cadastrar amiga</h1>
          <p>
            <span>Informe os dados solicitados</span>
          </p>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
        </RegisterUser>
      </Content>
    </Container>
  );
};

export default User;
