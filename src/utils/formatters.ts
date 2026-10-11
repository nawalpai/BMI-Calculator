import type { BMICategory } from '../types/bmi'

export function getCategoryDescription(category: BMICategory): string {
  switch (category) {
    case 'underweight':
      return 'Your BMI is below the standard adult reference interval of 18.5.'
    case 'healthy':
      return 'Your BMI falls within the standard healthy-weight reference interval for adults.'
    case 'overweight':
      return 'Your BMI is above the standard adult reference interval, below the threshold for obesity.'
    case 'obesity':
      return 'Your BMI meets or exceeds the adult clinical threshold for obesity.'
  }
}

export function getCategoryColor(category: BMICategory): string {
  switch (category) {
    case 'underweight':
      return '#3b82f6' // Clear clinical blue
    case 'healthy':
      return '#15803d' // Forest green
    case 'overweight':
      return '#ca8a04' // Ochre / amber
    case 'obesity':
      return '#b91c1c' // Deep crimson
  }
}
