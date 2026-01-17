import { omit } from 'lodash'
import type { components } from './generated'
import { http } from './http'
import { SOINS_ENDPOINT } from './endpoints'

export type CreateSoinDto = components['schemas']['CreateSoinDto']
export type ReadSoinDto = components['schemas']['ReadSoinDto']
export type UpdateSoinDto = components['schemas']['UpdateSoinDto']

export function getSoin(id: string | number) {
  return http<ReadSoinDto>(`${SOINS_ENDPOINT}/${id}`)
}

export function getSoins() {
  return http<ReadSoinDto[]>(`${SOINS_ENDPOINT}`)
}

export function getSoinsByTherapeute(idTherapeute: number) {
  return http<ReadSoinDto[]>(`${SOINS_ENDPOINT}?therapeute=${idTherapeute}`)
}

export function createSoin(data: Partial<CreateSoinDto>) {
  return http<ReadSoinDto>(`${SOINS_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateSoin(id: string | number, data: Partial<UpdateSoinDto>) {
  return http<ReadSoinDto>(`${SOINS_ENDPOINT}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function deleteSoin(id: number) {
  return http(`${SOINS_ENDPOINT}/${id}`, {
    method: 'DELETE',
  })
}

export function toUpdateSoinDto(dto: ReadSoinDto): UpdateSoinDto {
  return omit(dto, ['id', 'createdAt', 'updatedAt']) as UpdateSoinDto
}

export function toCreateSoinDto(dto: ReadSoinDto): CreateSoinDto {
  return omit(dto, ['id', 'createdAt', 'updatedAt']) as CreateSoinDto
}
