import { api } from '@/helpers/api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export async function loginRequest(data: LoginPayload): Promise<LoginResponse> {
  const response = await api.post('/auth/login', data);
  const payload = response.data;
  return {
    token: payload?.data?.accessToken,
    user: payload?.data?.user,
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function registerRequest(data: RegisterPayload): Promise<LoginResponse> {
  const response = await api.post('/users/register', data);
  const payload = response.data;
  return {
    token: payload?.data?.accessToken,
    user: payload?.data?.user,
  };
}

export interface ForgotPasswordPayload {
  email: string;
}

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

export type ForgotPasswordEnvelope = ApiEnvelope<{ message: string }>;

export async function forgotPasswordRequest(
  data: ForgotPasswordPayload,
): Promise<ForgotPasswordEnvelope> {
  const response = await api.post('/auth/forgot-password', data);
  return response.data;
}

export type UserProfileEnvelope = ApiEnvelope<{
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  document: string | null;
  cellPhone: string | null;
  birthDate: string | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY' | string | null;
  role: 'USER' | 'ADMIN' | string;
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  profileCompleted: boolean;
  stripeCustomerId: string | null;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    complement?: string;
  } | null;
}>;

export async function profileRequest(): Promise<UserProfileEnvelope> {
  const response = await api.get('/users/profile');
  return response.data;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string | null;
  document?: string | null;
  cellPhone?: string | null;
  birthDate?: string | null;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY' | string | null;
  role?: 'USER' | 'ADMIN' | string;
  isActive?: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  address?: {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    complement?: string;
  } | null;
}

export type UpdateProfileEnvelope = UserProfileEnvelope;

export async function updateProfileRequest(
  id: string,
  data: FormData,
): Promise<UpdateProfileEnvelope> {
  const response = await api.patch(`/users/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}
