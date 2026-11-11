import React, { useState } from 'react';
import { ViewTab } from './types';
import { GovernanceProvider, useGovernance } from './context/GovernanceContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SummaryView } from './components/SummaryView';
import { ReadinessScanView } from './components/ReadinessScanView';
import { UseCaseAssessorView } from './components/UseCaseAssessorView';
import { RiskAssessorView } from './components/RiskAssessorView';
import { InventoryExplorerView } from './components/InventoryExplorerView';
import { LawInspectorView } from './components/LawInspectorView';
import { OrganizationManagerView } from './components/OrganizationManagerView';
import { AIGeneratorStudioView } from './components/AIGeneratorStudioView';
import { UserGuideView } from './components/UserGuideView';
import { JobRedesignView } from './components/JobRedesignView';
import { ExportModal } from './components/ExportModal';
import { CheckCircle2, Save } from 'lucide-react';

function MainLayout() {
  const [activeTab, setActiveTab] = useState<ViewTab>('summary');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { systems, saveNotification } = useGovernance();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#E4E3E0] text-[#141414] font-sans border-4 md:border-8 border-[#141414] relative">
      {/* Toast Save Notification */}
      {saveNotification && (
        <div className="fixed top-4 right-4 z-50 bg-[#141414] text-white px-4 py-2.5 shadow-2xl border-2 border-amber-500 font-mono text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* High Density Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemCount={systems.length}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <Header
          activeTab={activeTab}
          onOpenExport={() => setIsExportOpen(true)}
          systemCount={systems.length}
        />

        {/* Tab View Switcher */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'summary' && <SummaryView />}
          {activeTab === 'readiness' && <ReadinessScanView />}
          {activeTab === 'usecase' && <UseCaseAssessorView />}
          {activeTab === 'risk' && <RiskAssessorView />}
          {activeTab === 'inventory' && <InventoryExplorerView />}
          {activeTab === 'law' && <LawInspectorView />}
          {activeTab === 'org_manager' && <OrganizationManagerView />}
          {activeTab === 'ai_generator' && <AIGeneratorStudioView />}
          {activeTab === 'guide' && <UserGuideView />}
          {activeTab === 'job_redesign' && <JobRedesignView />}
        </main>
      </div>

      {/* Export / Raw Data Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <GovernanceProvider>
      <MainLayout />
    </GovernanceProvider>
  );
}
