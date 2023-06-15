import React from "react";
import styled from "styled-components";
import { Tooltip } from "@mui/material";

const StatusSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${(props) =>
          props.active ? props.backgroundColor : "transparent"};

  svg {
    fill: ${(props) => (props.active ? "white" : props.color)};
  }
`;

const StatusSwitch = ({ status, onChange, disabled }) => {
    const handleClick = (newStatus) => {
        if(disabled)
            return;
        if (status !== newStatus) {
            onChange(newStatus);
        }
    };

    return (
        <StatusSwitchContainer>
            <Tooltip title="Genehmigt">
                <IconWrapper
                    backgroundColor="green"
                    color="gray"
                    active={status === "new"}
                    onClick={() => handleClick("new")}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                    </svg>
                </IconWrapper>
            </Tooltip>
            <Tooltip title="In Bearbeitung">
                <IconWrapper
                    backgroundColor="orange"
                    color="gray"
                    active={status === "in_progress"}
                    onClick={() => handleClick("in_progress")}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                </IconWrapper>
            </Tooltip>
            <Tooltip title="Abgelehnt">
                <IconWrapper
                    backgroundColor="red"
                    color="gray"
                    active={status === "on_hold"}
                    onClick={() => handleClick("on_hold")}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.46V7h2v9.46c-.6-.34-1-.46-1-.46s-.4.12-1 .46z" />
                    </svg>
                </IconWrapper>
            </Tooltip>
        </StatusSwitchContainer>
    );
};

export default StatusSwitch;