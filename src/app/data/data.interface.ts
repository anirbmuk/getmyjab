export interface IData {
  center_id: number;
  name: string;
  pincode: number;
  fee_type?: string;
  sessions: ISession[];
  filteredsessions?: ISession[];
  vaccine_fees?: IVaccine[];
}

export interface ISession {
  session_id: string;
  date: string;
  available_capacity: number;
  available_capacity_dose1: number;
  available_capacity_dose2: number;
  min_age_limit: number;
  vaccine?: string;
  slots?: string[];
  fee?: number;
}

export interface IVaccine {
  vaccine: string;
  fee: string;
}

export type FeeType = 'All' | 'Free' | 'Paid';

export type DoseType = 'first' | 'second';
