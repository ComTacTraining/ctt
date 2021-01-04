// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Category = {
  "COMMERCIALLEGACY": "COMMERCIALLEGACY",
  "COMMERCIALMODERN": "COMMERCIALMODERN",
  "INDUSTRIALLEGACY": "INDUSTRIALLEGACY",
  "INDUSTRIALMODERN": "INDUSTRIALMODERN",
  "MULTIFAMILYLEGACY": "MULTIFAMILYLEGACY",
  "MULTIFAMILYMODERN": "MULTIFAMILYMODERN",
  "SINGLEFAMILYLEGACY": "SINGLEFAMILYLEGACY",
  "SINGLEFAMILYMODERN": "SINGLEFAMILYMODERN"
};

const Construction = {
  "LEGACY": "LEGACY",
  "MODERN": "MODERN",
  "BLOCK": "BLOCK",
  "METALCLAD": "METALCLAD",
  "ORDINARY": "ORDINARY",
  "WOODFRAME": "WOODFRAME",
  "CONCRETETILTUP": "CONCRETETILTUP",
  "CONVENTIONAL": "CONVENTIONAL",
  "LIGHTWEIGHT": "LIGHTWEIGHT"
};

const Size = {
  "SMALL": "SMALL",
  "MEDIUM": "MEDIUM",
  "LARGE": "LARGE",
  "EXTRALARGE": "EXTRALARGE"
};

const Location = {
  "ALPHA": "ALPHA",
  "BRAVO": "BRAVO",
  "CHARLIE": "CHARLIE",
  "DELTA": "DELTA",
  "ROOF": "ROOF",
  "FULLYINVOLVED": "FULLYINVOLVED"
};

const Survivability = {
  "POSITIVE": "POSITIVE",
  "NEGATIVE": "NEGATIVE",
  "MARGINAL": "MARGINAL"
};

const Flow = {
  "UNIDIRECTIONAL": "UNIDIRECTIONAL",
  "BIDIRECTIONAL": "BIDIRECTIONAL"
};

const Fire = {
  "ROOMCONTENTS": "ROOMCONTENTS",
  "STRUCTURE": "STRUCTURE"
};

const Smoke = {
  "GRAYLAMINAR": "GRAYLAMINAR",
  "GRAYTURBULENT": "GRAYTURBULENT",
  "BROWNLAMINARR": "BROWNLAMINARR",
  "BROWNTURBULENT": "BROWNTURBULENT",
  "BLACKLAMINAR": "BLACKLAMINAR",
  "BLACKTURBULENT": "BLACKTURBULENT"
};

const IcsNims = {
  "COMMAND": "COMMAND",
  "WATER": "WATER",
  "FIREATTACK": "FIREATTACK",
  "VENTILATION": "VENTILATION",
  "EXPOSURE": "EXPOSURE",
  "RIC": "RIC",
  "MEDICAL": "MEDICAL"
};

const { Evolution, Incident, Stripe, Profile, Review, Comment } = initSchema(schema);

export {
  Evolution,
  Incident,
  Stripe,
  Profile,
  Review,
  Comment,
  Category,
  Construction,
  Size,
  Location,
  Survivability,
  Flow,
  Fire,
  Smoke,
  IcsNims
};