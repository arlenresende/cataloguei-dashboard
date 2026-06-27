import { type ApiEnvelope } from '@/api/auth';

export interface Address {
  id: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  complement: string | null;
}

export interface StoreAddressItem {
  store_id: string;
  address_id: string;
  type: string;
  is_default: boolean;
  address: Address;
}

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

export interface BusinessHours {
  seg?: string | null;
  ter?: string | null;
  qua?: string | null;
  qui?: string | null;
  sex?: string | null;
  sab?: string | null;
  dom?: string | null;
}

export interface CreateStoreRequest {
  name: string;
  slug: string;
  url: string;
  description: string;
  email: string;
  logo?: string;
  coverImage?: string;
  websiteUrl?: string;
  whatsappUrl: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  phone?: string;
  phoneNumber?: string;
  cellPhone?: string;
  businessHours?: BusinessHours;
  themeStore?: string;
  address?: StoreAddress;
  storeAddresses?: StoreAddressItem[];
}

export interface StoreData {
  id: string;
  name: string;
  slug: string;
  url: string;
  description: string;
  email: string;
  logo: string | null;
  coverImage: string | null;
  websiteUrl: string | null;
  whatsappUrl: string;
  instagramUrl: string | null;
  facebookUrl: string | null;
  tiktokUrl: string | null;
  phone: string | null;
  phoneNumber: string | null;
  cellPhone: string | null;
  businessHours: BusinessHours | null;
  themeStore: string | null;
  storeAddresses: StoreAddressItem[];
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateStoreEnvelope = ApiEnvelope<StoreData>;

export type GetStoreEnvelope = ApiEnvelope<StoreData>;

export type UpdateStoreRequest = Partial<CreateStoreRequest>;
