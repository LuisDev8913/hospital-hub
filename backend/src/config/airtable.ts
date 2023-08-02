import axios from 'axios';
import 'dotenv';
import { AIRTABLE_BASE_ID, AIRTABLE_API_KEY } from '.';
import { stringify } from 'qs';

const airtableApi = axios.create({
  baseURL: 'https://api.airtable.com/v0/' + AIRTABLE_BASE_ID,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`
  },
  paramsSerializer: {
    serialize: (params) => stringify(params, { arrayFormat: 'brackets' })
  }
});

export default airtableApi;
