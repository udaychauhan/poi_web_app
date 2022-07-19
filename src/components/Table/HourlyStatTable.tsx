import React, { useEffect, useState } from "react";

export interface IHourlyStatData {
    date: string;
    hour: number;
    impressions: number;
    clicks: number;
    revenue: string;
    poi_id : number;
    name: string;
}


 const HourlyStatTable:React.FC<{hourlyStats : Array<IHourlyStatData>}> = (data) => {
    const { hourlyStats } = data;
    if(!hourlyStats.length){
        return <div>{"Empty Data"}</div>
    }
    const headers  = Object.keys(hourlyStats[0]) ;
    const renderHeader = () => {
        return (
            <tr>
                { headers.map(header => <th>{header}</th>) }
            </tr>
        )
    }
    const renderTable = () => {
        return (
            hourlyStats.map((hourlyStat : { [key:string] : any } ) => {
                return (
                    <tbody>
                        {
                            headers.map((header)=>{
                                const value = hourlyStat[header];
                                return (<td>{value}</td>)
                            })
                        }
                    </tbody>
                )
            })
        )
    }

    return (
        <table>
            {renderHeader()}
            {renderTable()}
        </table>
    )
}

export default HourlyStatTable 