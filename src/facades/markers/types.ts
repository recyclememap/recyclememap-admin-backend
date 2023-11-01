import { MakePartial } from '@root/commons/types';

export enum WasteTypes {
  Packing = 'packing',
  Plastic = 'plastic',
  Batteries = 'batteries',
  Carton = 'carton',
  Clothes = 'clothes',
  Paper = 'paper',
  Glass = 'glass'
}

export enum MarkerProperties {
  position = 'position',
  wasteTypes = 'wasteTypes',
  address = 'address'
}

export type SuggestedMarker = {
  id: string;
  position: {
    suggestedValue: number[][];
    approvedValue: number[];
  };
  wasteTypes: {
    suggestedValue: WasteTypes[][];
    approvedValue: WasteTypes[];
  };
  address: {
    suggestedValue: string[];
    approvedValue: string;
  };
  date: string;
};

export type SuggestedMarkersList = SuggestedMarker[];

type PropertyType<S, A> = {
  suggestedValue: S;
  approvedValue: A;
};

export type PositionType = PropertyType<number[][], number[] | []>;
export type WateTypesType = PropertyType<WasteTypes[][], WasteTypes[]>;
export type AddressType = PropertyType<string[], string>;

export type ApprovedMarker = MakePartial<{
  [MarkerProperties.position]: PositionType;
  [MarkerProperties.wasteTypes]: WateTypesType;
  [MarkerProperties.address]: AddressType;
}>;
