import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Crypto } from '../../models/crypto.model';

@Component({
  selector: 'app-crypto-detail',
  imports: [],
  templateUrl: './crypto-detail.component.html',
  styleUrl: './crypto-detail.component.scss'
})
export class CryptoDetailComponent {

  @Input({ required: true })
  crypto!: Crypto;

  @Output()
  close = new EventEmitter<void>();

  closeDetail(): void {
    this.close.emit();
  }
}