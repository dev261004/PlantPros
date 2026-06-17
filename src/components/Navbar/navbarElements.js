import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  min-height: 76px;
  background: #166534;
  border-bottom: 1px solid rgba(20, 83, 45, 0.55);
  box-shadow: 0 12px 32px rgba(20, 83, 45, 0.18);
`;

export const NavInner = styled.div`
  position: relative;
  width: min(1180px, calc(100% - 32px));
  height: 76px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 22px;
`;

export const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  color: #ffffff;
  text-decoration: none;
`;

export const BrandMark = styled.span`
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.16);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
`;

export const BrandText = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1;
  font-weight: 800;
  letter-spacing: 0;
  font-size: 1.25rem;

  small {
    margin-top: 5px;
    color: #bbf7d0;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  @media screen and (max-width: 420px) {
    small {
      display: none;
    }
  }
`;

export const NavMenu = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media screen and (max-width: 860px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  color: #dcfce7;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  padding: 0 16px;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.12);
  }

  &.active {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.18);
    box-shadow: inset 0 -2px 0 #bbf7d0;
  }
`;

export const Actions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CartLink = styled(Link)`
  position: relative;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  color: #166534;
  background: #f0fdf4;
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: #bbf7d0;
    background: #ffffff;
    box-shadow: 0 10px 22px rgba(15, 118, 110, 0.14);
    transform: translateY(-1px);
  }

  &.active {
    border-color: #22c55e;
    background: #ecfdf5;
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -7px;
  right: -7px;
  min-width: 21px;
  height: 21px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  border: 2px solid #ffffff;
  border-radius: 999px;
  color: #ffffff;
  background: #f97316;
  font-size: 0.68rem;
  font-weight: 800;
  line-height: 1;
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  gap: 9px;

  @media screen and (max-width: 860px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ $variant }) => ($variant === 'ghost' ? 'rgba(255, 255, 255, 0.42)' : '#ffffff')};
  border-radius: 999px;
  background: ${({ $variant }) => ($variant === 'ghost' ? 'transparent' : '#ffffff')};
  color: ${({ $variant }) => ($variant === 'ghost' ? '#ffffff' : '#166534')};
  padding: 0 18px;
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: #ffffff;
    background: ${({ $variant }) => ($variant === 'ghost' ? 'rgba(255, 255, 255, 0.14)' : '#f0fdf4')};
    color: ${({ $variant }) => ($variant === 'ghost' ? '#ffffff' : '#14532d')};
    box-shadow: 0 10px 20px rgba(20, 83, 45, 0.18);
    transform: translateY(-1px);
  }
`;

export const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  @media screen and (max-width: 860px) {
    display: none;
  }
`;

export const ProfileLink = styled(Link)`
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.14);
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.65);
    box-shadow: 0 10px 20px rgba(20, 83, 45, 0.18);
    transform: translateY(-1px);
  }
`;

export const LogoutButton = styled.button`
  height: 42px;
  border: none;
  border-radius: 999px;
  background: #ffffff;
  color: #166534;
  padding: 0 18px;
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #f0fdf4;
    box-shadow: 0 10px 20px rgba(20, 83, 45, 0.18);
    transform: translateY(-1px);
  }
`;

export const Bars = styled.button`
  width: 44px;
  height: 44px;
  display: none;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 50%;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.14);
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.65);
    background: rgba(255, 255, 255, 0.2);
  }

  @media screen and (max-width: 860px) {
    display: inline-flex;
  }
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 16px;
  right: 16px;
  display: none;
  padding: 12px;
  border: 1px solid #dcfce7;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);

  @media screen and (max-width: 860px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  }

  ${NavLink} {
    width: 100%;
    justify-content: flex-start;
    height: 46px;
    border-radius: 8px;
    color: #166534;
    padding: 0 14px;

    &:hover {
      color: #14532d;
      background: #dcfce7;
    }

    &.active {
      color: #ffffff;
      background: #166534;
      box-shadow: none;
    }
  }
`;

export const MobileActions = styled.div`
  display: grid;
  grid-template-columns: ${({ $stacked }) => ($stacked ? '1fr' : '1fr 1fr')};
  gap: 10px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;

  ${NavBtnLink},
  ${LogoutButton} {
    width: 100%;
  }

  ${NavBtnLink} {
    border-color: ${({ $stacked }) => ($stacked ? '#bbf7d0' : '#16a34a')};
    background: ${({ $stacked }) => ($stacked ? '#f0fdf4' : '#16a34a')};
    color: ${({ $stacked }) => ($stacked ? '#166534' : '#ffffff')};

    &:hover {
      border-color: #15803d;
      background: #15803d;
      color: #ffffff;
    }
  }

  ${NavBtnLink}[href="/login"] {
    border-color: #bbf7d0;
    background: #ffffff;
    color: #166534;

    &:hover {
      background: #f0fdf4;
      color: #14532d;
    }
  }

  ${LogoutButton} {
    background: #166534;
    color: #ffffff;

    &:hover {
      background: #14532d;
    }
  }

  ${ProfileLink} {
    width: 100%;
    border-radius: 999px;
    gap: 8px;
    color: #166534;
    background: #f0fdf4;
    border-color: #bbf7d0;
    font-weight: 800;
  }
`;
