import React from "react";
import Chart from "react-google-charts";

export interface IStatLineChart {
    columns: string[];
    data: any[];
    title: string;
    vAxisTitle: string;
}

const StatLineChart:React.FC<IStatLineChart> = ({ columns, data, title, vAxisTitle }) => {
    const lineChartData = [columns,...data];
    const chartOptions = {
        title,
        curveType: "function",
        legend: "none",
        hAxis: { title:"hour" },
        vAxis: { title: vAxisTitle }
    }
    return (
         <Chart 
            chartType="LineChart"
            data={lineChartData}
            options = {chartOptions}
            width={"600px"}
            height={"600px"}
        />
    );
}

export default StatLineChart;