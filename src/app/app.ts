import {Component, OnInit, inject} from '@angular/core';
//importar service
import { CryptoService } from './services/crypto.service';
//importar modelo
import { Crypto } from './models/crypto.model';
//importar componente card
import { CryptoCardComponent } from './components/crypto-card/crypto-card.component'

@Component({
  selector: 'app-root',
  imports: [
    CryptoCardComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  // servicio para obtener los datos de CoinGecko
  private readonly cryptoService =
    inject(CryptoService);

  // lista de criptomonedas
  cryptos: Crypto[] = [];
  filteredCryptos: Crypto[] = []

  // texto ingresado en el buscador
  searchTerm = '';

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
          this.filteredCryptos = data
          this.loading = false;
        },

        error: (error) => {

          console.error(
            'Error loading cryptos:',
            error
          );

          this.errorMessage =
            'No se pudieron cargar los activos';

          this.loading = false;
        }

      });
  }
  filterCryptos(): void {
    const term = this.searchTerm.toLowerCase().trim()

    this.filteredCryptos = this.cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(term) ||
      crypto.symbol.toLowerCase().includes(term)
    )
  }
}