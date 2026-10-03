import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Crypto } from '../../models/crypto.model';

@Component({
  selector: 'app-crypto-card',
  imports: [],
  templateUrl: './crypto-card.component.html',
  styleUrl: './crypto-card.component.scss'
})
export class CryptoCardComponent {

  // datos de la cripto
  @Input({ required: true })
  crypto!: Crypto;

  // indica si está marcada como favorita
  @Input()
  isFavorite = false;

  // evento para abrir el detalle
  @Output()
  cryptoSelected =
    new EventEmitter<Crypto>();

  // evento para agregar o quitar favorito
  @Output()
  favoriteToggled =
    new EventEmitter<string>();

  // abrir detalle
  selectCrypto(): void {
    this.cryptoSelected.emit(this.crypto);
  }

  // marcar o desmarcar favorito
  toggleFavorite(event: Event): void {

    // evita abrir el detalle al presionar la estrella
    event.stopPropagation();

    this.favoriteToggled.emit(this.crypto.id);
  }
}