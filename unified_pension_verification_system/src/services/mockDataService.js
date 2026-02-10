import { beneficiaries } from '../mockData/beneficiaries';
import {
  schemeDistribution,
  monthlyVerifications,
  stateCounts,
  summaryStats,
} from '../mockData/dashboard';

export const getDashboardData = () => ({
  summaryStats,
  schemeDistribution,
  monthlyVerifications,
  stateCounts,
});

export const getBeneficiaries = () => beneficiaries;
