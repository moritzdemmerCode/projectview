import React from "react";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
export default function Logout({handleLogout}) {
  return (
    <Button onClick={handleLogout}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 8px;
  border-radius: 0.5rem;
  background-color: transparent;
  border: 1px solid white;
  cursor: pointer;
  margin-left: 16px;
  svg {
    font-size: 1.3rem;
    color: white;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;