import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { FiStar } from 'react-icons/fi';
import api from '../../../services/api';

import temp from '../../../assets/image-temp.svg';
import first from '../../../assets/first-podium-cost.svg';
import second from '../../../assets/second-podium-cost.svg';
import third from '../../../assets/third-podium-cost.svg';
import other from '../../../assets/other-podium-cost.svg';

import { Container, Content, Podium, UserMedication, Section } from './styles';
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

interface UserMedicationsCost {
  user: User;
  price: number;
}

interface IResponse {
  name: string;
  medications: Medication[];
}

const Cost: React.FC = () => {
  const [usersMedicationsCost, setUsersMedicationsCost] = useState<
    UserMedicationsCost[]
  >([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get<IResponse[]>('/medications/all').then(response => {
      const allMedications: Medication[] = [];

      response.data.map(medication => {
        return medication.medications.map(medicationUsers => {
          return allMedications.push(medicationUsers);
        });
      });

      setMedications(allMedications);
    });

    api.get<User[]>('/medications').then(response => {
      const allUsers = response.data;

      setUsers(allUsers);
    });
  }, []);

  useEffect(() => {
    const getUsersMedicationsCost = users.map(user => {
      const userResult = { user, price: 0 };

      medications.map(medication => {
        if (user.id === medication.user.id) {
          userResult.price += medication.price || 0;
        }

        return;
      });

      return userResult;
    });

    const usersMedicationsCostSort = getUsersMedicationsCost.sort((a, b) => {
      if (a.price > b.price) {
        return -1;
      }

      if (a.price < b.price) {
        return 1;
      }

      return 0;
    });

    setUsersMedicationsCost(usersMedicationsCostSort);
  }, [users, medications]);

  return (
    <Container>
      <Header />

      <Content>
        <Podium>
          <h1>Gastos das amigas</h1>
          <p>
            <span>Amigas que estão gastando mais com medicamentos</span>
          </p>

          <Section>
            <strong>Pódio</strong>

            {usersMedicationsCost.length === 0 && (
              <p>Nenhuma amiga nesta colocação</p>
            )}

            {usersMedicationsCost &&
              usersMedicationsCost
                .slice(0, 3)
                .map((userMedicationsCost, index) => {
                  const podium = [first, second, third];
                  return (
                    <UserMedication key={userMedicationsCost.user.id}>
                      <div>
                        <img src={podium[index]} alt={`${index + 1}º lugar`} />
                        <strong>{userMedicationsCost.user.name}</strong>
                        <span>
                          <FiStar />
                          R${userMedicationsCost.price}
                        </span>
                      </div>
                    </UserMedication>
                  );
                })}
          </Section>

          <Section>
            <strong>Outros</strong>

            {usersMedicationsCost.length <= 3 && (
              <p>Nenhuma amiga nesta colocação</p>
            )}

            {usersMedicationsCost &&
              usersMedicationsCost
                .slice(3, usersMedicationsCost.length)
                .map(userMedicationsCost => {
                  return (
                    <UserMedication key={userMedicationsCost.user.id}>
                      <div>
                        <img src={other} alt="participação" />
                        <strong>{userMedicationsCost.user.name}</strong>
                        <span>
                          <FiStar />
                          R${userMedicationsCost.price}
                        </span>
                      </div>
                    </UserMedication>
                  );
                })}
          </Section>
        </Podium>
      </Content>
    </Container>
  );
};

export default Cost;
