import { api } from '@/helpers/api';
import { type CreateStoreRequest, type CreateStoreEnvelope } from './types';

export async function createStoreRequest(data: CreateStoreRequest): Promise<CreateStoreEnvelope> {
  const response = await api.post('/stores/create', data);
  return response.data;
}
