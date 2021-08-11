import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Category {
  COMMERCIALLEGACY = "COMMERCIALLEGACY",
  COMMERCIALMODERN = "COMMERCIALMODERN",
  INDUSTRIALLEGACY = "INDUSTRIALLEGACY",
  INDUSTRIALMODERN = "INDUSTRIALMODERN",
  MULTIFAMILYLEGACY = "MULTIFAMILYLEGACY",
  MULTIFAMILYMODERN = "MULTIFAMILYMODERN",
  SINGLEFAMILYLEGACY = "SINGLEFAMILYLEGACY",
  SINGLEFAMILYMODERN = "SINGLEFAMILYMODERN"
}

export enum Construction {
  LEGACY = "LEGACY",
  MODERN = "MODERN",
  BLOCK = "BLOCK",
  METALCLAD = "METALCLAD",
  ORDINARY = "ORDINARY",
  WOODFRAME = "WOODFRAME",
  CONCRETETILTUP = "CONCRETETILTUP",
  CONVENTIONAL = "CONVENTIONAL",
  LIGHTWEIGHT = "LIGHTWEIGHT"
}

export enum Size {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  EXTRALARGE = "EXTRALARGE"
}

export enum Location {
  ALPHA = "ALPHA",
  BRAVO = "BRAVO",
  CHARLIE = "CHARLIE",
  DELTA = "DELTA",
  ROOF = "ROOF",
  FULLYINVOLVED = "FULLYINVOLVED"
}

export enum Survivability {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
  MARGINAL = "MARGINAL"
}

export enum Flow {
  UNIDIRECTIONAL = "UNIDIRECTIONAL",
  BIDIRECTIONAL = "BIDIRECTIONAL"
}

export enum Fire {
  ROOMCONTENTS = "ROOMCONTENTS",
  STRUCTURE = "STRUCTURE"
}

export enum Smoke {
  GRAYLAMINAR = "GRAYLAMINAR",
  GRAYTURBULENT = "GRAYTURBULENT",
  BROWNLAMINAR = "BROWNLAMINAR",
  BROWNTURBULENT = "BROWNTURBULENT",
  BLACKLAMINAR = "BLACKLAMINAR",
  BLACKTURBULENT = "BLACKTURBULENT"
}

export enum IcsNims {
  COMMAND = "COMMAND",
  WATER = "WATER",
  FIREATTACK = "FIREATTACK",
  VENTILATION = "VENTILATION",
  EXPOSURE = "EXPOSURE",
  RIC = "RIC",
  MEDICAL = "MEDICAL",
  SALVAGE = "SALVAGE"
}



export declare class Review {
  readonly id: string;
  readonly autoScore?: number;
  readonly selfScore?: number;
  readonly transcript?: string;
  readonly Evolution?: Evolution;
  constructor(init: ModelInit<Review>);
  static copyOf(source: Review, mutator: (draft: MutableModel<Review>) => MutableModel<Review> | void): Review;
}

export declare class Evolution {
  readonly id: string;
  readonly number?: number;
  readonly category?: Category | keyof typeof Category;
  readonly construction?: (Construction | null)[] | keyof typeof Construction;
  readonly street?: string;
  readonly size?: Size | keyof typeof Size;
  readonly stories?: number;
  readonly occupancy?: string;
  readonly conditions?: Location | keyof typeof Location;
  readonly entryEgress?: (Location | null)[] | keyof typeof Location;
  readonly survivability?: Survivability | keyof typeof Survivability;
  readonly placement?: Location | keyof typeof Location;
  readonly side?: Location | keyof typeof Location;
  readonly flow?: Flow | keyof typeof Flow;
  readonly fire?: Fire | keyof typeof Fire;
  readonly exhaust?: Location | keyof typeof Location;
  readonly smoke?: Smoke | keyof typeof Smoke;
  readonly withstanding?: boolean;
  readonly attack?: boolean;
  readonly ventilation?: boolean;
  readonly exposure?: boolean;
  readonly ric?: boolean;
  readonly medical?: boolean;
  readonly salvage?: boolean;
  constructor(init: ModelInit<Evolution>);
  static copyOf(source: Evolution, mutator: (draft: MutableModel<Evolution>) => MutableModel<Evolution> | void): Evolution;
}

export declare class Incident {
  readonly id: string;
  readonly title: string;
  readonly icsNims: IcsNims | keyof typeof IcsNims;
  readonly command: string;
  constructor(init: ModelInit<Incident>);
  static copyOf(source: Incident, mutator: (draft: MutableModel<Incident>) => MutableModel<Incident> | void): Incident;
}