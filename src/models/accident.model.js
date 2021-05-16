import mongoose from 'mongoose';

const schema = mongoose.Schema({
  ACCIDENT_ID: String,
  LOCATE_ID_DISTRICT: String,
  LOCATE_ID_POLICE: String,
  ACCIDENT_MONTH: Number,
  ACCIDENT_YEAR: Number,
  ACCIDENT_COST: Number,
  HUMAN_ADMIT: Number,
  HUMAN_DEAD: Number,
  ROADTYPE_ID: String,
  ROADSKIN_ID: String,
  ACDPOINT_ID: String,
  ATMOSPHERE_ID: String,
  LIGHT_ID: String,
  GIS_E: Number,
  GIS_N: Number,
  GIS_LAT: Number,
  GIS_LNG: Number,
  PERSON_GENDER: String,
  PERSON_AGE: Number,
  PERSON_TYPE: String,
  PERSON_STATE: String,
  LOCATE_PROVINCE: String,
  LOCATE_DOMICILE: String,
  LOCATE_AREATYPE: String,
  HEALTH_DEADPLACE: String,
  HEALTH_EMSSEND: Number,
});

export default mongoose.model('accidents', schema);
