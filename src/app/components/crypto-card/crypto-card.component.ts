import { Component, Input } from '@angular/core'
import { Crypto } from '../../models/crypto.model'

@Component({
  selector: 'app-crypto-card',
  imports: [],
  templateUrl: './crypto-card.component.html',
  styleUrl: './crypto-card.component.scss'
})
export class CryptoCardComponent {

  @Input({ required: true })
  crypto!: Crypto
}