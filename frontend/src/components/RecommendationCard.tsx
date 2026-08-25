import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Star, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient'; // Adjust path as needed
import type { Recommendation } from '../types';

interface RecommendationCardProps {
  rec: Recommendation;
  index: number;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ rec, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMatchScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleApplyClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // If application_link is already available in rec object, use it directly
      if (rec.application_link) {
        window.open(rec.application_link, '_blank', 'noopener,noreferrer');
        setIsLoading(false);
        return;
      }

      // Otherwise, fetch from Supabase using internship_id
      const { data, error: supabaseError } = await supabase
        .from('internships') // Adjust table name as needed
        .select('application_link')
        .eq('id', rec.internship_id) // Use internship_id instead of id
        .single();

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(`Database error: ${supabaseError.message}`);
      }

      if (data?.application_link) {
        // Open the application link in a new tab
        window.open(data.application_link, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error('Application link not found for this internship');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      console.error('Error fetching application link:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border hover:border-blue-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-gray-600">{rec.company_name[0]}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{rec.role_title}</h3>
            <p className="text-gray-600">{rec.company_name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600">#{index + 1}</span>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(rec.match_score)}`}>
            {rec.match_score}% Match
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-4 w-4" />
          <span>{rec.domain}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{rec.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-gray-600">
            Rating: {rec.predicted_rating}/5.0
          </span>
        </div>
        
        <div className="flex flex-col items-end">
          <button 
            onClick={handleApplyClick}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Apply Now</span>
                <ExternalLink className="h-4 w-4" />
              </>
            )}
          </button>
          
          {error && (
            <div className="flex items-center space-x-1 text-red-600 text-xs mt-1">
              <AlertCircle className="h-3 w-3" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;