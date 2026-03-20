'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { Badge } from '@/components/Badge';

const mockMilestones = [
  { id: 1, title: 'Foundation Laid', project: 'City Bridge', progress: 100, status: 'Paid' },
  { id: 2, title: 'Pillars Complete', project: 'City Bridge', progress: 50, status: 'Pending' },
  { id: 3, title: 'Road Resurfacing complete', project: 'Highway 61', progress: 100, status: 'Approved' },
];

export default function MilestonesPage() {
  const [milestones] = useState(mockMilestones);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Project Milestones</h1>
      
      <div className="grid gap-6">
        {milestones.map((m) => (
          <Card key={m.id}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-slate-900">{m.title}</h3>
                <p className="text-sm text-slate-500">Project: {m.project}</p>
              </div>
              <Badge status={m.status} />
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">Completion</span>
                <span className="text-slate-500">{m.progress}%</span>
              </div>
              <ProgressBar progress={m.progress} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
