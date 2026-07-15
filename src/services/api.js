// src/services/api.js
import axios from 'axios';
import { ENV } from './apiConfig';

// Instância para o seu Back-end principal (NXD)
export const apiNxd = axios.create({
  baseURL: ENV.NXD_API,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Instância para o Auctoritas
export const apiAuctoritas = axios.create({
  baseURL: ENV.AUCTORITAS_API,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});