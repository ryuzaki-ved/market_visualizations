export interface OptionsData {
  ltp: number;
  iv: number;
  volume: number;
  oi: number;
  coi: number;
  value: number;
  deltaVolume: number;
  score: number;
}

export interface OptionsChainData {
  strike: number;
  call: OptionsData;
  put: OptionsData;
}

export interface ChartCustomization {
  showLTP: boolean;
  showIV: boolean;
  showVolume: boolean;
  showOI: boolean;
  showCOI: boolean;
  showValue: boolean;
  showDeltaVolume: boolean;
  showScore: boolean;
}