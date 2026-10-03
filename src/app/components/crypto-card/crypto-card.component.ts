import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Crypto } from '../../models/crypto.model';

@Component({
  selector: 'app-crypto-card',
  imports: [],
  templateUrl: './crypto-card.component.html',
  styleUrl: './crypto-card.component.scss'
})
export class CryptoCardComponent {

  @Input({ required: true })
  crypto!: Crypto;

  @Output()
  cryptoSelected = new EventEmitter<Crypto>();

  selectCrypto(): void {
    this.cryptoSelected.emit(this.crypto);
  }
}