import styled from "styled-components";
import React, {useCallback, useState} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import StatusSwitch from "./StatusSwitch";
import { calculatePriority } from '../utils/utils';


const TableHead = styled.thead`
  display: table;
  width: 100%;
  table-layout: fixed;
`;

const TableBody = styled.tbody`
  display: table;
  width: 100%;
  table-layout: fixed;
`;


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  @media (max-width: 600px) {
    table-layout: auto;
  }
`;
const ScrollableTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 80vh;
  display: grid;
`;




const TableHeader = styled.th`
  background-color: #f2f2f2;
  text-align: left;
  padding: 8px;
  cursor: pointer;

  @media (max-width: 600px) {
    padding: 4px;
  }
`;


const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
    cursor: pointer;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 600px) {
    white-space: normal;
    width: 100%;
  }
`;


const SortIcon = styled.span`
  margin-left: 5px;
`;


const PriorityCell = styled(TableCell)`
  color: ${(props) =>
          props.priorityLabel === "Low"
                  ? "#28a745"
                  : props.priorityLabel === "Medium"
                          ? "#ffc107"
                          : props.priorityLabel === "High"
                                  ? "#dc3545"
                                  : "#c82333"};
`;

const PriorityIndicator = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
          props.priorityLabel === "Low"
                  ? "#28a745"
                  : props.priorityLabel === "Medium"
                          ? "#ffc107"
                          : props.priorityLabel === "High"
                                  ? "#dc3545"
                                  : "#c82333"};
  margin-right: 4px;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #dc3545;
  &:hover {
    color: #c82333;
  }
`;


const ProjectTable = ({ projects, onProjectClick, onDeleteClick, isLoggedIn}) => {
    const [sortConfig,  setSortConfig] = useState({ key: "id", direction: "ascending" });

    const sortedProjects = [...projects].sort((a, b) => {
        if (sortConfig.key === "priority") {
            return (a[sortConfig.key] - b[sortConfig.key]) * (sortConfig.direction === "ascending" ? 1 : -1);
        }

        if (sortConfig.key === "status") {
            const statusOrder = { "new": 0, "in_progress": 1, "on_hold": 2 };
            return (statusOrder[a[sortConfig.key]] - statusOrder[b[sortConfig.key]]) * (sortConfig.direction === "ascending" ? 1 : -1);
        }

        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
    });

    const requestSort = useCallback((key) => {
        let direction = "ascending";
        if (
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    },[sortConfig]);

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return;
        return sortConfig.direction === "ascending" ? "▲" : "▼";
    };

    return (
        <ScrollableTableWrapper>
            <Table>
                <TableHead>
                    <tr>
                        <TableHeader width="75px" onClick={() => requestSort("id")}>
                            ID
                            <SortIcon>{getSortIcon("id")}</SortIcon>
                        </TableHeader>
                        <TableHeader width="150px" onClick={() => requestSort("name")}>
                            Name
                            <SortIcon>{getSortIcon("name")}</SortIcon>
                        </TableHeader>
                        <TableHeader width="200px" onClick={() => requestSort("description")}>
                            Beschreibung
                            <SortIcon>{getSortIcon("description")}</SortIcon>
                        </TableHeader>
                        <TableHeader width="100px" onClick={() => requestSort("location")}>
                            Standort
                            <SortIcon>{getSortIcon("location")}</SortIcon>
                        </TableHeader>

                        <TableHeader width="150px" onClick={() => requestSort("employee")}>
                            Projektmanager
                            <SortIcon>{getSortIcon("employee")}</SortIcon>
                        </TableHeader>
                        <TableHeader width="100px" onClick={() => requestSort("status")}>
                            Status
                            <SortIcon>{getSortIcon("status")}</SortIcon>
                        </TableHeader>
                        <TableHeader width="120px" onClick={() => requestSort("priority")}>
                            Priorität
                            <SortIcon>{getSortIcon("priority")}</SortIcon>
                        </TableHeader>
                        {isLoggedIn && <TableHeader width="50px"></TableHeader>}
                    </tr>
                </TableHead>
                <TableBody>
                    {sortedProjects.map((project) => {


                        const priorityData = calculatePriority(project.priority);
                        return (
                            <TableRow key={project.id} onClick={() => onProjectClick(project)}>
                                <TableCell width="75px">{project.id}</TableCell>
                                <TableCell width="150px">{project.name}</TableCell>
                                <TableCell width="200px">{project.description}</TableCell>
                                <TableCell width="100px">{project.location}</TableCell>
                                <TableCell width="150px">{project.employee.join(', ')}</TableCell>
                                <TableCell width="100px">
                                    <StatusSwitch
                                        status={project.status}
                                        disabled={true}
                                    />
                                </TableCell>
                                <PriorityCell width="120px" priorityLabel={priorityData.priorityLabel}>
                                    <PriorityIndicator priorityLabel={priorityData.priorityLabel} />
                                    {priorityData.priorityLabel}({project.priority})
                                </PriorityCell>
                                {isLoggedIn && <TableCell width="50px">
                                    <DeleteButton
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onDeleteClick(project);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </DeleteButton>
                                </TableCell>}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </ScrollableTableWrapper>
    );
};

export default ProjectTable;

