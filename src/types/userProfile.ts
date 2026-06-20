import { type ApiEnvelope } from '@/api/auth';

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  document: string | null;
  cellPhone: string | null;
  birthDate: string | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY' | string | null;
  role: string;
  isActive: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  profileCompleted: boolean;
  stripeCustomerId: string | null;
}

export type UserProfileEnvelope = ApiEnvelope<UserProfileData>;
