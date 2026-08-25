import React from 'react';
import { MapPin, DollarSign, Clock } from 'lucide-react';
import type { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {internship.title}
          </h3>
          <p className="text-gray-600">{internship.company_name}</p>
        </div>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {internship.domain}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{internship.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4" />
          <span>₹5,000 (Fixed) </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>12 Months (Fixed)</span>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {internship.description}
      </p>

      <a href={internship.application_link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-block text-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Apply Now
      </a>
    </div>
  );
};

export default InternshipCard;