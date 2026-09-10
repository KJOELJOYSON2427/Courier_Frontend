import { Parcel } from "./parcel";

export type ParcelCreateRequest = Omit<
  Parcel, 
  'trackingNumber'  | 'updatedAt' | 'status'|'note'
>;