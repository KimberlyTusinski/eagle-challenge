import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FiUser,
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiPlus,
  FiBarChart2,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useHistory } from 'react-router';
import { Container, Content, UserMedication } from './styles';
import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationErrors';

import api from '../../../services/api';

import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

interface User {
  id: string;
  name: string;
}

interface Schedule {
  time: string;
}

interface ProfileormData {
  name: string;
  dosage: string;
  time_course: number;
  price: number;
  schedule: string;
  user_id: string;
}

const User: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [dosage_text, setDosageText] = useState<string>('comprimido(s)');
  const [user_id, setUserId] = useState<string>();
  const [schedule, setSchedule] = useState<string>();

  useEffect(() => {
    api.get<Schedule[]>('/schedules/all').then(response => {
      if (response.data && response.data.length > 0) {
        setSchedule(response.data[0].time.slice(0, 5));
        setSchedules(response.data);
      }
    });

    api.get<User[]>('/medications').then(response => {
      if (response.data && response.data.length > 0) {
        setUserId(response.data[0].id);
        setUsers(response.data);
      }
    });
  }, []);

  const handleChangeDosageSelect = (value: string) => {
    setDosageText(value);
  };

  const handleChangeUserSelect = (value: string) => {
    setUserId(value);
  };

  const handleChangeScheduleSelect = (value: string) => {
    setSchedule(value);
  };

  const handleSubmit = useCallback(
    async (data: ProfileormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          dosage: Yup.number().required('Dosagem obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, dosage, price, time_course } = data;

        const formData = {
          name,
          dosage: `${dosage} ${dosage_text}`,
          time_course: time_course < 1 ? -1 : time_course,
          user_id,
          price: price || 0,
          time: {
            hour: schedule?.split(':')[0],
            minute: schedule?.split(':')[1],
          },
        };

        const response = await api.post('/medications', formData);

        addToast({
          type: 'success',
          title: 'Medicamento cadastrado!',
          description: 'Medicamento cadastrado com sucesso!',
        });

        history.push('/register/user-medication');
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
            'Ocorreu um erro ao cadastrar o medicamento, tente novamente.',
        });
      }
    },
    [addToast, dosage_text, schedule, user_id],
  );

  return (
    <Container>
      <Header />

      <Content>
        <UserMedication>
          <h1>Cadastrar Medicamento</h1>
          <p>
            <span>Informe os dados solicitados</span>
          </p>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              icon={FiPlus}
              placeholder="Nome do medicamento"
            />

            <div className="dosage">
              <Input
                id="dosage"
                type="number"
                name="dosage"
                icon={FiBarChart2}
                placeholder="Dose"
                min="1"
              />
              <Select
                id="dosage_text"
                name="dosage_text"
                options={[
                  { key: 'comprimido(s)', value: 'comprimido(s)' },
                  { key: 'cápsula(s)', value: 'cápsula(s)' },
                  { key: 'drágea(s)', value: 'drágea(s)' },
                  { key: 'ml(s)', value: 'ml(s)' },
                  { key: 'mg(s)', value: 'mg(s)' },
                  { key: 'gr(s)', value: 'gr(s)' },
                ]}
                value={dosage_text}
                onChange={event => handleChangeDosageSelect(event.target.value)}
              />
            </div>
            <Input
              name="price"
              icon={FiDollarSign}
              placeholder="Preço (Opcional)"
              type="number"
              min="1"
              step="0.01"
            />

            <Select
              name="schedule"
              icon={FiClock}
              options={schedules.map(scheduleOption => {
                return {
                  key: scheduleOption.time.slice(0, 5),
                  value: scheduleOption.time.slice(0, 5),
                };
              })}
              value={schedule}
              onChange={event => handleChangeScheduleSelect(event.target.value)}
            />

            <Select
              name="user_id"
              icon={FiUser}
              options={users.map(userOption => {
                return {
                  key: userOption.id,
                  value: userOption.name,
                };
              })}
              value={user_id}
              onChange={event => handleChangeUserSelect(event.target.value)}
              onSelect={event =>
                handleChangeUserSelect(
                  (event.target as HTMLButtonElement).value,
                )
              }
            />

            <Input
              name="time_course"
              icon={FiCalendar}
              type="number"
              min="0"
              placeholder="Período (Informe 0 para uso contínuo)"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
        </UserMedication>
      </Content>
    </Container>
  );
};

export default User;
