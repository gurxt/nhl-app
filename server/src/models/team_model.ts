import { Model, ObjectId, Schema, model, models } from 'mongoose';

export interface TeamDocument {
  _id: ObjectId;
  teamId: string;
  name: string;
  abbreviation: string;
  color: string;
  altColor: string;
  logos: {
    href: string;
    width: number;
    height: number;
  }[];
  // TODO - maybe add team links.
}

const TeamSchema = new Schema<TeamDocument>(
  {
    teamId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    abbreviation: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    altColor: {
      type: String,
      required: false,
    },
    logos: [
      {
        href: {
          type: String,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        height: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Team = models.Team || model('Team', TeamSchema);
export default Team as Model<TeamDocument>;
