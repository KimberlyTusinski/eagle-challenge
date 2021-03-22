import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { FiStar } from 'react-icons/fi';
import api from '../../../services/api';

import temp from '../../../assets/image-temp.svg';
import first from '../../../assets/first-podium-sales.svg';
import second from '../../../assets/second-podium-sales.svg';
import third from '../../../assets/third-podium-sales.svg';
import other from '../../../assets/other-podium-sales.svg';

import { Container, Content, Podium, Medication, Section } from './styles';
import Header from '../../../components/Header';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface Medication {
  id: string;
  name: string;
  image: string;
  user: User;
  price: number;
  schedule: {
    time: string;
  };
}

interface UserMedicationsSales {
  medication: Medication;
  sales: number;
}

interface AllMedications {
  name: string;
  medications: Medication[];
}

const Sales: React.FC = () => {
  const [usersMedicationsSales, setUsersMedicationsSales] = useState<
    UserMedicationsSales[]
  >([]);
  const [allMedications, setAllMedications] = useState<AllMedications[]>([]);

  useEffect(() => {
    api.get<AllMedications[]>('/medications/all').then(response => {
      setAllMedications(response.data);
    });
  }, []);

  useEffect(() => {
    const getUsersMedicationsSales = allMedications.map(data => {
      const medicationResult = {
        medication: data.medications[0],
        sales: data.medications.length,
      };

      return medicationResult;
    });

    const usersMedicationsSalesSort = getUsersMedicationsSales.sort((a, b) => {
      if (a.sales > b.sales) {
        return -1;
      }

      if (a.sales < b.sales) {
        return 1;
      }

      return 0;
    });

    setUsersMedicationsSales(usersMedicationsSalesSort);
  }, [allMedications]);

  return (
    <Container>
      <Header />

      <Content>
        <Podium>
          <h1>Medicamentos Populares</h1>
          <p>
            <span>Remédio mais usado por suas amigas</span>
          </p>

          <Section>
            <strong>Pódio</strong>

            {usersMedicationsSales.length === 0 && (
              <p>Nenhum medicamento nesta colocação</p>
            )}

            {usersMedicationsSales
              .slice(0, 3)
              .map((userMedicationsSales, index) => {
                const podium = [first, second, third];
                return (
                  <Medication key={userMedicationsSales.medication.id}>
                    <div>
                      <img src={podium[index]} alt={`${index + 1}º lugar`} />
                      <strong>{userMedicationsSales.medication.name}</strong>
                      <span>
                        <FiStar />
                        {userMedicationsSales.sales}
                      </span>
                    </div>
                  </Medication>
                );
              })}
          </Section>

          <Section>
            <strong>Outros</strong>

            {usersMedicationsSales.length <= 3 && (
              <p>Nenhum medicamento nesta colocação</p>
            )}

            {usersMedicationsSales
              .slice(3, usersMedicationsSales.length)
              .map(userMedicationsSales => {
                return (
                  <Medication key={userMedicationsSales.medication.id}>
                    <div>
                      <img src={other} alt="participação" />
                      <strong>{userMedicationsSales.medication.name}</strong>
                      <span>
                        <FiStar />
                        {userMedicationsSales.sales}
                      </span>
                    </div>
                  </Medication>
                );
              })}
          </Section>
        </Podium>
      </Content>
    </Container>
  );
};

export default Sales;
