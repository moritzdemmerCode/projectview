import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import Login from "../components/Login";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0077b6;
  color: white;
  padding: 16px;
  font-size: 24px;
  font-weight: bold;
  z-index: 100;
  height: 64px;
  box-sizing: border-box;
`;


const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;


const Header = ({ isLoggedIn, handleLogout, handleLogin, isAuthPage }) => {
    return (
        <HeaderContainer>
            <div />
            <div>Projectview</div>
            <HeaderContent>
                {!isAuthPage && (
                    <div>
                        {isLoggedIn ? (
                            <Logout handleLogout={handleLogout} />
                        ) : (
                            <Login handleLogin={handleLogin}/>
                        )}
                    </div>
                )}
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;
