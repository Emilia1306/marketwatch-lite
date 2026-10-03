import {
  Component,
  OnInit,
  OnDestroy,
  inject
} from '@angular/core';

// importar service
import { CryptoService } from './services/crypto.service';

// importar modelo
import { Crypto } from './models/crypto.model';

// importar componentes
import { CryptoCardComponent } from './components/crypto-card/crypto-card.component';
import { CryptoDetailComponent } from './components/crypto-detail/crypto-detail.component';

@Component({
  selector: 'app-root',
  imports: [
    CryptoCardComponent,
    CryptoDetailComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {

  // servicio para obtener los datos de CoinGecko
  private readonly cryptoService =
    inject(CryptoService);

  // intervalo para actualizar los datos
  private refreshInterval?: ReturnType<typeof setInterval>;

  // listas de criptomonedas
  cryptos: Crypto[] = [];
  filteredCryptos: Crypto[] = [];

  // texto ingresado en el buscador
  searchTerm = '';

  // estado de carga
  loading = false;

  // mensaje de error
  errorMessage = '';

  // cripto seleccionada para mostrar detalle
  selectedCrypto: Crypto | null = null;

  // cargar datos al iniciar
  ngOnInit(): void {
    this.loadCryptos();

    // actualizar los datos cada 60 segundos
    this.refreshInterval = setInterval(() => {
      this.loadCryptos(false);
    }, 60000);
  }

  // obtener las criptos desde el servicio
  loadCryptos(showLoading = true): void {

    if (showLoading) {
      this.loading = true;
    }

    this.errorMessage = '';

    this.cryptoService
      .getCryptos()
      .subscribe({

        next: (data) => {

          this.cryptos = data;

          // mantener el filtro actual después de actualizar
          this.filterCryptos();

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

  // filtrar por nombre o símbolo
  filterCryptos(): void {

    const term =
      this.searchTerm
        .toLowerCase()
        .trim();

    this.filteredCryptos =
      this.cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(term) ||
        crypto.symbol.toLowerCase().includes(term)
      );
  }

  // abrir detalle de una cripto
  selectCrypto(crypto: Crypto): void {
    this.selectedCrypto = crypto;
  }

  // cerrar detalle
  closeDetail(): void {
    this.selectedCrypto = null;
  }

  // limpiar el intervalo al destruir el componente
  ngOnDestroy(): void {

    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

  }
}