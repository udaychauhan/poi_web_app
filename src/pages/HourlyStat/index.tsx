import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HourlyStatChartView from "../../components/HourlyStatChartView/HourlyStatChartView";
import HourlyStatTable, { IHourlyStatData } from "../../components/Table/HourlyStatTable";


const HourlyStat:React.FC = () => {
    return (
        <Flex
            direction="column"
            minW={{ xl: "1200px" }}
            marginBottom="10px"
            marginTop={"40px"}
            minH="100vh"
        >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, lg: 8 }}>
                <HourlyStatChartView/>
                <HourlyStatChartView/>
           </SimpleGrid>
        </Flex>
    )
}

export default HourlyStat;