export interface Student {
  id: number;
  user_id?: string; // Supabase user ID
  name: string;
  email: string;
  preferred_domains: string[];
  preferred_locations: string[];
  skills: string[];
  interests: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Internship {
  id: number;
  company_name: string;
  title: string;
  description: string;
  application_link: string;
  location: string;
  domain: string;
  created_at?: string;
}

export interface Recommendation {
  id: number; // Added for Supabase query
  internship_id: number;
  company_name: string;
  role_title: string; // or title
  domain: string;
  location: string;
  match_score: number;
  predicted_rating: number;
  application_link: string;
  // Remove duration_weeks, stipend, is_remote since they're fixed
}

export interface CustomFormData {
  name: string;
  preferred_domains: string[];
  preferred_locations: string[];
  skills: string[];
  interests: string[];
}

export interface Stats {
  total_internships: number;
  total_companies: number;
  domain_distribution: Record<string, number>;
  location_distribution: Record<string, number>;
  company_distribution: Record<string, number>;
  recent_postings: Array<{
    title: string;
    company_name: string;
    domain: string;
    location: string;
    created_at?: string;
  }>;
}