import React, {useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import ProjectTable from "../components/ProjectTable";
import CreateProject from "../components/ProjectCreation";
import EditProject from "../components/ProjectEdit";
import { fetchProjects } from "../api"; //
import SearchIcon from "@material-ui/icons/Search";
import DeleteProjectConfirmation from "../components/DeleteProjectConfirmation";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import PriorityChart from "../components/Chart";
import { HashLoader } from "react-spinners";
import {Select, MenuItem, FormControl} from "@material-ui/core";
import {keyframes} from "@emotion/react";


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ProjectOverviewContainer = styled.div`
  margin: 80px auto;
  width: 50%;
  min-width: 320px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
`;

const ProjectOverviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  color: #333;
  padding: 16px;
  font-size: 18px;
`;

const Title = styled.h2`
  margin: 0;
  cursor: pointer;
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
`;

const SearchInputContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  width: 300px;  // Setzen Sie die ursprüngliche Breite
  max-width: 100%;  // Erlaubt es, auf volle Breite zu erweitern
  transition: width 0.5s ease;  // Fügt die Übergangsanimation hinzu
  margin-right: auto;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);

  &:focus-within {  // Erweitert die Breite, wenn das Feld fokussiert ist
    width: 500px;
  }
`;

const SearchIconAnimated = styled(SearchIcon)`
  color: #007bff;
  font-size: 24px;
  margin-right: 8px;
  animation: ${rotate} 2s linear infinite;
`;

const SearchIconContainer = styled.div`
  display: inline-flex;
  color: #007bff;
  font-size: 24px;
  margin-right: 8px;
  animation: ${rotate} 2s linear infinite;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  margin-left: 8px;
  width: 100%;
  transition: width 0.5s ease;  // Fügt die Übergangsanimation hinzu

  &:focus {  // Ändert die Farbe, wenn das Feld fokussiert ist
    border-color: #007bff;
  }
`;

const PlusIcon = styled.span`
  font-size: 60px;
  color: #007bff;
  cursor: pointer;
`;


const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;



const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;  
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10px 0;
  gap: 10px;
`;



const FilterLabel = styled.label`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const StyledSelect = styled(Select)`
  && {
    background-color: white;
    width: 200px;
    .MuiSelect-select {
      background-color: #f2f2f2;
      padding: 5px;
    }
    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
    .MuiSelect-icon {
      color: #333;
    }
  }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadein} 0.5s;
`;

const LoaderText = styled.h2`
  color: #fff;
  margin-left: 20px;
`;


const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #0069d9;
    box-shadow: 0px 15px 20px rgba(0, 123, 255, 0.4);
    transform: translateY(-7px);
  }
