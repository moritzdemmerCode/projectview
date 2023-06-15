import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Radio, RadioGroup, FormControlLabel, FormControl, Collapse } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from 'styled-components';
import {Button} from "@mui/material";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ChartHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartOptions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriorityChart = ({ projects, filterType = "priority" }) => {
    const priorities = ['Low', 'Medium', 'High'];
    const status = ['new', 'in_progress', 'on_hold'];

    const [showChart, setShowChart] = useState(false);
    const [filter, setFilter] = useState(filterType);

    const data = filter === 'priority' ? ['High', 'Medium', 'Low'] : status;
    const colors = {
        High: '#FF0000', // rot
        Medium: '#FFA500', // orange
        Low: '#008000', // grün
        new: '#008000', // grün
        in_progress: '#FFA500', // orange
        on_hold: '#FF0000', // rot
    };


    const translatePriority = (priority) => {
        if (priority >= 1 && priority < 2) {
            return 'High';
        } else if (priority >= 2 && priority < 3) {
            return 'Medium';
        } else if (priority >= 3 && priority <= 4) {
            return 'Low';
        } else {
            return 'Undefined';
        }
    }

    const translateStatus = (status) => {
        switch(status){
            case 'new': return 'Genehmigt';
            case 'in_progress': return 'In Bearbeitung';
            case 'on_hold': return 'Abgelehnt';
            default: return status;
        }
    }

    const chartData = data.map((item, index) => ({
        name: translateStatus(item),
        value: projects.filter((project) =>
            filter === 'priority'
                ? translatePriority(project[filter]) === item
                : project[filter] === item
        ).length,
        color: colors[item],
    }));

    return (
        <div style={{ marginBottom: "0px" }}>
            <ChartHeader>
                <Button onClick={() => setShowChart(!showChart)}>
                    {showChart ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Button>
            </ChartHeader>
            <Collapse in={showChart}>
                <ChartWrapper>
                    <div>Zusammenfassung</div>
                    <ChartOptions>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="chartType" name="chartType" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <FormControlLabel value="priority" control={<Radio />} label="Priorität" />
                                <FormControlLabel value="status" control={<Radio />} label="Status" />
                            </RadioGroup>
                        </FormControl>
                    </ChartOptions>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie dataKey="value" isAnimationActive={false} data={chartData} outerRadius={80} fill="#8884d8" label>
                                {
                                    chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                                }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartWrapper>
            </Collapse>
        </div>
    );
};

export default PriorityChart;
