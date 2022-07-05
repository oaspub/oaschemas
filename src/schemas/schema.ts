import { Type, Static } from '@sinclair/typebox'

// TODO - Consider implementing the JSON Schema specification
export const TSchema = Type.Any({
  $id: 'Schema',
  examples: [
    {
      type: "string",
      format: "email"
    },
    {
      components: {
        schemas: {
          ErrorModel: {
            type: "object",
            required: [
              "message",
              "code"
            ],
            properties: {
              message: {
                type: "string"
              },
              code: {
                type: "integer",
                minimum: 100,
                maximum: 600
              }
            }
          },
          ExtendedErrorModel: {
            allOf: [
              {
                $ref: "#/components/schemas/ErrorModel"
              },
              {
                type: "object",
                required: [
                  "rootCause"
                ],
                properties: {
                  rootCause: {
                    type: "string"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
})

export type Schema = Static<typeof TSchema>
