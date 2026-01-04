import { omit } from 'lodash'
import type { components } from './generated'
import { http } from './http'
import { THERAPEUTES_ENDPOINT } from './endpoints'

export type CreateTherapeuteDto = components['schemas']['CreateTherapeuteDto']
export type ReadTherapeuteDto = components['schemas']['ReadTherapeuteDto']
export type UpdateTherapeuteDto = components['schemas']['UpdateTherapeuteDto']

export function getTherapeute(id: string | number) {
  return http<ReadTherapeuteDto>(`${THERAPEUTES_ENDPOINT}/${id}`)
}

export function getTherapeutes() {
  return http<ReadTherapeuteDto[]>(`${THERAPEUTES_ENDPOINT}`)
}

export function createTherapeute(data: Partial<CreateTherapeuteDto>) {
  return http<ReadTherapeuteDto>(`${THERAPEUTES_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateTherapeute(id: string | number, data: Partial<UpdateTherapeuteDto>) {
  return http<ReadTherapeuteDto>(`${THERAPEUTES_ENDPOINT}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function deleteTherapeute(id: number) {
  return http<ReadTherapeuteDto>(`${THERAPEUTES_ENDPOINT}/${id}`, {
    method: 'DELETE',
  })
}

export function toUpdateTherapeuteDto(dto: ReadTherapeuteDto): UpdateTherapeuteDto {
  return omit(dto, ['id', 'createdAt', 'updatedAt']) as UpdateTherapeuteDto
}

export function toCreateTherapeuteDto(dto: ReadTherapeuteDto): CreateTherapeuteDto {
  return omit(dto, ['id', 'createdAt', 'updatedAt']) as CreateTherapeuteDto
}
