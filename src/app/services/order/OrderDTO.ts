export class OrderDTO {
  private _orderId: number;
  private _developerEmail: string;
  private _osName: string;
  private _requiredNumberOfTesters: number;
  private _osList: string[];
  private _deviceManufacturers: string[];
  private _devices: string[];
  private _networks: string[];
  private _mobileOperators: string[];
  private _deviceReleaseYearStart: number;
  private _deviceReleaseYearEnd: number;
  private _contactEmail: string;
  private _sourceLink: string;
  private _orderTitle: string;
  private _orderDescription: string;

  constructor() {
  }


  get orderId(): number {
    return this._orderId;
  }

  set orderId(value: number) {
    this._orderId = value;
  }

  get developerEmail(): string {
    return this._developerEmail;
  }

  set developerEmail(value: string) {
    this._developerEmail = value;
  }

  get osName(): string {
    return this._osName;
  }

  set osName(value: string) {
    this._osName = value;
  }

  get requiredNumberOfTesters(): number {
    return this._requiredNumberOfTesters;
  }

  set requiredNumberOfTesters(value: number) {
    this._requiredNumberOfTesters = value;
  }

  get osList(): string[] {
    return this._osList;
  }

  set osList(value: string[]) {
    this._osList = value;
  }

  get deviceManufacturers(): string[] {
    return this._deviceManufacturers;
  }

  set deviceManufacturers(value: string[]) {
    this._deviceManufacturers = value;
  }

  get devices(): string[] {
    return this._devices;
  }

  set devices(value: string[]) {
    this._devices = value;
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

  get deviceReleaseYearStart(): number {
    return this._deviceReleaseYearStart;
  }

  set deviceReleaseYearStart(value: number) {
    this._deviceReleaseYearStart = value;
  }

  get deviceReleaseYearEnd(): number {
    return this._deviceReleaseYearEnd;
  }

  set deviceReleaseYearEnd(value: number) {
    this._deviceReleaseYearEnd = value;
  }

  get contactEmail(): string {
    return this._contactEmail;
  }

  set contactEmail(value: string) {
    this._contactEmail = value;
  }

  get sourceLink(): string {
    return this._sourceLink;
  }

  set sourceLink(value: string) {
    this._sourceLink = value;
  }

  get orderTitle(): string {
    return this._orderTitle;
  }

  set orderTitle(value: string) {
    this._orderTitle = value;
  }

  get orderDescription(): string {
    return this._orderDescription;
  }

  set orderDescription(value: string) {
    this._orderDescription = value;
  }
}
