export const MOCK_DB_MARKERS = [
  {
    id: 'testId',
    position: {
      suggestedValue: [
        [123, 456],
        [222, 333]
      ],
      approvedValue: []
    },
    date: '2023-07-15T21:37:05.406Z'
  },
  {
    id: 'testId2',
    position: {
      suggestedValue: [[123, 456]],
      approvedValue: [1.4, 2.3]
    },
    date: '2023-08-15T21:37:05.406Z'
  },
  {
    id: 'testId3',
    position: {
      suggestedValue: [],
      approvedValue: [1.4, 2.3]
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
    date: '2023-07-15T21:37:05.406Z'
  }
];

export const MOCK_SUGGESTED_MARKERS_RESPONSE = [
  {
    id: 'testId',
    position: {
      suggestedValue: [
        [123, 456],
        [222, 333]
      ],
      approvedValue: []
    },
    date: '2023-07-15T21:37:05.406Z'
  },
  {
    id: 'testId2',
    position: {
      suggestedValue: [[123, 456]],
      approvedValue: [1.4, 2.3]
    },
    date: '2023-08-15T21:37:05.406Z'
  }
];
