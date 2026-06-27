import { type ApiEnvelope } from '@/api/auth';

export interface StoreAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  storeAddressType?: string;
  is_default?: boolean;
}

export interface CreateStoreRequest {
  name: string;
  slug: string;
  url: string;
  description: string;
  email: string;
  whatsappUrl: string;
  themeStore?: string;
  address?: StoreAddress;
}

export interface StoreData {
  id: string;
  name: string;
  slug: string;
  url: string;
  description: string;
  email: string;
  whatsappUrl: string;
  themeStore: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateStoreEnvelope = ApiEnvelope<StoreData>;
