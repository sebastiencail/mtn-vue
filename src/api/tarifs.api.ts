import { omit } from 'lodash'
import type { components } from './generated'
import { http } from './http'
import { TARIFS_ENDPOINT } from './endpoints'

export type CreateTarifDto = components['schemas']['CreateTarifDto']
export type ReadTarifDto = components['schemas']['ReadTarifDto']
export type UpdateTarifDto = components['schemas']['UpdateTarifDto']

export function getTarif(id: string | number) {
  return http<ReadTarifDto>(`${TARIFS_ENDPOINT}/${id}`)
}

export function getTarifs() {
  return http<ReadTarifDto[]>(`${TARIFS_ENDPOINT}`)
}

export function createTarif(data: Partial<CreateTarifDto>) {
  return http<ReadTarifDto>(`${TARIFS_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateTarif(id: string | number, data: Partial<UpdateTarifDto>) {
  return http<ReadTarifDto>(`${TARIFS_ENDPOINT}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function deleteTarif(id: number) {
  return http<ReadTarifDto>(`${TARIFS_ENDPOINT}/${id}`, {
    method: 'DELETE',
  })
}

export function toUpdateTarifDto(dto: ReadTarifDto): UpdateTarifDto {
  return omit(dto, ['id', 'createdAt', 'updatedAt']) as UpdateTarifDto
}

export function toCreateTherapeuteDto(dto: ReadTarifDto): CreateTarifDto {
  return omit(dto, ['id', 'createdAt', 'updatedAt']) as CreateTarifDto
}
