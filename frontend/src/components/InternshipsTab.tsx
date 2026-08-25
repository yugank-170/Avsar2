import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import type { Internship } from '../types';
import InternshipCard from '../components/InternshipCard';

interface InternshipsTabProps {
  internships: Internship[];
}

const InternshipsTab: React.FC<InternshipsTabProps> = ({ internships }) => {
  const [searchBy, setSearchBy] = useState<'domain' | 'location' | 'company'>('domain');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInternships = useMemo(() => {
    if (!searchTerm.trim()) {
      return internships;
    }

    return internships.filter((internship) => {
      const term = searchTerm.toLowerCase().trim();
      
      switch (searchBy) {
        case 'domain':
          return internship.domain.toLowerCase().includes(term);
        case 'location':
          return internship.location.toLowerCase().includes(term);
        case 'company':
          return internship.company_name.toLowerCase().includes(term);
        default:
          return true;
      }
    });
  }, [internships, searchBy, searchTerm]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">All Internships</h2>
      
      {/* Search Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search By Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Search By
            </label>
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value as 'domain' | 'location' | 'company')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="domain">Domain</option>
              <option value="location">Location</option>
              <option value="company">Company Name</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Search {searchBy === 'domain' ? 'Domain' : searchBy === 'location' ? 'Location' : 'Company Name'}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Enter ${searchBy === 'domain' ? 'domain' : searchBy === 'location' ? 'location' : 'company name'}...`}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Clear Button */}
          {searchTerm && (
            <div className="flex flex-col justify-end">
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          {searchTerm ? (
            <span>
              Showing {filteredInternships.length} of {internships.length} internships
              {searchTerm && (
                <span className="font-medium">
                  {' '}for "{searchTerm}" in {searchBy}
                </span>
              )}
            </span>
          ) : (
            <span>Showing all {internships.length} internships</span>
          )}
        </div>
      </div>

      {/* Internships Grid */}
      {filteredInternships.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No internships found</div>
          <div className="text-gray-400 text-sm">
            Try adjusting your search criteria or clear the search to see all internships.
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipsTab;