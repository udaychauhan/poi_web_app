import axios, { AxiosResponse } from "axios";

const BASE_URL = `https://mire-empty-furniture.glitch.me/`;

export const getHourlyEvents = async () : Promise<AxiosResponse> => {
    const url = BASE_URL + "/events/hourly";
    return axios.get(url);
}

export const getDailyEvents = async () : Promise<AxiosResponse> => {
    const url = BASE_URL + "/events/daily";
    return axios.get(url);
}

export const getHourlyStats = async (poiId?:string, date?:string) : Promise<AxiosResponse> => {
    let url = BASE_URL + "/stats/hourly";
    if(poiId && date){
        url = url + `?poiId=${poiId}&date=${date}`;
    }
    return axios.get(url);
}

export const getDailyStats = async () : Promise<AxiosResponse> => {
    const url = BASE_URL + "/stats/daily";
    return axios.get(url);
}

export const getPOI = async () : Promise<AxiosResponse> => {
    const url = BASE_URL + "/poi";
    return axios.get(url);
}