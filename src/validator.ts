import { Static, TSchema } from '@sinclair/typebox'
import Ajv, { ValidateFunction } from 'ajv/dist/2019'
import * as Schemas from './register'

export class Validator<T extends TSchema = any> {
  readonly schema: T
  private readonly ajv: Ajv
  public readonly validate: ValidateFunction<Static<T>>
  constructor (
    schema: T | string,
    ajv = new Ajv()
  ) {
    this.ajv = ajv
    Schemas.register(this.ajv)

    const id = typeof schema === 'string' ? schema : schema.$id
    const found = id != null ? this.ajv.getSchema<T>(id) : null

    if (typeof schema !== 'string' && (!Object.hasOwnProperty.call(schema, '$id') || (found == null))) {
      this.schema = schema
      this.validate = this.ajv.compile<T>(schema)
      return
    }

    if (found == null) {
      throw TypeError(`The schema with $id ${id ?? 'unknown'} could not be found`)
    }

    this.schema = found.schema as T
    this.validate = found
  }

  parse (data: unknown, errorMessage?: string): Static<T> {
    this.validate(data)
    if (this.validate.errors != null && this.validate.errors.length > 0) {
      throw new AjvError(this.validate.errors, errorMessage)
    }
    return data
  }
}

export class AjvError extends Error {
  constructor (public readonly validations: ValidateFunction['errors'], message?: string) {
    message = message !== undefined ? `AJV Error: ${message}` : 'AJV Error'
    super(message)
  }
}
