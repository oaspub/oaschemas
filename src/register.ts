import { TSchema, Type } from '@sinclair/typebox'
import addFormats from 'ajv-formats'
import Ajv from 'ajv/dist/2019'
import * as OAS from './schemas'

export function register (ajv = new Ajv()): Ajv {
  ajv
    .addKeyword('kind')
    .addKeyword('modifier')
  addFormats(ajv, [
    'date-time',
    'time',
    'date',
    'email',
    'hostname',
    'ipv4',
    'ipv6',
    'uri',
    'uri-reference',
    'uuid',
    'uri-template',
    'json-pointer',
    'relative-json-pointer',
    'regex'
  ])
  ajv.addSchema(getSchemas(false))
  return ajv
}

export function getSchemas (strict = true): typeof strict extends true ? unknown[] : TSchema[] {
  const schemas = Object.values(OAS).filter(value => Object.hasOwnProperty.call(value, '$id'))
  return strict ? schemas.map(schema => Type.Strict(schema)) : schemas
}
