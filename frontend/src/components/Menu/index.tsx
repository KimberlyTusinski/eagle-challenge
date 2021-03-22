import * as React from 'react';
import {
  FiHome,
  FiPlus,
  FiCalendar,
  FiUser,
  FiCreditCard,
  FiPackage,
  FiShoppingCart,
} from 'react-icons/fi';
import { MenuOverlay, ToggleIcon, Icon } from './styles';

const Menu: React.FC = () => {
  const handleMenu = () => {
    const nav = document.getElementById('menu-overlay');
    nav?.classList.toggle('active');
    const icon = document.getElementById('toggle-icon');
    icon?.classList.toggle('active');
  };
  return (
    <>
      <ToggleIcon onClick={handleMenu} id="toggle-icon" />
      <MenuOverlay id="menu-overlay">
        <ul>
          <li>
            <a href="/">
              <Icon>
                <FiHome />
              </Icon>
              Início
            </a>
          </li>
          <li>
            <a href="/statistic/cost">
              <Icon>
                <FiCreditCard />
              </Icon>
              Custos
            </a>
          </li>
          <li>
            <a href="/statistic/sales">
              <Icon>
                <FiShoppingCart />
              </Icon>
              Vendas
            </a>
          </li>
          <li>
            <a href="/register/schedule">
              <Icon>
                <FiPlus />
                <FiCalendar />
              </Icon>
              Horário
            </a>
          </li>
          <li>
            <a href="/register/user">
              <Icon>
                <FiPlus />
                <FiUser />
              </Icon>
              Amiga
            </a>
          </li>
          <li>
            <a href="/register/user-medication">
              <Icon>
                <FiPlus />
                <FiPackage />
              </Icon>
              Medicamento
            </a>
          </li>
        </ul>
      </MenuOverlay>
    </>
  );
};

export default Menu;
