/**
 * Position Filters Component
 * Filter positions by company, job family, status, etc.
 */

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

interface PositionFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCompany: string;
  onCompanyChange: (value: string) => void;
  selectedJobFamily: string;
  onJobFamilyChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  companies: string[];
  jobFamilies: string[];
  onClearFilters: () => void;
  activeFilterCount: number;
}

export function PositionFilters({
  searchQuery,
  onSearchChange,
  selectedCompany,
  onCompanyChange,
  selectedJobFamily,
  onJobFamilyChange,
  selectedStatus,
  onStatusChange,
  companies,
  jobFamilies,
  onClearFilters,
  activeFilterCount
}: PositionFiltersProps) {
  return (
    <div 
      className="rounded-lg p-4"
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)'
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
        <h4>Filters</h4>
        {activeFilterCount > 0 && (
          <Badge 
            variant="default"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-foreground)'
            }}
          >
            {activeFilterCount} active
          </Badge>
        )}
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto hover:bg-[var(--color-muted)]"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" 
            style={{ color: 'var(--color-muted-foreground)' }}
          />
          <Input
            placeholder="Search positions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
            style={{
              backgroundColor: 'var(--color-input-background)',
              borderColor: 'var(--color-border)'
            }}
          />
        </div>

        {/* Company Filter */}
        <Select value={selectedCompany} onValueChange={onCompanyChange}>
          <SelectTrigger 
            style={{
              backgroundColor: 'var(--color-input-background)',
              borderColor: 'var(--color-border)'
            }}
          >
            <SelectValue placeholder="All Companies" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {companies.map(company => (
              <SelectItem key={company} value={company}>
                {company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Job Family Filter */}
        <Select value={selectedJobFamily} onValueChange={onJobFamilyChange}>
          <SelectTrigger
            style={{
              backgroundColor: 'var(--color-input-background)',
              borderColor: 'var(--color-border)'
            }}
          >
            <SelectValue placeholder="All Job Families" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Job Families</SelectItem>
            {jobFamilies.map(family => (
              <SelectItem key={family} value={family}>
                {family}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger
            style={{
              backgroundColor: 'var(--color-input-background)',
              borderColor: 'var(--color-border)'
            }}
          >
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Vacant">Vacant</SelectItem>
            <SelectItem value="Filled">Filled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
