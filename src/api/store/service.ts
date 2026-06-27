import { api } from '@/helpers/api';
import { type CreateStoreRequest, type CreateStoreEnvelope, type GetStoreEnvelope, type UpdateStoreRequest } from './types';

export async function createStoreRequest(data: CreateStoreRequest): Promise<CreateStoreEnvelope> {
  const response = await api.post('/stores/create', data);
  return response.data;
}

export async function getStoreRequest(id: string): Promise<GetStoreEnvelope> {
  const response = await api.get(`/stores/${id}`);
  return response.data;
}

export async function updateStoreRequest(id: string, data: UpdateStoreRequest): Promise<GetStoreEnvelope> {
  const response = await api.patch(`/stores/${id}`, data);
  return response.data;
}
