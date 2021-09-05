export const formatCode = (input: string): string =>
  input.toUpperCase().replace(' ', '_')

export const formatLabel = (input: string): string => {
  const lowerCasedInput: string = input.toLowerCase().replace('_', ' ')
  const firstChar: string = lowerCasedInput.charAt(0).toUpperCase()
  return firstChar + lowerCasedInput.slice(1)
}
