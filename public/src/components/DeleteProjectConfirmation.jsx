import React, { useState } from "react";
import styled from "styled-components";
import { deleteProject } from "../api";
import {toast} from "react-toastify";

const ConfirmationContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 32px;
  width: 400px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Button = styled.button`
  background-color: #0077b6;
  color: white;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
  grid-column: 1 / -1;
`;

const InputField = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
`;

const CloseButton = styled.button`
  font-size: 32px;
  font-weight: bold;
  padding: 8px;
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Header = styled.h3`
  margin-top: 0;
  padding-top: 20px;
  margin-bottom: 16px;
`;

const Paragraph = styled.p`
  margin-bottom: 32px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;


const DeleteProjectConfirmation = ({ project, onClose, onProjectDelete }) => {
    const [nameConfirmation, setNameConfirmation] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (nameConfirmation === project.name) {
            await deleteProject(project.id);
            onProjectDelete();
            onClose();
            toast.success("Projekt erfolgreich gelöscht");
        } else {
            toast.error("Der eingegebene Projektname stimmt nicht überein.");
        }
    };

    return (
        <ConfirmationContainer>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <Header>Projekt löschen bestätigen</Header>
            <Paragraph>
                Geben Sie den Projektnamen <strong>{project.name}</strong> ein, um das Löschen des Projekts zu
                bestätigen. <strong>Dieser Vorgang kann nicht rückgängig gemacht werden.</strong>
            </Paragraph>
            <form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    value={nameConfirmation}
                    onChange={(e) => setNameConfirmation(e.target.value)}
                    placeholder="Projektname"
                    required
                />
                <div>
                    <ButtonWrapper>
                    <Button primary type="submit">
                        Löschen bestätigen
                    </Button>
                    </ButtonWrapper>
                </div>
            </form>
        </ConfirmationContainer>
    );
};

export default DeleteProjectConfirmation;