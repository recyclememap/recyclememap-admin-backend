import { Schema, model } from 'mongoose';

export const markersSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  position: {
    suggestedValue: {
      type: [[Number]],
      required: true
    },
    approvedValue: {
      type: [Number],
      required: true
    }
  },
  wasteTypes: {
    suggestedValue: {
      type: [[String]],
      required: true
    },
    approvedValue: {
      type: [String],
      required: true
    }
  },
  address: {
    suggestedValue: {
      type: [String],
      required: true
    },
    approvedValue: {
      type: String,
      required: false,
      default: ''
    }
  },
  date: {
    type: String,
    required: true
  }
});

export const MarkersDB = model('Markers', markersSchema);
