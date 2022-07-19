import { Button, Select, SimpleGrid, VStack } from "@chakra-ui/react";
import moment, { unitOfTime } from "moment";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { getHourlyStats, getPOI } from "../../services/POI";
import StatLineChart from "../Charts/LineChart";

const HourlyStatChartView:React.FC = () => {
    const [pois, setPOI] = useState<IPOIDataSet>([]);
    const [selectedPOIId, setSelectedPOIId] = useState<string>("");
    const [vAxisFIeld, setVAxisField] = useState<string>("")
    const [date, selectDate] = useState<string>("")
    const [hourlyStat, setHourlyStat] = useState<any>([]);
    const fetchPOIs = async () => {
        try{
            const response = await getPOI();
            const data = response.data as IPOIDataSet;
            setPOI(data);
        }catch(e){

        }
    }
    useEffect(()=>{
        fetchPOIs();
    },[])

    const handlePOISelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPOIId(event.target.value)
    }

    const handleXAxisFieldSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setVAxisField(event.target.value)
    }

    const handleDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        selectDate(event.target.value)
    }

    const handleSubmitButton = async (event:any) => {
        if(!(date && vAxisFIeld && selectedPOIId)) {
            window.alert("Date, X Axis and POI Id is required")
            return;
        }
        try{
            const response = await getHourlyStats(selectedPOIId, date);
            const data = response.data as any;
            const chartTableData = data.map((d : any)=>[d["hour"], parseFloat(d[vAxisFIeld])]);
            setHourlyStat(chartTableData);
        }catch(e){

        }
    }

    const renderStatLineChart = () => {
        if(hourlyStat.length){
           return (
                <StatLineChart 
                    data={hourlyStat} 
                    columns={[vAxisFIeld, "hour"]} 
                    title={`Hourly Stat [ hour vs ${vAxisFIeld} ] for date ${date}`}
                    vAxisTitle={vAxisFIeld}
                />
            )
        }
        return <div>Select YAxis, POI and a date. Press Submit</div>
    }

    return (
        <VStack>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
                <POISelectDropDown 
                    handleSelect={handlePOISelect} 
                    poiDataSet={pois}
                    selectedPOIId={selectedPOIId}
                />
                <XAxisSelectDropDown 
                    handleSelect={handleXAxisFieldSelect} 
                    selectedXAxisField={vAxisFIeld}
                />
                <DateSelectDropDown 
                    handleSelect={handleDateSelect} 
                    selectedDate={date}
                />
                <Button 
                    colorScheme='blue' 
                    onClick={handleSubmitButton}>Submit</Button>
            </SimpleGrid>
            {renderStatLineChart()}
        </VStack>
    )
}
interface IPOIData {
    poi_id: string;
    name: string;
    lat: number;
    lng: number;
}

type IPOIDataSet = IPOIData[] ;

type POISelectDropDownProps = { 
    poiDataSet : IPOIDataSet,
    handleSelect : (event: React.ChangeEvent<HTMLSelectElement>) => void,
    selectedPOIId: string;
};

const POISelectDropDown:React.FC<POISelectDropDownProps> = (props) => {
    const { handleSelect, poiDataSet, selectedPOIId } = props;
    return (
        <Select placeholder="Select POI" value={selectedPOIId} onChange={handleSelect}>
            {poiDataSet.map((poiData,i) => {
                return <option value={poiData.poi_id} key={i}>{poiData.name} </option>
            })}
        </Select>
    )
}

type XAxisSelectDropDownProps = { 
    handleSelect : (event: React.ChangeEvent<HTMLSelectElement>) => void,
    selectedXAxisField: string;
};
//TODO: rename this component as Y axis select drop down
const XAxisSelectDropDown:React.FC<XAxisSelectDropDownProps> = (props) => {
    const { handleSelect, selectedXAxisField } = props;
    return (
        <Select 
            placeholder="Select Y Axis" 
            value={selectedXAxisField} 
            onChange={handleSelect}>
                {["impressions","clicks","revenue"].map((value,i) => {
                    return <option value={value} key={i}>{value} </option>
                })}
        </Select>
    )
}

type DateSelectDropDownProps = { 
    handleSelect : (event: React.ChangeEvent<HTMLSelectElement>) => void,
    selectedDate: string;
};

const DateSelectDropDown:React.FC<DateSelectDropDownProps> = (props) => {
    const { handleSelect, selectedDate } = props;
    const range = getDateRange("2017-01-01","2017-01-07","days")
    return (
        <Select 
            placeholder="Select Date" 
            value={selectedDate} 
            onChange={handleSelect}>
                {range.map((value,i) => {
                    return <option value={value} key={i}>{value} </option>
                })}
        </Select>
    )
}

const getDateRange = (startDate:string, endDate:string, type:unitOfTime.Diff):string[] => {
    let fromDate = moment(startDate)
    let toDate = moment(endDate)
    let diff = toDate.diff(fromDate, type)
    let range = []
    for (let i = 0; i < diff; i++) {
        range.push(moment(startDate).add(i, type).format("YYYY-MM-DD"))
    }
    return range
}

export default HourlyStatChartView