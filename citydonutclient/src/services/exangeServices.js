import axios from 'axios';

export const getExchangeCurentDay = () => axios.get('https://old.bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
