import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-day-picker/lib/style.css';

import { FiClock } from 'react-icons/fi';

import DayPicker from 'react-day-picker';

import api from '../../services/api';
import Header from '../../components/Header';

import temp from '../../assets/image-temp.svg';

import {
  Container,
  Content,
  Schedule,
  Medication,
  Section,
  Calendar,
} from './styles';

interface IResponse {
  medication: Medication;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  image: string;
  schedule: {
    time: string;
  };
}

const Dashboard: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback((day: Date) => {
    setSelectedDate(day);
  }, []);

  useEffect(() => {
    api
      .get<IResponse[]>(
        `/medications/day-medications/3f81d556-ef83-42c1-8a39-35b05cfcca9b`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      )
      .then(response => {
        const formattedMedications = response.data.map(
          medicationResponse => medicationResponse.medication,
        );

        setMedications(formattedMedications);
      });
  }, [selectedDate]);

  const morningMedications = useMemo(() => {
    return medications.filter(medication => {
      return Number(medication.schedule.time.split(':')[0]) <= 12;
    });
  }, [medications]);

  const afternoonMedications = useMemo(() => {
    return medications.filter(medication => {
      return Number(medication.schedule.time.split(':')[0]) > 12;
    });
  }, [medications]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  return (
    <Container>
      <Header />

      <Content>
        <Schedule>
          <h1>Medicamentos</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>

          <Section>
            <strong>Manhã</strong>

            {morningMedications.length === 0 && (
              <p>Nenhum medicamento neste período</p>
            )}

            {morningMedications.map(medication => (
              <Medication key={medication.id}>
                <div>
                  <img src={temp} alt={medication.name} />
                  <strong>
                    {medication.name}
                    <span>{medication.dosage}</span>
                  </strong>
                  <span>
                    <FiClock /> {medication.schedule.time.slice(0, 5)}
                  </span>
                </div>
              </Medication>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonMedications.length === 0 && (
              <p>Nenhum medicamento neste período</p>
            )}

            {afternoonMedications.map(medication => (
              <Medication key={medication.id}>
                <div>
                  <img src={temp} alt={medication.name} />
                  <strong>
                    {medication.name}
                    <span>{medication.dosage}</span>
                  </strong>
                  <span>
                    <FiClock /> {medication.schedule.time.slice(0, 5)}
                  </span>
                </div>
              </Medication>
            ))}
          </Section>
        </Schedule>
      </Content>
    </Container>
  );
};

export default Dashboard;
