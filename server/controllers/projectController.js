const Projects = require("../models/projectModel");

module.exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Projects.find({});
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen der Projekte." });
    }
};

module.exports.createProject = async (req, res, next) => {
    const { projectData } = req.body;
    const {id, name, description, location, dueDate, projectDuration, strategicImportance, financialImportance, resourceRequirements, technicalFeasibility, risksRequirements, priority, employee, status} =  projectData;
    try {
        const project = await Projects.create({
            id: id,
            name: name,
            description: description,
            location: location,
            dueDate: dueDate,
            projectDuration: projectDuration,
            strategicImportance: strategicImportance,
            financialImportance: financialImportance,
            resourceRequirements: resourceRequirements,
            technicalFeasibility: technicalFeasibility,
            risksRequirements: risksRequirements,
            priority: priority,
            employee: employee,
            status: status
        });
        return res.json({ status: true, project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Fehler beim Erstellen des Projekts."});
    }
};

module.exports.updateProject = async (req, res, next) => {
    const { projectData } = req.body;
    const {
        id,
        name,
        description,
        location,
        dueDate,
        projectDuration,
        strategicImportance,
        financialImportance,
        resourceRequirements,
        technicalFeasibility,
        risksRequirements,
        priority,
        employee,
        status
    } = projectData;

    try {
        const project = await Projects.findOneAndUpdate(
            { id: id }, // Filter, um das richtige Projekt zu finden
            {
                $set: {
                    name,
                    description,
                    location,
                    dueDate,
                    projectDuration,
                    strategicImportance,
                    financialImportance,
                    resourceRequirements,
                    technicalFeasibility,
                    risksRequirements,
                    priority,
                    employee,
                    status
                },
            },
            { new: true  } // Gibt das aktualisierte Dokument zurück
        );

        if (!project) {
            return res.status(404).json({ message: "Projekt nicht gefunden." });
        }

        return res.json({ status: true, project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Fehler beim Updaten des Projekts." });
    }
};

module.exports.deleteProject = async (req, res, next) => {
    const { id } = req.params;

    try {
        const project = await Projects.findOne({ id: id });
        if (!project) {
            res.status(404).json({ message: "Projekt nicht gefunden."});
            return;
        }

        await Projects.deleteOne({ id: id });
        res.json({ status: true, message: "Projekt erfolgreich gelöscht." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Fehler beim Löschen des Projekts."});
    }
};