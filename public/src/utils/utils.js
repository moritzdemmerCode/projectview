export const calculatePriority = (totalPoints) => {
    let priorityColor = "#dc3545";
    let priorityLabel = "High";

    if (totalPoints > 1) {
        priorityColor = "#dc3545";
        priorityLabel = "High";
    }
    if (totalPoints > 2) {
        priorityColor = "#ffc107";
        priorityLabel = "Medium";
    }
    if (totalPoints > 3) {
        priorityColor = "#28a745";
        priorityLabel = "Low";
    }

    return { priorityColor, priorityLabel };
}
