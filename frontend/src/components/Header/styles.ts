import styled from 'styled-components';

export const Container = styled.header`
  padding: 24px;
  background: #28262e;
  top: 0;
  position: fixed;
  z-index: 3;
  width: 100%;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: flex-end;

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50px;
  }

  div {
    display: flex;
    justify-content: left;
    align-items: left;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      text-decoration: none;
      color: #2d9cdb;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
