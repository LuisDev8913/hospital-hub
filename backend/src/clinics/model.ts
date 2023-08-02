import airtableApi from '../config/airtable';
import { Clinic } from './schema';
import ENV from '../config';

interface ClinicResponse {
  records: Clinic[];
}

const wrapWithAnd = (condition: boolean, str: string) => (condition ? `AND(${str})` : str);

export const findClinics = async (service?: string | string[], location?: string) => {
  const filterByFormula = wrapWithAnd(
    !!(service || location),
    [
      service &&
        wrapWithAnd(
          Array.isArray(service) && service.length > 1,
          ([] as string[])
            .concat(service)
            .map((s) => `FIND('${s}', ARRAYJOIN({Service Tvpe},',')) > 0`)
            .join(',')
        ),

      location && `SEARCH(LOWER('${location}'), LOWER({Address})) > 0`
    ]
      .filter(Boolean)
      .join(',')
  );

  const res = await airtableApi.get<ClinicResponse>(`/${ENV.AIRTABLE_CLINICS_TABLE}`, {
    params: { filterByFormula }
  });

  return res.data?.records;
};
