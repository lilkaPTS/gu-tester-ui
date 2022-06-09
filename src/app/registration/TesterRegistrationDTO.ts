import {RegistrationDTO} from "./registrationDTO";

export class TesterRegistrationDTO extends RegistrationDTO {

  private _devices: string[];
  private _os: string[];
  private _networks: string[];
  private _mobileOperators: string[]

  constructor() {
    super();
  }

  get devices(): string[] {
    return this._devices;
  }

  set devices(value: string[]) {
    this._devices = value;
  }

  get os(): string[] {
    return this._os;
  }

  set os(value: string[]) {
    this._os = value;
  }

  get networks(): string[] {
    return this._networks;
  }

  set networks(value: string[]) {
    this._networks = value;
  }

  get mobileOperators(): string[] {
    return this._mobileOperators;
  }

  set mobileOperators(value: string[]) {
    this._mobileOperators = value;
  }
}
