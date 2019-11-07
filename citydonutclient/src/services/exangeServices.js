import axios from "axios";

export const getExchangeCurentDay = () => {
    return axios.get('https://old.bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
}