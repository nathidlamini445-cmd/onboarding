export type UserType = 'entrepreneur' | 'investor' | 'advisor'

export interface OnboardingData {
  businessName?: string
  industry?: string | string[]
  businessStage?: string | string[]
  revenueGoal?: string | string[]
  targetMarket?: string | string[]
  teamSize?: string | string[]
  challenges?: string | string[]
  primaryRevenue?: string | string[]
  customerAcquisition?: string | string[]
  monthlyRevenue?: string | string[]
  keyMetrics?: string | string[]
  growthStrategy?: string | string[]
  biggestGoal?: string | string[]
  [key: string]: string | string[] | undefined
}

