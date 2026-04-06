/**
 * Unit Aspiration View
 * Main view for unit leaders to request talent for positions in their unit
 * Sprint 5: Unit Aspiration Implementation
 */

import React, { useState, useMemo } from 'react';
import { Building, AlertCircle, Users, Briefcase } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { useCareerPath } from '../../../lib/career-path/CareerPathContext';
import { UnitPositionCard } from './UnitPositionCard';
import { TalentRequestModal } from './TalentRequestModal';
import { EmptyState } from '../shared/EmptyState';
import type { Position, UnitAspiration } from '../../../types/careerPath';

export function UnitAspirationView() {
  const { currentView, positions, aspirations } = useCareerPath();
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VACANT' | 'FILLED'>('ALL');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showTalentModal, setShowTalentModal] = useState(false);

  // Get positions in current user's unit
  const unitPositions = useMemo(() => {
    return positions.filter(p => p.unit === currentView.user.unit);
  }, [positions, currentView.user.unit]);

  // Filter positions
  const filteredPositions = useMemo(() => {
    let filtered = unitPositions;

    // Status filter
    if (statusFilter === 'VACANT') {
      filtered = filtered.filter(p => p.status === 'Vacant');
    } else if (statusFilter === 'FILLED') {
      filtered = filtered.filter(p => p.status === 'Filled');
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.band_jabatan.toLowerCase().includes(query) ||
        p.job_family.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [unitPositions, statusFilter, searchQuery]);

  // Get existing unit aspirations for positions
  const unitAspirationsMap = useMemo(() => {
    const map = new Map<string, UnitAspiration[]>();
    
    aspirations
      .filter(a => a.source === 'UNIT')
      .forEach(aspiration => {
        const ua = aspiration as UnitAspiration;
        const key = ua.pos_id;
        if (!map.has(key)) {
          map.set(key, []);
        }
        map.get(key)!.push(ua);
      });
    
    return map;
  }, [aspirations]);

  // Statistics
  const stats = useMemo(() => {
    const vacant = unitPositions.filter(p => p.status === 'Vacant').length;
    const filled = unitPositions.filter(p => p.status === 'Filled').length;
    const totalNominations = aspirations.filter(
      a => a.source === 'UNIT' && 
      unitPositions.some(p => p.id === (a as UnitAspiration).pos_id)
    ).length;

    return { vacant, filled, total: unitPositions.length, totalNominations };
  }, [unitPositions, aspirations]);

  // Handle request talent
  const handleRequestTalent = (position: Position) => {
    setSelectedPosition(position);
    setShowTalentModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowTalentModal(false);
    setSelectedPosition(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground">Unit Aspiration</h3>
        <p className="text-sm text-muted-foreground font-body">
          Kelola kebutuhan talent untuk posisi-posisi di unit {currentView.user.unit}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg p-4 bg-[var(--color-card)] border border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-3 bg-[var(--color-primary-light)]">
              <Briefcase className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted-foreground)] font-body">Total Positions</p>
              <h4 className="font-heading font-semibold text-[var(--color-foreground)]">{stats.total}</h4>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-[var(--color-card)] border border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-3 bg-[var(--color-nine-solid)]">
              <AlertCircle className="w-5 h-5 text-[var(--color-foreground)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted-foreground)] font-body">Vacant</p>
              <h4 className="font-heading font-semibold text-[var(--color-foreground)]">{stats.vacant}</h4>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-[var(--color-card)] border border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-3 bg-[var(--color-nine-emerging)]">
              <Users className="w-5 h-5 text-[var(--color-foreground)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted-foreground)] font-body">Filled</p>
              <h4 className="font-heading font-semibold text-[var(--color-foreground)]">{stats.filled}</h4>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-[var(--color-card)] border border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-3 bg-[var(--color-primary-light)]">
              <Building className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted-foreground)] font-body">Nominations</p>
              <h4 className="font-heading font-semibold text-[var(--color-foreground)]">{stats.totalNominations}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="rounded p-4 bg-[var(--color-muted)] border-l-4 border-l-[var(--color-primary)]">
        <p className="text-sm text-[var(--color-foreground)] font-body">
          💡 <strong>Cross-Unit Capability:</strong> Sebagai Pimpinan Unit, Anda dapat menominasikan kandidat dari <strong>unit mana pun</strong> (termasuk perusahaan lain dalam grup) untuk posisi di unit Anda.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="🔍 Search positions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[var(--color-background)] border-[var(--color-border)]"
          />
        </div>
        
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="bg-[var(--color-background)] border-[var(--color-border)]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Positions</SelectItem>
              <SelectItem value="VACANT">Vacant Only</SelectItem>
              <SelectItem value="FILLED">Filled Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--color-muted-foreground)] font-body">
          Menampilkan {filteredPositions.length} dari {unitPositions.length} posisi
        </p>
      </div>

      {/* Positions Grid */}
      {filteredPositions.length === 0 ? (
        <EmptyState
          icon={AlertCircle}
          title="No positions found"
          description={searchQuery ? 'No positions match your search criteria' : 'No positions available in your unit'}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredPositions.map((position) => {
            const existingNominations = unitAspirationsMap.get(position.id) || [];
            return (
              <UnitPositionCard
                key={position.id}
                position={position}
                existingNominations={existingNominations}
                onRequestTalent={() => handleRequestTalent(position)}
              />
            );
          })}
        </div>
      )}

      {/* Talent Request Modal */}
      {selectedPosition && (
        <TalentRequestModal
          isOpen={showTalentModal}
          onClose={handleCloseModal}
          position={selectedPosition}
          existingNominations={unitAspirationsMap.get(selectedPosition.id) || []}
        />
      )}
    </div>
  );
}
