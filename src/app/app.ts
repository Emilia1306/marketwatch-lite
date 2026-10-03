import {Component, OnInit, inject} from '@angular/core';
//importar service
import { CryptoService } from './services/crypto.service';
//importar modelo
import { Crypto } from './models/crypto.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  // servicio para obtener los datos de CoinGecko
  private readonly cryptoService =
    inject(CryptoService);

  // lista de criptomonedas
  cryptos: Crypto[] = [];

  // estado de carga
  loading = false;

  // mensaje de error
  errorMessage = '';

  // cargar datos al iniciar
  ngOnInit(): void {
    this.loadCryptos();
  }

  // obtener las criptos desde el servicio
  loadCryptos(): void {

    this.loading = true;
    this.errorMessage = '';

    this.cryptoService
      .getCryptos()
      .subscribe({

        // respuesta de la API
        next: (data) => {

          console.log(data);

          this.cryptos = data;

          this.loading = false;
        },

        error: (error) => {

          console.error(
            'Error loading cryptocurrencies:',
            error
          );

          this.errorMessage =
            'No se pudieron cargar los activos';

          this.loading = false;
        }

      });
  }
}