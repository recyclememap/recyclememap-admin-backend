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
  date: {
    type: String,
    required: true
  }
});

export const MarkersDB = model('Markers', markersSchema);
