import {
  AddressType,
  PositionType,
  WasteTypes,
  WateTypesType
} from '@root/facades/markers/types';
import { ApiError } from '@root/utils/errors';

const isContainOnlyNumbers = (arr: any[]) => {
  return arr.every((element) => {
    return typeof element === 'number';
  });
};

const checkPositionProperty = (propertyValue: any[]) => {
  const COORDINATES_LENGTH = 2;

  if (
    propertyValue.length !== COORDINATES_LENGTH ||
    !isContainOnlyNumbers(propertyValue)
  ) {
    throw ApiError.BadRequest(
      'The position property must have the correct type.'
    );
  }
};

const checkWasteTypesProperty = (propertyValue: any[]) => {
  if (
    !Array.isArray(propertyValue) ||
    (propertyValue.length &&
      !propertyValue.every((value) =>
        Object.values(WasteTypes).includes(value)
      ))
  ) {
    throw ApiError.BadRequest(
      'The wasteTypes property must have the correct type.'
    );
  }
};

const checkAddressProperty = (propertyValue: any[]) => {
  if (
    propertyValue.length &&
    !propertyValue.every((value) => typeof value === 'string')
  ) {
    throw ApiError.BadRequest(
      'The address property must have the correct type.'
    );
  }
};

export const updateMarkerSchema = {
  position: {
    custom: {
      options: (position: PositionType) => {
        if (
          !Array.isArray(position.approvedValue) ||
          !Array.isArray(position.suggestedValue)
        ) {
          throw ApiError.BadRequest(
            `The position property must have the correct type.`
          );
        }

        if (position.approvedValue.length > 0) {
          checkPositionProperty(position.approvedValue);
        }

        if (position.suggestedValue.length > 0) {
          position.suggestedValue.forEach((suggestedValue: number[]) => {
            checkPositionProperty(suggestedValue);
          });
        }

        return true;
      }
    }
  },
  wasteTypes: {
    custom: {
      options: (wasteTypes: WateTypesType) => {
        if (
          !Array.isArray(wasteTypes.approvedValue) ||
          !Array.isArray(wasteTypes.suggestedValue)
        ) {
          throw ApiError.BadRequest(
            `The wasteTypes property must have the correct type.`
          );
        }

        if (wasteTypes.approvedValue.length > 0) {
          checkWasteTypesProperty(wasteTypes.approvedValue);
        }

        if (wasteTypes.suggestedValue.length > 0) {
          wasteTypes.suggestedValue.forEach((suggestedValue: WasteTypes[]) => {
            checkWasteTypesProperty(suggestedValue);
          });
        }

        return true;
      }
    }
  },
  address: {
    custom: {
      options: (address: AddressType) => {
        if (
          typeof address.approvedValue !== 'string' ||
          !Array.isArray(address.suggestedValue)
        ) {
          throw ApiError.BadRequest(
            `The address property must have the correct type.`
          );
        }

        if (address.suggestedValue.length > 0) {
          checkAddressProperty(address.suggestedValue);
        }

        return true;
      }
    }
  }
};
