import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {fetchUsers, updateProject} from "../api";
import { toast } from "react-toastify";
import StatusSwitch from "./StatusSwitch";
import Select from "react-select";
import {calculatePriority} from "../utils/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateProjectContainer = styled.div`
  position: relative;
  background-color: #f8f9fa;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  border: 1px solid #dee2e6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow-y: auto; 
  max-height: 90vh; 
  @media (min-width: 768px) {
    width: 60%; 
  }
`;


const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InputWithPriorityValue = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
`;

const CreateProjectHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const PriorityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PriorityInput = styled.input`
  width: 100%;
  appearance: none;
  height: 5px;
  background-color: #ccc;
  outline: none;
  margin-right: 8px;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #0077b6;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const PriorityValue = styled.span`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  grid-column: 1 / -1;
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

const CloseButton = styled.button`
  font-size: 48px;
  font-weight: bold;
  padding: 8px;
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const TotalPointsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  border-top: 2px solid #dee2e6;
  font-weight: bold;
`;

const TotalPointsLabel = styled.span``;

const TotalPointsValue = styled.span`
  color: ${({ priorityColor }) => priorityColor};
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatusLabel = styled(Label)`
  margin-bottom: 0;
`;

const DatePickerWrapper = styled.div`
    .react-datepicker__input-container > input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
    }
