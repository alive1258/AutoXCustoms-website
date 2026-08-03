export interface PricingPlan {
  id: number;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  popular: boolean;
}