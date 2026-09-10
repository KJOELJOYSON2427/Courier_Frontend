export interface Parcel {
    select :boolean,
  from: string;
  to: string;
  trackingNumber: string;
  sendername: string;
  recipientname: string;
  cost: number;
  note: string;
}
