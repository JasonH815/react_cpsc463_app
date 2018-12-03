import axios from 'axios';
import config from '../config';

class ApiService {

  static services = config.api.services;

  static getBase() {
    const {proto, host, basePath} = config.api;
    return `${proto}://${host}${basePath}`;
  }

  static getService(service){
    return ApiService.getBase() + service;
  }


  static players() {
    return ApiService.getService(ApiService.services.players);
  }
  static cards() {
    return ApiService.getService(ApiService.services.cards);
  }
  static decks() {
    return ApiService.getService(ApiService.services.decks);
  }
  static games() {
    return ApiService.getService(ApiService.services.games);
  }

  static getData(resp){ return resp.data; }

  static post(url, data) {
    return axios.post(url, data).then(ApiService.getData);
  }

  static get(url) {
    return axios.get(url).then(ApiService.getData);
  }

  static delete(url){
    return axios.delete(url).then(ApiService.getData);
  }

}

export default ApiService;
