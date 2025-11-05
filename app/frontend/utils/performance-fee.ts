/**
 * Calculate dynamic performance fee based on fund performance
 * Each 100% (1x) increase = 10% fee
 * Examples:
 * - 1x (100%) = 10% fee
 * - 2x (200%) = 20% fee  
 * - 3x (300%) = 30% fee
 * - 2.5x (250%) = 25% fee
 */
export function calculatePerformanceFee(performance: number): number {
  // Performance is given as percentage (e.g., 150% = 1.5x, 200% = 2x)
  // Each 100% gets 10% fee
  const multiplier = performance / 100 // Convert percentage to multiplier
  const feePercentage = Math.floor(multiplier) * 10 // Each full 1x = 10%
  return feePercentage
}

/**
 * Calculate performance from multiplier
 * @param multiplier - The multiplier (e.g., 2.5 = 250% performance)
 * @returns Performance percentage
 */
export function performanceFromMultiplier(multiplier: number): number {
  return multiplier * 100
}

/**
 * Get fee description for display
 */
export function getFeeDescription(performance: number): string {
  const multiplier = performance / 100
  const fullMultipliers = Math.floor(multiplier)
  return `${fullMultipliers}x performance = ${calculatePerformanceFee(performance)}% fee`
}


