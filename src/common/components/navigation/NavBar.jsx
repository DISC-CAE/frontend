import React, { useState } from 'react';

import logo from 'assets/cae_logo.png';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'common/components/Button';

const StyledNav = styled.nav`
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  font-size: 20px;
  background-color: var(--primary-orange);
  font-family: var(--font-primary);
  position: relative;
`;

const LeftAligned = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
`;

const LogoPlaceholder = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: var(--font-bold);
  font-family: var(--font-primary);
`;

const MenuContainer = styled.div`
  position: relative;
`;

const MenuButton = styled(Button.Invisible)`
  padding: 8px;
  font-size: 1.5rem;
  font-weight: var(--font-bold);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HamburgerIcon = styled.div`
  width: 24px;
  height: 18px;
  position: relative;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: rgb(16, 23, 28);
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  span:nth-child(1) {
    top: 0px;
  }

  span:nth-child(2) {
    top: 7px;
  }

  span:nth-child(3) {
    top: 14px;
  }

  &:hover span {
    background: rgb(14, 22, 23);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--neutral-medium-grey);
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.3s ease-out;
  transform-origin: top right;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: var(--neutral-medium-grey);
  border: none;
  text-align: left;
  font-size: 1.1rem;
  font-weight: var(--font-bold);
  font-family: var(--font-primary);
  color: var(--neutral-black);
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: var(--neutral-light-grey);
    color: var(--neutral-black);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--neutral-light-grey);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <StyledNav>
      <LeftAligned>
        <LogoPlaceholder onClick={() => navigate('/')}>
          <img src={logo} alt='logo' />
        </LogoPlaceholder>
      </LeftAligned>
      <MenuContainer>
        <MenuButton onClick={toggleMenu}>
          <HamburgerIcon>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerIcon>
        </MenuButton>
        {isMenuOpen && (
          <DropdownMenu>
            <DropdownItem onClick={() => handleNavigation('/')}>
              Home
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation('/form')}>
              Form
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation('/scoreboard')}>
              Scoreboard
            </DropdownItem>
          </DropdownMenu>
        )}
      </MenuContainer>
    </StyledNav>
  );
}
