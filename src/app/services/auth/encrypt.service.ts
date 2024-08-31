import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  key:string = "key_data_123";

  constructor() { }
  public encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }
  public decrypt(txtToDecrypt: string) {
    if((txtToDecrypt !== null) && (txtToDecrypt !== undefined)){
      return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
    }
  }
}
