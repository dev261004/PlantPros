import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export const Nav = styled.nav`
  background: #2d3748; /* bg-green-800 */
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px; /* Adjust padding to control the space on the sides */
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #a0aec0; /* text-green-300 */
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 15px; /* Adjust padding to control the space between nav items */
  height: 100%;
  cursor: pointer;

  &.active {
    color: #63b3ed; /* text-blue-300 */
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #a0aec0; /* text-green-300 */

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1; /* Allows NavMenu to take up available space */
  margin-right: 0; /* Remove margin-right to prevent extra space */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-left: auto; /* Pushes buttons to the right */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #38b2ac; /* bg-teal-400 */
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 5px; /* Space between buttons */

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
