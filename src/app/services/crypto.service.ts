import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Crypto } from '../models/crypto.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  // Cliente HTTP para consumir la API
  private readonly http = inject(HttpClient);

  // Endpoint de mercado de CoinGecko.
  private readonly apiUrl =
    `${environment.coingeckoApiUrl}/coins/markets`;

  //Obtener lista de criptos con sus datos de mercado
  getCryptos(): Observable<Crypto[]> {

    // API key
    const headers = new HttpHeaders({
      'x-cg-demo-api-key':
        environment.coingeckoApiKey
    });

    return this.http.get<Crypto[]>(
      this.apiUrl,
      {
        headers,

        // Parametros de la consulta
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: '20',
          page: '1',
          sparkline: 'false',
          price_change_percentage: '24h'
        }
      }
    );
  }
}