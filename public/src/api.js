import axios from "axios";
import {
    createProjectRoute,
    deleteProjectRoute,
    getProjectsRoute, getUsersRoute,
    loginRoute, registerRoute,
    updateProjectRoute
} from "./utils/APIRoutes";

export async function fetchProjects() {
    try {
        const response = await axios.get(getProjectsRoute);
        return response.data;
    } catch (error) {
        console.error("Fehler beim Abrufen der Projekte:", error);
        return [];
    }
}

export async function createProject(projectData) {
    try {
        const response = await axios.post(createProjectRoute, {projectData});
        return response.data;
    } catch (error) {
        console.error('Fehler beim Erstellen des Projekts:', error);
        return null;
    }
}

export async function updateProject(projectData) {
    try {
        const response = await axios.post(updateProjectRoute, {projectData});
        return response.data;
    } catch (error) {
        console.error('Fehler beim Updaten des Projekts:', error);
        return null;
    }
}

export const deleteProject = async (id) => {
    try {
        const response = await axios.delete(deleteProjectRoute(id));
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post(loginRoute, data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const register = async (data) => {
    try {
        const response = await axios.post(registerRoute, data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export async function fetchUsers() {
    try {
        const response = await axios.get(getUsersRoute);
        return response.data;
    } catch (error) {
        console.error("Fehler beim Abrufen der Nutzer", error);
        return [];
    }
}