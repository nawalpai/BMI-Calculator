// Verification test suite for BMI engine requirements
import {
  classifyAdultBMI,
  calculateBMI,
  calculateReferenceWeightInterval,
  convertHeightUnits,
  convertWeightUnits,
  parseAge
} from './src/utils/bmi.ts'

console.log('--- RUNNING BMI CALCULATION TESTS ---')

let passed = 0
let failed = 0

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`)
    passed++
  } else {
    console.error(`✗ FAIL: ${message}`)
    failed++
  }
}

// 1. Core Examples from Part 27
// Example 1: 170cm, 70kg -> ~24.2, healthy
const ex1 = calculateBMI({
  age: '28',
  sex: 'unspecified',
  heightUnit: 'cm',
  weightUnit: 'kg',
  heightCm: '170',
  heightFt: '',
  heightIn: '',
  weightKg: '70',
  weightLbs: '',
  saveLocally: false
})
assert(ex1.result?.displayBmi === '24.2', `Example 1 BMI is 24.2 (got ${ex1.result?.displayBmi})`)
assert(ex1.result?.category === 'healthy', `Example 1 category is healthy (got ${ex1.result?.category})`)

// Example 2: 170cm, 80kg -> ~27.7, overweight
const ex2 = calculateBMI({
  age: '30',
  sex: 'male',
  heightUnit: 'cm',
  weightUnit: 'kg',
  heightCm: '170',
  heightFt: '',
  heightIn: '',
  weightKg: '80',
  weightLbs: '',
  saveLocally: false
})
assert(ex2.result?.displayBmi === '27.7', `Example 2 BMI is 27.7 (got ${ex2.result?.displayBmi})`)
assert(ex2.result?.category === 'overweight', `Example 2 category is overweight (got ${ex2.result?.category})`)

// Example 3: 170cm, 50kg -> ~17.3, underweight
const ex3 = calculateBMI({
  age: '24',
  sex: 'female',
  heightUnit: 'cm',
  weightUnit: 'kg',
  heightCm: '170',
  heightFt: '',
  heightIn: '',
  weightKg: '50',
  weightLbs: '',
  saveLocally: false
})
assert(ex3.result?.displayBmi === '17.3', `Example 3 BMI is 17.3 (got ${ex3.result?.displayBmi})`)
assert(ex3.result?.category === 'underweight', `Example 3 category is underweight (got ${ex3.result?.category})`)

// Example 4: 170cm, 90kg -> ~31.1, obesity
const ex4 = calculateBMI({
  age: '40',
  sex: 'unspecified',
  heightUnit: 'cm',
  weightUnit: 'kg',
  heightCm: '170',
  heightFt: '',
  heightIn: '',
  weightKg: '90',
  weightLbs: '',
  saveLocally: false
})
assert(ex4.result?.displayBmi === '31.1', `Example 4 BMI is 31.1 (got ${ex4.result?.displayBmi})`)
assert(ex4.result?.category === 'obesity', `Example 4 category is obesity (got ${ex4.result?.category})`)

// 2. Boundary Tests
assert(classifyAdultBMI(18.4) === 'underweight', 'BMI 18.4 is underweight')
assert(classifyAdultBMI(18.5) === 'healthy', 'BMI 18.5 is healthy weight')
assert(classifyAdultBMI(24.9) === 'healthy', 'BMI 24.9 is healthy weight')
assert(classifyAdultBMI(25.0) === 'overweight', 'BMI 25.0 is OVERWEIGHT (strictly not healthy)')
assert(classifyAdultBMI(29.9) === 'overweight', 'BMI 29.9 is overweight')
assert(classifyAdultBMI(30.0) === 'obesity', 'BMI 30.0 is OBESITY (strictly not merely overweight)')

// 3. Imperial to Metric consistency
// 5 ft 7 in = 67 in = 170.18 cm, 154.32 lbs = 70.0 kg -> BMI ~ 24.2
const imp1 = calculateBMI({
  age: '30',
  sex: 'unspecified',
  heightUnit: 'ft-in',
  weightUnit: 'lbs',
  heightCm: '',
  heightFt: '5',
  heightIn: '7',
  weightKg: '',
  weightLbs: '154.32',
  saveLocally: false
})
assert(imp1.result?.displayBmi === '24.2', `Imperial calculation accurate: 24.2 (got ${imp1.result?.displayBmi})`)

// 4. Age and Cohort handling
assert(parseAge('1.5').cohort === 'infant', 'Age 1.5 is infant')
assert(parseAge('12').cohort === 'pediatric', 'Age 12 is pediatric')
assert(parseAge('20').cohort === 'adult', 'Age 20 is adult')

// 5. Reference weight interval
const refWeight = calculateReferenceWeightInterval(1.7, 70, 'kg')
// lower = 18.5 * 2.89 = 53.465 -> 53.5
// upper = 24.9 * 2.89 = 71.961 -> 72.0
assert(refWeight.lowerDisplay === 53.5, `Lower ref weight is 53.5kg (got ${refWeight.lowerDisplay})`)
assert(refWeight.upperDisplay === 72.0, `Upper ref weight is 72.0kg (got ${refWeight.upperDisplay})`)
assert(refWeight.status === 'within', '70kg is within reference range')

// 6. Unit Conversions (cm <-> ft-in, kg <-> lbs)
const hConv = convertHeightUnits('cm', 'ft-in', '175', '', '')
assert(hConv.heightFt === '5' && Math.round(parseFloat(hConv.heightIn)) === 9, '175cm converts to ~5ft 9in')
const wConv = convertWeightUnits('kg', 'lbs', '70', '')
assert(Math.round(parseFloat(wConv.weightLbs)) === 154, '70kg converts to ~154lbs')

console.log(`\nTEST SUMMARY: ${passed} PASSED, ${failed} FAILED`)
if (failed > 0) process.exit(1)
