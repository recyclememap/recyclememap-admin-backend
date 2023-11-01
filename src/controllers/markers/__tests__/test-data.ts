import { WasteTypes } from '@root/facades/markers/types';

export const MOCK_DB_MARKERS = [
  {
    id: 'testId',
    position: {
      suggestedValue: [[123, 456]],
      approvedValue: []
    },
    wasteTypes: {
      suggestedValue: [[WasteTypes.Batteries, WasteTypes.Carton]],
      approvedValue: []
    },
    address: {
      suggestedValue: ['suggestedAddress'],
      approvedValue: ''
    },
    date: '2023-07-15T21:37:05.406Z'
  },
  {
    id: 'testId2',
    position: {
      suggestedValue: [],
      approvedValue: [1.4, 0.1]
    },
    wasteTypes: {
      suggestedValue: [
        [WasteTypes.Batteries, WasteTypes.Carton],
        [WasteTypes.Packing]
      ],
      approvedValue: [WasteTypes.Carton]
    },
    address: {
      suggestedValue: ['suggestedAddress'],
      approvedValue: 'approvedAddress'
    },
    date: '2023-08-15T21:37:05.406Z'
  },
  {
    id: 'testId3',
    position: {
      suggestedValue: [],
      approvedValue: [1.4, 2.3]
    },
    wasteTypes: {
      suggestedValue: [],
      approvedValue: [WasteTypes.Batteries]
    },
    address: {
      suggestedValue: [],
      approvedValue: 'approvedAddress'
    },
    date: '2023-09-15T21:37:05.406Z'
  }
];

export const MOCK_APPROVED_DB_MARKERS = [
  {
    id: 'testId',
    position: {
      suggestedValue: [],
      approvedValue: [1.4, 2.3]
    },
    wasteTypes: {
      suggestedValue: [],
      approvedValue: [WasteTypes.Batteries]
    },
    address: {
      suggestedValue: [],
      approvedValue: 'approvedAddress'
    },
    date: '2023-07-15T21:37:05.406Z'
  }
];

export const MOCK_SUGGESTED_MARKERS_RESPONSE = [
  {
    id: 'testId',
    position: {
      suggestedValue: [[123, 456]],
      approvedValue: []
    },
    wasteTypes: {
      suggestedValue: [[WasteTypes.Batteries, WasteTypes.Carton]],
      approvedValue: []
    },
    address: {
      suggestedValue: ['suggestedAddress'],
      approvedValue: ''
    },
    date: '2023-07-15T21:37:05.406Z'
  },
  {
    id: 'testId2',
    position: {
      suggestedValue: [],
      approvedValue: [1.4, 0.1]
    },
    wasteTypes: {
      suggestedValue: [
        [WasteTypes.Batteries, WasteTypes.Carton],
        [WasteTypes.Packing]
      ],
      approvedValue: [WasteTypes.Carton]
    },
    address: {
      suggestedValue: ['suggestedAddress'],
      approvedValue: 'approvedAddress'
    },
    date: '2023-08-15T21:37:05.406Z'
  }
];

export const MOCK_APPROVED_MARKER = {
  position: {
    suggestedValue: [],
    approvedValue: [123, 456]
  },
  wasteTypes: {
    suggestedValue: [],
    approvedValue: [WasteTypes.Batteries, WasteTypes.Carton]
  },
  address: {
    suggestedValue: [],
    approvedValue: 'suggestedAddress'
  }
};

export const MARKERS_DB_NAME = 'Markers';
