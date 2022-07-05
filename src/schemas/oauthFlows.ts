import { Type, Static } from '@sinclair/typebox'
import { TOauthFlow } from './oauthFlow'

export const TOauthFlowType = Type.Union([
  Type.Literal('implicit'),
  Type.Literal('password'),
  Type.Literal('clientCredentials'),
  Type.Literal('authorizationCode')
], {
  $id: 'OauthFlowType',
  examples: [
    'implicit',
    'password',
    'clientCredentials',
    'authorizationCode'
  ]
})

export type OauthFlowType = Static<typeof TOauthFlowType>

export const TOauthFlows = Type.Object({
  implicit: Type.Optional(Type.Ref(TOauthFlow, { default: TOauthFlow.examples[0] })),
  password: Type.Optional(Type.Ref(TOauthFlow, { default: TOauthFlow.examples[0] })),
  clientCredentials: Type.Optional(Type.Ref(TOauthFlow, { default: TOauthFlow.examples[0] })),
  authorizationCode: Type.Optional(Type.Ref(TOauthFlow, { default: TOauthFlow.examples[0] }))
}, {
  $id: 'OauthFlows',
  examples: [
    {
      implicit: {
        authorizationUrl: 'https://example.com/api/oauth/dialog',
        scopes: {
          'write:pets': 'modify pets in your account',
          'read:pets': 'read your pets'
        }
      },
      authorizationCode: {
        authorizationUrl: 'https://example.com/api/oauth/dialog',
        tokenUrl: 'https://example.com/api/oauth/token',
        scopes: {
          'write:pets': 'modify pets in your account',
          'read:pets': 'read your pets'
        }
      },
    }
  ]
})

export type OauthFlows = Static<typeof TOauthFlows>
