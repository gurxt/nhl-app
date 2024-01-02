import { Model, ObjectId, Schema, model, models } from 'mongoose';

export interface PlayerDocument {
  _id: ObjectId;
  teamId: string;
  firstName: string;
  lastName: string;
  shortName: string;
  weight: number;
  height: number;
  age: number;
  draft: {
    year: number;
    round: number;
    selection: number;
  };
  birthPlace: {
    city: string;
    state?: string;
    country: string;
  };
  headshot: string;
  shoots?: string;
  position: {
    name: string;
    abbreviation: string;
  };
  jerseyNumber: number;
  experience: number;
  active: boolean;
}

export const PlayerSchema = new Schema<PlayerDocument>({
  teamId: {
    type: String,
    required: true,
    ref: 'Team',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  draft: {
    type: new Schema({
      round: {
        type: Number,
      },
      year: {
        type: Number,
      },
      selection: {
        type: Number,
      },
    }),
    required: true,
  },
  birthPlace: {
    type: new Schema({
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
    }),
    required: true,
  },
  headshot: {
    type: String,
  },
  shoots: {
    type: String,
  },
  position: {
    type: new Schema({
      name: {
        type: String,
        required: true,
      },
      abbreviation: {
        type: String,
        required: true,
      },
    }),
    required: true,
  },
  jerseyNumber: {
    type: Number,
  },
  experience: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

const Player = models.Player || model('Player', PlayerSchema);

export default Player as Model<PlayerDocument>;
