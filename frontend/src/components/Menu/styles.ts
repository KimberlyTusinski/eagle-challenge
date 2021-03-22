import styled from 'styled-components';
import open from '../../assets/open-menu.png';
import close from '../../assets/close-menu.png';

export const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #28262e;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 1;
  transform: scale(0);
  transition: 0.5s;

  &.active {
    transform: scale(1);
  }

  ul {
    position: relative;
  }

  ul li {
    position: relative;
    list-style: none;
    text-align: center;
    display: block;
    margin-top: 24px;
  }

  ul li a {
    position: relative;
    text-decoration: none;
    font-size: 2em;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    display: inline-block;
  }

  ul li a:before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 8px;
    background: #567eb6;
    transform: translateY(100%) scaleX(0);
    transform-origin: right;
    transition: 0.5s transform;
  }

  ul li a:hover:before {
    transform: translateY(100%) scaleX(1);
    transform-origin: left;
    transition: 0.5s transform;
  }
`;

export const ToggleIcon = styled.div`
  position: fixed;
  top: 30px;
  left: 6%;
  width: 50px;
  height: 50px;
  background: transparent url(${open});
  z-index: 2;
  cursor: pointer;

  &.active {
    background: transparent url(${close});
  }
`;

export const Icon = styled.i`
  margin-right: 24px;
  padding: 2px;
`;
