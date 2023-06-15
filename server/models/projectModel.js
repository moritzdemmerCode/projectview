const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    strategicImportance: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    financialImportance: {
        type: Number,
        required: true,
        min: 1,
    },
    resourceRequirements: {
        type: Number,
        required: true,
        min: 1,
    },
    technicalFeasibility: {
        type: Number,
        required: true,
        min: 1
    },
    risksRequirements: {
        type: Number,
        required: true,
        min: 1
    },
    priority: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    projectDuration: {
        type: Number,
        required: true
    },
    employee: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model("Projects", projectSchema);
