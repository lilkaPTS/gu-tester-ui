export class TesterDTO {

  private _name: string;
  private _email: string;
  private _device: string;
  private _mobileOperator: string;
  private _networks: string[];
  private _rating: number;
  private _requiredNumberOfTesters: number;


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get requiredNumberOfTesters(): number {
    return this._requiredNumberOfTesters;
  }

  set requiredNumberOfTesters(value: number) {
    this._requiredNumberOfTesters = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get device(): string {
    return this._device;
  }

  set device(value: string) {
    this._device = value;
  }

  get mobileOperator(): string {
    return this._mobileOperator;
  }

  set mobileOperator(value: string) {
    this._mobileOperator = value;
  }

  get networks(): string[] {
    return this._networks;
  }

  set networks(value: string[]) {
    this._networks = value;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value;
  }
}
