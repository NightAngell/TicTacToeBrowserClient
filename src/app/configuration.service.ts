import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private _serverAddressBase: string = "http://localhost:62773";


    /**
     * Getter serverAddressBase
     * @return {string }
     */
	public get serverAddressBase(): string  {
		return this._serverAddressBase;
	}

}
