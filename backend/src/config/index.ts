import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 5000;
export const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || '';
export const AIRTABLE_CLINICS_TABLE = process.env.AIRTABLE_CLINICS_TABLE || '';
export const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || '';

export default {
  NODE_ENV,
  PORT,
  AIRTABLE_BASE_ID,
  AIRTABLE_CLINICS_TABLE,
  AIRTABLE_API_KEY
};
