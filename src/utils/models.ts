export enum OrderStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface Order {
  id: string;
  account_id: string;
  amount: string;
  credit_card_name: string;
  credit_card_number: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}