`;

const EditProject = ({ project, onClose, onUpdateProject, isLoggedIn}) => {
    const [employeeList, setEmployeeList] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [locationList, setLocationList] = useState([
        {value: "Berlin, Germany", label: "Berlin, Germany"},
        {value: "Paris, France", label: "Paris, France"},
        {value: "London, United Kingdom", label: "London, United Kingdom"},
        {value: "Madrid, Spain", label: "Madrid, Spain"},
        {value: "Rome, Italy", label: "Rome, Italy"},
        {value: "Vienna, Austria", label: "Vienna, Austria"},
        {value: "Prague, Czech Republic", label: "Prague, Czech Republic"},
        {value: "Stockholm, Sweden", label: "Stockholm, Sweden"},
        {value: "Dublin, Ireland", label: "Dublin, Ireland"},
        {value: "Athens, Greece", label: "Athens, Greece"}
    ]);
    const [projectData, setProjectData] = useState({
        id: project.id,
        name: project.name,
        location: project.location,
        priority: project.priority,
        employee: project.employee,
        description: project.description,
        dueDate: new Date(project.dueDate),
        projectDuration: project.projectDuration,
        strategicImportance: project.strategicImportance,
        financialImportance: project.financialImportance,
        resourceRequirements: project.resourceRequirements,
        technicalFeasibility: project.technicalFeasibility,
        risksRequirements: project.risksRequirements,
        status: project.status
    });
    const [totalPoints, setTotalPoints] = useState(0);
    const { resourceRequirements, technicalFeasibility } = projectData;

    useEffect(() => {
        let projectDurationPoints = 0;

        if (projectData.projectDuration <= 0.5) {
            projectDurationPoints = 1;
        } else if (projectData.projectDuration <= 1) {
            projectDurationPoints = 2;
        } else if (projectData.projectDuration <= 2) {
            projectDurationPoints = 3;
        } else {
            projectDurationPoints = 4;
        }

        const points = parseFloat((
            calculateExpectedProfitValue(projectData.resourceRequirements) * 0.2
            + calculateProjectBudgetValue(projectData.technicalFeasibility) * 0.15
            + calculatePersonDaysValue(projectData.risksRequirements) * 0.1
            + projectData.strategicImportance * 0.3
            + projectData.financialImportance * 0.15
            + projectDurationPoints * 0.1
        ).toFixed(2));

        setTotalPoints(points);
    }, [projectData]);

    const { priorityColor, priorityLabel } = calculatePriority(totalPoints);
    const calculateExpectedProfitValue = (expectedProfit) => {
        if (expectedProfit > 250000) return 1;
        if (expectedProfit <= 250000 && expectedProfit > 100000) return 2;
        if (expectedProfit <= 100000 && expectedProfit > 50000) return 3;
        if (expectedProfit <= 50000) return 4;
    };
    const calculateProjectBudgetValue = (projectBudget) => {
        if (projectBudget > 250000) return 4;
        if (projectBudget <= 250000 && projectBudget > 100000) return 3;
        if (projectBudget <= 100000 && projectBudget > 50000) return 2;
        if (projectBudget <= 50000) return 1;
    };
    const calculatePersonDaysValue = (personDays) => {
        if (personDays > 2500) return 4;
        if (personDays <= 2000 && personDays > 1000) return 3;
        if (personDays <= 1000 && personDays > 500) return 2;
        if (personDays <= 500) return 1;
    };

    useEffect(() => {
        let profitability = 1;
        if(projectData.technicalFeasibility !== 0) {
            const profitabilityPercent = projectData.resourceRequirements / projectData.technicalFeasibility;
            if(profitabilityPercent < 0.25) {
                profitability = 4;
            } else if(profitabilityPercent < 0.50) {
                profitability = 3;
            } else if(profitabilityPercent < 1) {
                profitability = 2;
            }
        }
        setProjectData((prevState) => ({
            ...prevState,
            strategicImportance: profitability,
        }));
    }, [resourceRequirements, technicalFeasibility]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setProjectData((prevState) => ({...prevState, [name]: value}));
    };
    const handleEmployeeChange = (selectedEmployees) => {
        setSelectedEmployees(selectedEmployees);
        setProjectData((prevState) => ({
            ...prevState,
            employee: selectedEmployees.map((employee) => employee.label),
        }));
    };

    const handleLocationChange = (selectedLocation) => {
        setSelectedLocation(selectedLocation);
        setProjectData((prevState) => ({
            ...prevState,
            location: selectedLocation.value,
        }));
    }
    useEffect(() => {
        const selected = locationList.find(location => location.value === project.location);
        setSelectedLocation(selected);
    }, [project, locationList]);
    useEffect(() => {
        const fetchEmployees = async () => {
            const data = await fetchUsers();
            const employees = data.map((employee) => ({
                value: employee._id,
                label: employee.username,
            }));

            const selected = employees.filter((employee) =>
                project.employee.includes(employee.label)
            );
            setSelectedEmployees(selected);
            setEmployeeList(employees);
        };
        fetchEmployees();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const editedProject = { ...projectData, priority: totalPoints };
        const updatedProject = await updateProject(editedProject);

        if (updatedProject) {
            toast.success("Projekt erfolgreich aktualisiert!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            onUpdateProject();
            onClose();
        } else {
            toast.error("Ein Fehler ist beim Aktualisieren aufgetreten!");
        }
    };

    return (
        <CreateProjectContainer>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <CreateProjectHeader>Projekt bearbeiten</CreateProjectHeader>
            <Form onSubmit={handleSubmit}>
                <Label>Projektnummer</Label>
                <Input
                    type="number"
                    min="0"
                    name="id"
                    value={projectData.id}
                    onChange={handleInputChange}
                    required
                    disabled
                />
                <Label>Projektname</Label>
                <Input
                    type="text"
                    name="name"
                    value={projectData.name}
                    onChange={handleInputChange}
                    required
                />
                <Label>Projektleiter</Label>
                <Select
                    isMulti // Allows selecting multiple employees
                    options={employeeList}
                    onChange={handleEmployeeChange}
                    value={selectedEmployees}
                    closeMenuOnSelect={false}
                    required
                />
                <Label>Projektstandort</Label>
                <Select
                    options={locationList}
                    onChange={handleLocationChange}
                    value={selectedLocation}
                    required
                />
                <Label>Fälligkeitsdatum</Label>
                <DatePickerWrapper>
                    <DatePicker
                        selected={projectData.dueDate}
                        onChange={(date) => setProjectData({...projectData, dueDate: date})}
                        required
                        disabled
                    />
                    <p>Projektlaufzeit: {projectData.projectDuration} Jahre</p>

                </DatePickerWrapper>
                <Label>Beschreibung</Label>
                <TextArea
                    name="description"
                    rows="5"
                    value={projectData.description}
                    onChange={handleInputChange}
                    required
                />

                <Label>Kundenpriorität</Label>
                <PriorityContainer>
                    <PriorityInput
                        type="range"
                        min="1"
                        max="4"
                        name="financialImportance"
                        value={projectData.financialImportance}
                        onChange={handleInputChange}
                    />
                    <PriorityValue>{projectData.financialImportance}</PriorityValue>
                </PriorityContainer>

                <Label>Erwarteter Gesamtgewinn (in Euro)</Label>
                <InputContainer>
                    <InputWithPriorityValue
                        type="number"
                        min="0"
                        name="resourceRequirements"
                        value={projectData.resourceRequirements}
                        onChange={handleInputChange}
                    />
                    <PriorityValue>{calculateExpectedProfitValue(projectData.resourceRequirements)}</PriorityValue>
                </InputContainer>

                <Label>Projektbudget (in Euro)</Label>
                <InputContainer><InputWithPriorityValue


                    type="number"
                    min="0"
                    name="technicalFeasibility"
                    value={projectData.technicalFeasibility}
                    onChange={handleInputChange}
                />
                    <PriorityValue>{calculateProjectBudgetValue(projectData.technicalFeasibility)}</PriorityValue>
                </InputContainer>
                <Label>Rentabilität</Label>
                <PriorityContainer>
                    <PriorityInput
                        type="range"
                        min="1"
                        max="4"
                        name="strategicImportance"
                        value={projectData.strategicImportance}
                        onChange={handleInputChange}
                        disabled
                    />
                    <PriorityValue>{projectData.strategicImportance}</PriorityValue>
                </PriorityContainer>
                <Label>Personalaufwand (in Personentagen)</Label>
                <InputContainer>
                    <InputWithPriorityValue
                        type="number"
                        min="0"
                        name="risksRequirements"
                        value={projectData.risksRequirements}
                        onChange={handleInputChange}
                    />
                    <PriorityValue>{calculatePersonDaysValue(projectData.risksRequirements)}</PriorityValue>
                </InputContainer>
                <StatusContainer>
                    <StatusLabel>Projektstatus</StatusLabel>
                    <StatusSwitch
                        status={projectData.status}
                        onChange={(newStatus) => setProjectData({ ...projectData, status: newStatus })}
                    />
                </StatusContainer>

                {isLoggedIn &&<Button type="submit">Speichern</Button>}
            </Form>
            <TotalPointsContainer>
                <TotalPointsLabel>Totalpunkte: {totalPoints}</TotalPointsLabel>
                <TotalPointsValue priorityColor={priorityColor}>{priorityLabel}</TotalPointsValue>
            </TotalPointsContainer>
        </CreateProjectContainer>
    );
};

export default EditProject;