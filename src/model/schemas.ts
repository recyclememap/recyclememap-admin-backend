import mongoose from 'mongoose';

const markersSchema = new mongoose.Schema({
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

export const MarkersDB = mongoose.model('Markers', markersSchema);
