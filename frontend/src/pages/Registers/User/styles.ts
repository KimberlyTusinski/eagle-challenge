import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  padding: 24px;
  margin: 126px auto 0 auto;
  display: flex;
`;

export const RegisterUser = styled.div`
  /* margin: auto; */
  flex: 1;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #2d9cdb;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #2d9cdb;
      margin: 0 8px;
    }
  }

  form {
    margin: 48px 0;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;
