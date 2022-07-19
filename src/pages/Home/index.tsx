import { Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HourlyStatTable, { IHourlyStatData } from "../../components/Table/HourlyStatTable";
import { getHourlyStats } from "../../services/POI";


const Home:React.FC = () => {
    const [ hourlyStats, setHourlyStats ] = useState<IHourlyStatData[]>([]);
    const fetchDailyStats = async () => {
        try {
            const response = await getHourlyStats();
            const data = response.data as IHourlyStatData[];
            setHourlyStats(data);
        }catch(e){
    
        }
    };
    useEffect(() => { fetchDailyStats() }, [] );
    return (
        <Flex
            direction="column"
            justifyContent="center"
            minW={{ xl: "1200px" }}
            marginBottom="10px"
            minH="100vh"
        >
            <HourlyStatTable hourlyStats={hourlyStats}/>
        </Flex>
    )
}

export default Home;