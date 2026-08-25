import React from 'react';
import { Building2, Briefcase, MapPin } from 'lucide-react';
import type { Stats } from '../types';
import StatCard from '../components/Stat_Card';

interface AnalyticsTabProps {
  stats: Stats;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ stats }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Internship Analytics</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Companies"
          value="600"
          icon={Briefcase}
          color="black"
        />
        <StatCard
          title="Total Internships"
          value={stats.total_internships}
          icon={Building2}
          color="black"
        />
        <StatCard
          title="Domains Available"
          value={Object.keys(stats.domain_distribution).length}
          icon={Briefcase}
          color="black"
        />
        <StatCard
          title="Locations Available"
          value={Object.keys(stats.location_distribution).length}
          icon={MapPin}
          color="black"
        />
      </div>

      {/* Charts */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Domain Distribution */}
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Internships by Domain</h3>
    <div className="space-y-3">
      {Object.entries(stats.domain_distribution)
        .sort(([, a], [, b]) => b - a)
        .map(([domain, count]) => (
          <div 
            key={domain} 
            className="grid grid-cols-[150px_1fr_auto] items-center gap-4"
          >
            {/* Fixed-width domain name */}
            <span className="text-gray-700">{domain}</span>
            
            {/* Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${(count / Math.max(...Object.values(stats.domain_distribution))) * 100}%`
                }}
              ></div>
            </div>
            
            {/* Count */}
            <span className="text-sm font-medium text-gray-900">{count}</span>
          </div>
        ))}
    </div>
  </div>

  {/* Location Distribution */}
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Internships by Location</h3>
    <div className="space-y-3">
      {Object.entries(stats.location_distribution)
        .sort(([, a], [, b]) => b - a)
        .map(([location, count]) => (
          <div 
            key={location} 
            className="grid grid-cols-[150px_1fr_auto] items-center gap-4"
          >
            {/* Fixed-width location name */}
            <span className="text-gray-700">{location}</span>
            
            {/* Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{
                  width: `${(count / Math.max(...Object.values(stats.location_distribution))) * 100}%`
                }}
              ></div>
            </div>
            
            {/* Count */}
            <span className="text-sm font-medium text-gray-900">{count}</span>
          </div>
        ))}
    </div>
  </div>

  {/* Top Companies */}
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Companies by Internship Count</h3>
    <div className="space-y-4">
      {Object.entries(stats.company_distribution || {})
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([company, count]) => (
          <div key={company} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-gray-900">{company}</span>
            </div>
            <span className="text-lg font-bold text-purple-600">
              {count} {count === 1 ? 'internship' : 'internships'}
            </span>
          </div>
        ))}
      {(!stats.company_distribution || Object.keys(stats.company_distribution).length === 0) && (
        <div className="text-gray-500 text-center py-4">
          No company data available
        </div>
      )}
    </div>
  </div>

  {/* Recent Activity */}
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Postings</h3>
    <div className="space-y-4">
      {stats.recent_postings?.slice(0, 5).map((posting, index) => (
        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">{posting.title}</div>
            <div className="text-sm text-gray-600">{posting.company_name}</div>
            <div className="text-xs text-gray-500 mt-1">
              {posting.domain} • {posting.location}
            </div>
          </div>
        </div>
      )) || (
        <div className="text-gray-500 text-center py-4">
          No recent postings available
        </div>
      )}
    </div>
  </div>
</div>

    </div>
  );
};

export default AnalyticsTab;