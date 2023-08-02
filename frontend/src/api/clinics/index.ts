import api from "..";
import { Clinic } from "./type";

interface ClinicResponse {
  isSuccess: true;
  clinics: Clinic[];
}

export const searchClinics = async (service?: string, location?: string) => {
  const res = await api.get<ClinicResponse>(`/clinics`, {
    params: { service, location },
  });

  if (res.status !== 200 || !res.data.isSuccess) throw res.data;

  return res.data;
};