`;


const ProjectOverview = () => {
    const [showCreateProject, setShowCreateProject] = useState(false);
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [minLoadingTimeMet, setMinLoadingTimeMet] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [valueFilter, setValueFilter] = useState('');


    const handleCategoryFilterChange = (event) => {
        setCategoryFilter(event.target.value);
        setValueFilter('');  // reset value filter when category changes
    };

    const handleValueFilterChange = (event) => {
        setValueFilter(event.target.value);
    };
    const handleProjectClick = useCallback(
        (project) => {
            setSelectedProject(project);
        },
        []
    );


    const handleLogout = () => {
        localStorage.removeItem(process.env.REACT_APP_KEY);
        setIsLoggedIn(false);
    };

    const handleLogin = () => {
        navigate("/login");
    };
    const handleCloseEditProject = () => {
        setSelectedProject(null);
    };

    const fetchData = useCallback(async () => {
        let data = await fetchProjects();
        data = data.map(project => {
            const now = new Date();
            const dueDate = new Date(project.dueDate);
            const createdDate = new Date(project.createdAt);
            const totalDays = Math.floor((dueDate - createdDate)  / (1000 * 60 * 60 * 24));
            const remainingDays = Math.floor((dueDate - now) / (1000 * 60 * 60 * 24));
            let ratio;
            if (remainingDays <= 0) {
                ratio = 1;
            } else {
                ratio = 1 - remainingDays / totalDays;
            }
            let adjustedPriority = project.priority - 3 * ratio;
            const finalPriority = Math.max(1, adjustedPriority);
            adjustedPriority = parseFloat(finalPriority.toFixed(2));
            return {
                ...project,
                priority: adjustedPriority
            };
        });
        console.log(data);

        setProjects(data);
        setDataLoaded(true);
    }, []);

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, [fetchData]);

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_KEY)) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setMinLoadingTimeMet(true);
        }, 3000);
        return () => clearTimeout(timerId);
    }, []);

    useEffect(() => {
        if (dataLoaded && minLoadingTimeMet) {
            setLoading(false);
        }
    }, [dataLoaded, minLoadingTimeMet]);
    const handleAddProjectClick = useCallback(() => {
        setShowCreateProject(true);
    }, []);

    const handleCloseOverlay = useCallback(() => {
        setShowCreateProject(false);
    }, []);

    const handleSearchInputChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    const [projectToDelete, setProjectToDelete] = useState(null);

    const handleDeleteProjectClick = (project) => {
        setProjectToDelete(project);
    };


    const filteredProjects = useMemo(() => {
        return projects
            .filter(
                (project) =>
                    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((project) => {
                if (!categoryFilter || !valueFilter) {
                    return true;
                }

                switch (categoryFilter) {
                    case "status":
                        return project.status.toLowerCase() === valueFilter.toLowerCase();
                    case "priority":
                        if (valueFilter === "low") {
                            return project.priority >= 3;
                        } else if (valueFilter === "medium") {
                            return project.priority <= 3 && project.priority >= 2;
                        } else {
                            return project.priority > 1 && project.priority <=2;
                        }
                    case "expectedProfit":
                        if (valueFilter === "under50k") {
                            return project.resourceRequirements < 50000;
                        } else if (valueFilter === "50kTo100k") {
                            return project.resourceRequirements >= 50000 && project.resourceRequirements < 100000;
                        } else if (valueFilter === "100kTo250k") {
                            return project.resourceRequirements >= 100000 && project.resourceRequirements < 250000;
                        } else {
                            return project.resourceRequirements >= 250000;
                        }
                    case "projectBudget":
                        if (valueFilter === "under50k") {
                            return project.technicalFeasibility < 50000;
                        } else if (valueFilter === "50kTo100k") {
                            return project.technicalFeasibility >= 50000 && project.technicalFeasibility < 100000;
                        } else if (valueFilter === "100kTo250k") {
                            return project.technicalFeasibility >= 100000 && project.technicalFeasibility < 250000;
                        } else {
                            return project.technicalFeasibility >= 250000;
                        }
                    case "personnelEffort":
                        if (valueFilter === "under500") {
                            return project.risksRequirements < 500;
                        } else if (valueFilter === "500To1000") {
                            return project.risksRequirements >= 500 && project.risksRequirements < 1000;
                        } else if (valueFilter === "1000To2000") {
                            return project.risksRequirements >= 1000 && project.risksRequirements < 2000;
                        } else {
                            return project.risksRequirements >= 2000;
                        }
                    default:
                        return true;
                }
            });
    }, [projects, searchTerm, categoryFilter, valueFilter]);




    const handleProjectDelete = () => {
        fetchData();
    };

    const resetFiltersAndSearch = () => {
        setSearchTerm("");
        setCategoryFilter("");
        fetchData();
    };

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin}/>
            <ProjectOverviewContainer>
                <ProjectOverviewHeader>
                    <Title onClick={resetFiltersAndSearch}>Projektübersicht</Title>                    <Controls>
                    <SearchInputContainer>
                        <SearchIconContainer>
                            <SearchIcon />
                        </SearchIconContainer>
                        <SearchInput
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                            placeholder="Suche Projekte..."
                        />
                    </SearchInputContainer>
                        {isLoggedIn &&<PlusIcon onClick={handleAddProjectClick}>+</PlusIcon>}
                    </Controls>
                    <FilterContainer>
                    <FilterLabel>Filter:</FilterLabel>
                    <FormControl variant="outlined" size="small">
                        <Select value={categoryFilter} onChange={handleCategoryFilterChange}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="status">Status</MenuItem>
                            <MenuItem value="priority">Priorität</MenuItem>
                            <MenuItem value="expectedProfit">Erwarteter Gesamtgewinn</MenuItem>
                            <MenuItem value="projectBudget">Projektbudget</MenuItem>
                            <MenuItem value="personnelEffort">Personalaufwand</MenuItem>
                        </Select>
                    </FormControl>
                    {categoryFilter && (
                        <>
                            <FilterLabel>Wert:</FilterLabel>
                            <FormControl variant="outlined" size="small">
                                <Select value={valueFilter} onChange={handleValueFilterChange}>
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {categoryFilter === "status" && [
                                        <MenuItem key="new" value="new">Genehmigt</MenuItem>,
                                        <MenuItem key="in_progress" value="in_progress">In Bearbeitung</MenuItem>,
                                        <MenuItem key="on_hold" value="on_hold">Abgelehnt</MenuItem>
                                    ]}
                                    {categoryFilter === "priority" && [
                                        <MenuItem key="low" value="low">Niedrig</MenuItem>,
                                        <MenuItem key="medium" value="medium">Mittel</MenuItem>,
                                        <MenuItem key="high" value="high">Hoch</MenuItem>
                                    ]}
                                    {categoryFilter === "expectedProfit" && [
                                        <MenuItem key="under50k" value="under50k">weniger als 50,000</MenuItem>,
                                        <MenuItem key="50kTo100k" value="50kTo100k">zwischen 50,000 und 100,000</MenuItem>,
                                        <MenuItem key="100kTo250k" value="100kTo250k">zwischen 100,000 und 250,000</MenuItem>,
                                        <MenuItem key="over250k" value="over250k">mehr als 250,000</MenuItem>
                                    ]}
                                    {categoryFilter === "projectBudget" && [
                                        <MenuItem key="under50k" value="under50k">weniger als 50,000</MenuItem>,
                                        <MenuItem key="50kTo100k" value="50kTo100k">zwischen 50,000 und 100,000</MenuItem>,
                                        <MenuItem key="100kTo250k" value="100kTo250k">zwischen 100,000 und 250,000</MenuItem>,
                                        <MenuItem key="over250k" value="over250k">mehr als 250,000</MenuItem>
                                    ]}
                                    {categoryFilter === "personnelEffort" && [
                                        <MenuItem key="under500" value="under500">weniger als 500 Personentage</MenuItem>,
                                        <MenuItem key="500To1000" value="500To1000">zwischen 500 und 1000 Personentage</MenuItem>,
                                        <MenuItem key="1000To2000" value="1000To2000">zwischen 1000 und 2000 Personentage</MenuItem>,
                                        <MenuItem key="over2000" value="over2000">mehr als 2000 Personentage</MenuItem>
                                    ]}
                                </Select>
                            </FormControl>
                        </>

                    )}
                    </FilterContainer>
                </ProjectOverviewHeader>

                {loading ? (
                    <LoaderContainer>
                        <HashLoader color={"#123abc"} size={50} />
                        <LoaderText>Lade Daten...</LoaderText>
                    </LoaderContainer>
                ) : (
                    <>
                        <PriorityChart projects={projects} />

                        <ProjectTable projects={filteredProjects} onProjectClick={handleProjectClick} onDeleteClick={handleDeleteProjectClick} isLoggedIn={isLoggedIn} />
                    </>
                )}
            </ProjectOverviewContainer>

            {showCreateProject && (
                <OverlayContainer>
                    <CreateProject onAddProject={fetchData} onClose={handleCloseOverlay} />
                </OverlayContainer>
            )}

            {selectedProject && (
                <OverlayContainer>
                    <EditProject
                        project={selectedProject}
                        onClose={handleCloseEditProject}
                        onUpdateProject={fetchData}
                        isLoggedIn={isLoggedIn}
                    />
                </OverlayContainer>
            )}
            {projectToDelete && (
                <OverlayContainer>
                    <DeleteProjectConfirmation
                        project={projectToDelete}
                        onClose={() => setProjectToDelete(null)}
                        onProjectDelete={handleProjectDelete}
                    />
                </OverlayContainer>
                )}
        </div>
    );
};

export default React.memo(ProjectOverview);