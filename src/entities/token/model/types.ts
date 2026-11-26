export type TokenId = string
export type ThemeId = 'light' | 'dark'

/// CSS name of variable
export type CssVarName = `--p-${string}`

export type TokenType = 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'shadow'

/// Color value in HEX format
export interface ColorValue {
  kind: 'color'
  hex: string
  alpha?: number
}

export interface DimensionValue {
  kind: 'dimension'
  value: number
  unit: 'px' | 'rem'
}

export interface FontFamilyValue {
  kind: 'fontFamily'
  family: string
}

export interface FontWeightValue {
  kind: 'fontWeight'
  weight: number
}

/// Array of shadow layers
export interface ShadowLayer {
  offsetX: DimensionValue
  offsetY: DimensionValue
  blur: DimensionValue
  spread: DimensionValue
  color: ColorValue
}

export interface ShadowValue {
  kind: 'shadow'
  layers: ShadowLayer[]
}

export type TokenValue =
  ColorValue | DimensionValue | FontFamilyValue | FontWeightValue | ShadowValue

/// Token value is either a value or an alias to another token
export interface AliasRef {
  kind: 'alias'
  tokenId: TokenId
}

export type TokenValueRef = TokenValue | AliasRef

export interface Token {
  id: TokenId
  name: string
  type: TokenType
  description?: string
  value: TokenValueRef // base value
  themeOverrides?: Partial<Record<ThemeId, TokenValueRef>>
}

export type ContrastContext = 'normal' | 'large' | 'ui'

export interface ContrastPair {
  id: string
  foregroundTokenId: TokenId
  backgroundTokenId: TokenId
  context: ContrastContext
}

export interface TokenDocument {
  schemaVersion: 1
  tokens: Token[]
  themes: ThemeId[]
  contrastPairs: ContrastPair[]
}

/// No aliases, only real values
export interface ResolvedToken {
  id: TokenId
  name: string
  type: TokenType
  value: TokenValue
}

export type TokenErrorCode =
  | 'MISSING_ALIAS_TARGET' // Link to a not existing id
  | 'ALIAS_TO_ALIAS' // Link to a link (deprecated)
  | 'DUPLICATE_NAME' // Two tokens with the same name
  | 'INVALID_TOKEN_NAME' // Name can't be used as CSS variable
