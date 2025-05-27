import React from 'react';

import logo from 'assets/cae_logo.png';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'common/components/Button';

const StyledNav = styled.nav`
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  font-size: 20px;
  background-color: #e95d0c;
`;

const LeftAligned = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
`;

const LogoPlaceholder = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
`;

const Form = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
  margin-right: 20px;
`;
const Scoreboard = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
  margin-right: 20px;
`;

// Temporary "InitativePage" Nav
const InitiativePage = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
  margin-right: 20px;
`;

const Data = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
  margin-right: 20px;
`;

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <StyledNav>
      <LeftAligned>
        <LogoPlaceholder onClick={() => navigate('/')}>
          <img src={logo} />
        </LogoPlaceholder>
      </LeftAligned>
      <Form onClick={() => navigate('/form')}>Form</Form>
      <Scoreboard onClick={() => navigate('/scoreboard')}>
        Scoreboard
      </Scoreboard>
    </StyledNav>
  );
}
