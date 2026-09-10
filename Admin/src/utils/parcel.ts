
export enum ParcelStatus {
  CREATED = 'CREATED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface Parcel {


  // SENDER DETAILS
  
  senderName: string; // nullable = false
  senderEmail: string; // nullable = false
  senderAddress: string; // nullable = false
  senderId: number; // nullable = false (Mapped from Long in Java)
  note?:string;
  trackingNumber:string;
  // RECEIVER DETAILS
  receiverEmail: string; // nullable = false
  recieverName: string; // nullable = false
  recieverAddress: string; // nullable = false

  // PARCEL DETAILS
  cost: number; // nullable = false (Mapped from double in Java)
  weight: number; // nullable = false (Mapped from double in Java)
  dimensions: string; // nullable = false

  // STATUS
  status: ParcelStatus; // Enum, defaults to CREATED

  // TIMESTAMPS (OPTIONAL FOR CREATION REQUESTS)
  // In API responses, these will usually be ISO-8601 string dates.
  createdAt?: string; // @CreationTimestamp -> Optional
  updatedAt?: string; // @UpdateTimestamp -> Optional
}

// Your Custom Dashboard Type
/** * Represents the specific data structure used by the 
 * All Parcels table view.
 */
export type ParcelDashboardRow = {
  // Identification
  trackingNumber: string;
  
  // Locations
  senderAddress: string;
  recieverAddress: string;
  

  
  // Details
  cost: number;
  status:string;
  

 
};

export interface ParcelPageResponse {
  parcels: ParcelDashboardRow[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface DeleteResponse {
  message: string;
  success: boolean;
}