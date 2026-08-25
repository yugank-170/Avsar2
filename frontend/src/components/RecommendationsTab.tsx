import React from 'react';
import { TrendingUp, ExternalLink, Award } from 'lucide-react';
import type { Student, Recommendation } from '../types';
import RecommendationCard from '../components/RecommendationCard';
import CustomFormModal from '../components/CustomFormModal';

interface RecommendationsTabProps {
  students: Student[];
  selectedStudent: Student | null;
  recommendations: Recommendation[];
  loading: boolean;
  currentStudent: Student | null;
  onStudentSelect: (student: Student) => void;
  onShowCustomForm: () => void;
  // Custom form modal props
  customForm: any;
  setCustomForm: any;
  showCustomForm: boolean;
  setShowCustomForm: (show: boolean) => void;
  availableDomains: string[];
  availableLocations: string[];
  availableSkills: string[];
  onCustomFormSubmit: () => void;
  onCustomFormReset: () => void;
  customFormError: string | null;
}

const trendingInternships = [
  {
    id: 1,
    title: "AI/ML Engineering Intern",
    company: "TechCorp AI",
    location: "San Francisco, CA",
    domain: "Artificial Intelligence",
    duration: "12 weeks",
    description: "Work on cutting-edge machine learning models and AI applications",
    tags: ["Python", "TensorFlow", "PyTorch", "Neural Networks"],
    trending_score: 95,
    link: "https://en.wikipedia.org/wiki/Artificial_intelligence"
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "DataInsights Inc",
    location: "Remote",
    domain: "Data Science",
    duration: "10 weeks",
    description: "Analyze datasets and create predictive models for business insights",
    tags: ["Python", "SQL", "Tableau", "Statistics", "Data Visualization"],
    trending_score: 88,
    link: "https://en.wikipedia.org/wiki/Data_science"
  },
  {
    id: 3,
    title: "Full-Stack Web Developer",
    company: "WebSolutions Pro",
    location: "Austin, TX",
    domain: "Web Development",
    duration: "16 weeks",
    description: "Build modern web applications using latest technologies",
    tags: ["React", "Node.js", "MongoDB", "TypeScript"],
    trending_score: 82,
    link: "https://en.wikipedia.org/wiki/Web_development"
  },
  {
    id: 4,
    title: "Cybersecurity Analyst Intern",
    company: "SecureNet Systems",
    location: "Washington, DC",
    domain: "Cybersecurity",
    duration: "14 weeks",
    description: "Help protect digital infrastructure and analyze security threats",
    tags: ["Network Security", "Penetration Testing", "SIEM", "Risk Assessment"],
    trending_score: 79,
    link: "https://en.wikipedia.org/wiki/Cybersecurity_engineering"
  }
];

const TrendingInternshipCard: React.FC<{ internship: typeof trendingInternships[0] }> = ({ internship }) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{internship.domain}</h3>
    <p className="text-gray-600 text-sm mb-4">{internship.description}</p>
    
    <div className="flex flex-wrap gap-2 mb-4">
      {internship.tags.map((tag, index) => (
        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
          {tag}
        </span>
      ))}
    </div>
    
    <a
      href={internship.link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
    >
      <span>Explore</span>
      <ExternalLink className="h-4 w-4" />
    </a>
  </div>
);

const RecommendationsTab: React.FC<RecommendationsTabProps> = ({
  students,
  selectedStudent,
  recommendations,
  loading,
  onStudentSelect,
  onShowCustomForm,
  customForm,
  setCustomForm,
  showCustomForm,
  setShowCustomForm,
  availableDomains,
  availableLocations,
  availableSkills,
  onCustomFormSubmit,
  onCustomFormReset,
  customFormError
}) => {
  // Check if form has been submitted (has data in required fields)
  const hasFormData = customForm.preferred_domains.length > 0 || 
                     customForm.preferred_locations.length > 0 || 
                     customForm.skills.length > 0;

  return (
    <div>
      {/* Trending Domains Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Trending Domains</h2>
          <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 border rounded-xl p-2">
            <TrendingUp className="h-4 w-4" />
            <span>Most popular domains as per current job market</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingInternships.map((internship) => (
            <TrendingInternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </div>

      {/* Custom Profile Form Section - Always Visible */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Personalized Recommendations</h3>
          <p className="text-gray-600 mb-6">Fill out your profile to receive tailored internship recommendations based on your skills, interests, and preferences.</p>
          
          {/* Custom Form - Always Displayed */}
          <CustomFormModal
            customForm={customForm}
            setCustomForm={setCustomForm}
            showCustomForm={true} // Always show the form
            setShowCustomForm={setShowCustomForm}
            availableDomains={availableDomains}
            availableLocations={availableLocations}
            availableSkills={availableSkills}
            loading={loading}
            onSubmit={onCustomFormSubmit}
            onReset={onCustomFormReset}
            error={customFormError}
            isEmbedded={true} // Add prop to indicate it's embedded, not in modal
          />
        </div>
      </div>

      {/* Recommendations Section - Only show after form submission */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Getting personalized recommendations...</p>
        </div>
      ) : hasFormData && recommendations.length > 0 ? (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Personalized Recommendations
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <RecommendationCard key={rec.internship_id} rec={rec} index={index} />
            ))}
          </div>
        </div>
      ) : hasFormData && recommendations.length === 0 && !loading ? (
        <div className="text-center py-12">
          <Award className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No recommendations found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your preferences or skills to get better matches.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default RecommendationsTab;