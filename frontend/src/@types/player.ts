export interface PlayerType {
  _id: string;
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
