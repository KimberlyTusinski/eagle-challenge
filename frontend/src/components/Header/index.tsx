import React from 'react';

import { Link } from 'react-router-dom';
import { Container, HeaderContent, Profile } from './styles';

import Menu from '../Menu';

import profile from '../../assets/profile.png';

const Header: React.FC = () => (
  <Container>
    <HeaderContent>
      <Menu />
      <Profile>
        <div>
          <span>Bem-Vinda</span>
          <strong>Dona Clotilde</strong>
        </div>
        <img src={profile} alt="pill" />
      </Profile>
    </HeaderContent>
  </Container>
);

export default Header;
