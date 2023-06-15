import React, { useState, useEffect } from 'react';
import { createProject } from '../api';
import {register} from "../api";



const names = [
    'Tim Kieninger',
    'Kenan Uzar',
    'Samuel Haile',
    'Artem Orlov',
    'Max Mustermann',
    'Erika Musterfrau',
    'John Doe',
    'Jane Doe',
    'Tom Smith',
    'Ann Taylor',
    'Peter Parker',
    'Mary Jane',
    'Luke Skywalker',
    'Leia Organa',
    'Moritz Demmer',
    'Maja Peck',
    'Max Wiese',
    'Peter Pan',
    'Frank Maier',
    'Laura Brankrott',
    'Kenan Spieler',
    'Lust Lord',
    'Drachenlord Demmer'
];

const createEmail = (name) => {
    return name.toLowerCase().replace(' ', '.') + '@supernova.com';
};

const createAccounts = async () => {
    const hashedPassword = 'Test123456';

    for (const name of names) {
        const email = createEmail(name);
        const username = name;
        const data = {
            username,
            email,
            password: hashedPassword,
        };

        const registeredUser = await register(data);
        if (registeredUser) {
            console.log(`User ${name} registered successfully.`);
        } else {
            console.error(`Failed to register user ${name}.`);
        }
    }
};

const statuses = ['new', 'in_progress', 'on_hold'];

const generateRandomProject = (id) => {
    const getRandomName = () => names[Math.floor(Math.random() * names.length)];
    const getRandomEmployee = () => {
        const emp1 = getRandomName();
        const emp2 = getRandomName();
        const shouldAddSecondEmployee = Math.random() < 0.25;
        return emp1 === emp2 || !shouldAddSecondEmployee ? [emp1] : [emp1, emp2];
    };

    const getRandomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];

    const randomValues = Array(5).fill().map(() => 1 + Math.floor(Math.random() * 4));

    const strategicImportance = randomValues[0];
    const financialImportance = randomValues[1];
    const resourceRequirements = randomValues[2];
    const technicalFeasibility = randomValues[3];
    const risksRequirements = randomValues[4];
    const getRandomFutureDate = () => {
        const today = new Date();
        const futureDate = new Date(today.setDate(today.getDate() + Math.floor(Math.random() * 270)));
        return futureDate.toISOString();
    };

    const priority = parseFloat((strategicImportance * 0.3
        + financialImportance * 0.2
        + resourceRequirements * 0.15
        + technicalFeasibility * 0.15
        + risksRequirements * 0.1).toFixed(2));

    return {
        id,
        name: `Project ${id}`,
        employee: getRandomEmployee(),
        description: `Unique description for project ${id}`,
        dueDate: getRandomFutureDate(),
        strategicImportance,
        financialImportance,
        resourceRequirements,
        technicalFeasibility,
        risksRequirements,
        priority,
        status: getRandomStatus()
    };
};

const ProjectGenerator = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const generatedProjects = Array(50)
            .fill()
            .map((_, index) => generateRandomProject(index + 1));
        setProjects(generatedProjects);
    }, []);

    const createProjects = async () => {
        for (const project of projects) {
            const createdProject = await createProject(project);
            if (!createdProject) {
                console.error(`Failed to create project with id ${project.id}`);
            }
        }
    };

    return (
        <div>
            <div>
                <button onClick={createProjects}>Generate 50 Projects</button>
            </div>
            <div>
                <button onClick={createAccounts}>Generate Accounts</button>
            </div>
        </div>
    );
};


export default ProjectGenerator;