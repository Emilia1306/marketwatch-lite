import { Component, OnInit, OnDestroy, inject} from '@angular/core';

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

  // servicio
  private readonly cryptoService =
    inject(CryptoService);

  // intervalo para actualizar los datos
  private refreshInterval?: ReturnType<typeof setInterval>;

  // listas
  cryptos: Crypto[] = [];
  filteredCryptos: Crypto[] = [];

  // favoritos guardados
  favorites: string[] = [];

  // texto ingresado en el buscador
  searchTerm = '';

  // mostrar solo favoritos
  showOnlyFavorites = false;

  // estado de carga
  loading = false;

  // mensaje de error
  errorMessage = '';

  // cripto seleccionada para mostrar detalle
  selectedCrypto: Crypto | null = null;

  // cargar datos al iniciar
  ngOnInit(): void {

    this.loadFavorites();
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

          // mantener filtros después de actualizar
          this.applyFilters();

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

  // aplicar búsqueda y favoritos
  applyFilters(): void {

    const term =
      this.searchTerm
        .toLowerCase()
        .trim();

    this.filteredCryptos =
      this.cryptos.filter((crypto) => {

        const matchesSearch =
          crypto.name.toLowerCase().includes(term) ||
          crypto.symbol.toLowerCase().includes(term);

        const matchesFavorite =
          !this.showOnlyFavorites ||
          this.favorites.includes(crypto.id);

        return matchesSearch && matchesFavorite;
      });
  }

  // filtrar por nombre o símbolo
  filterCryptos(): void {
    this.applyFilters();
  }

  // cargar favoritos guardados
  loadFavorites(): void {

    const storedFavorites =
      localStorage.getItem('cryptoFavorites');

    if (storedFavorites) {
      this.favorites =
        JSON.parse(storedFavorites);
    }
  }

  // agregar o quitar favorito
  toggleFavorite(cryptoId: string): void {

    if (this.favorites.includes(cryptoId)) {

      this.favorites =
        this.favorites.filter(
          id => id !== cryptoId
        );

    } else {

      this.favorites.push(cryptoId);

    }

    localStorage.setItem(
      'cryptoFavorites',
      JSON.stringify(this.favorites)
    );

    this.applyFilters();
  }

  // verificar si una cripto es favorita
  isFavorite(cryptoId: string): boolean {
    return this.favorites.includes(cryptoId);
  }

  // alternar filtro de favoritos
  toggleFavoritesFilter(): void {

    this.showOnlyFavorites =
      !this.showOnlyFavorites;

    this.applyFilters();
  }

  // abrir detalle de una cripto
  selectCrypto(crypto: Crypto): void {
    this.selectedCrypto = crypto;
  }

  // cerrar detalle
  closeDetail(): void {
    this.selectedCrypto = null;
  }

  ngOnDestroy(): void {

    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

  }
}