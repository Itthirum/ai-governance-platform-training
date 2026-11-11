import React, { createContext, useContext, useState, useEffect } from 'react';
import { AISystemRecord } from '../types';
import { mockAISystems, determineGovernanceTrack } from '../data/inventoryData';

export interface OrgUnit {
  id: string;
  name_th: string;
  name_en?: string;
  executive_lead: string;
  contact_email: string;
  ai_systems_count: number;
}

export const initialOrgUnits: OrgUnit[] = [
  { id: 'ORG-01', name_th: 'ฝ่ายบริหารทรัพยากรบุคคล (HR)', executive_lead: 'นายวิชัย สุขเกษม (CHRO)', contact_email: 'hr-lead@company.co.th', ai_systems_count: 1 },
  { id: 'ORG-02', name_th: 'ฝ่ายบริหารความเสี่ยงสินเชื่อ', executive_lead: 'นายประเสริฐ เลิศวณิช (CRO)', contact_email: 'risk-lead@company.co.th', ai_systems_count: 1 },
  { id: 'ORG-03', name_th: 'ฝ่ายเทคโนโลยีสารสนเทศ (IT)', executive_lead: 'นายฉัตรชัย มีสุข (IT Director)', contact_email: 'it-lead@company.co.th', ai_systems_count: 1 },
  { id: 'ORG-04', name_th: 'ศูนย์บริการการแพทย์ดิจิทัล', executive_lead: 'ผศ.ดร.นพ.สมศักดิ์ นิมิต', contact_email: 'med-digital@hospital.or.th', ai_systems_count: 1 },
  { id: 'ORG-05', name_th: 'ฝ่ายกลยุทธ์และนวัตกรรมดิจิทัล', executive_lead: 'ดร.กิตติเดช จิตตรง (VP Strategy)', contact_email: 'innovation@company.co.th', ai_systems_count: 0 },
  { id: 'ORG-06', name_th: 'ฝ่ายบริการลูกค้าและคอลเซ็นเตอร์', executive_lead: 'นางสาวมณีรัตน์ แสงทอง (Head of CS)', contact_email: 'support@company.co.th', ai_systems_count: 0 },
];

const LOCAL_STORAGE_SYSTEMS_KEY = 'aigc_governance_systems_v2';
const LOCAL_STORAGE_ORGS_KEY = 'aigc_governance_orgs_v2';

interface GovernanceContextType {
  systems: AISystemRecord[];
  orgUnits: OrgUnit[];
  saveNotification: string | null;
  addSystem: (newSystem: AISystemRecord) => void;
  updateSystem: (updatedSystem: AISystemRecord) => void;
  deleteSystem: (system_id: string) => void;
  addOrgUnit: (newUnit: OrgUnit) => void;
  updateOrgUnit: (updatedUnit: OrgUnit) => void;
  deleteOrgUnit: (id: string) => void;
  resetToDefaults: () => void;
  triggerSaveNotification: (msg: string) => void;
}

const GovernanceContext = createContext<GovernanceContextType | undefined>(undefined);

export const GovernanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [systems, setSystems] = useState<AISystemRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SYSTEMS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load systems from localStorage:', e);
    }
    return mockAISystems;
  });

  const [orgUnits, setOrgUnits] = useState<OrgUnit[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load orgUnits from localStorage:', e);
    }
    return initialOrgUnits;
  });

  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  const triggerSaveNotification = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => {
      setSaveNotification(null);
    }, 4000);
  };

  // Sync to Local Storage on state change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SYSTEMS_KEY, JSON.stringify(systems));
    } catch (e) {
      console.error('Failed to save systems:', e);
    }
  }, [systems]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORGS_KEY, JSON.stringify(orgUnits));
    } catch (e) {
      console.error('Failed to save orgUnits:', e);
    }
  }, [orgUnits]);

  const addSystem = (newSystem: AISystemRecord) => {
    const updated = [newSystem, ...systems];
    setSystems(updated);
    triggerSaveNotification(`บันทึกข้อมูลระบบ "${newSystem.system_name_th}" (${newSystem.system_id}) ลง LocalStorage สำเร็จ`);
  };

  const updateSystem = (updatedSystem: AISystemRecord) => {
    const recalculatedTrack = determineGovernanceTrack(updatedSystem);
    const finalRecord = { ...updatedSystem, governance_track: recalculatedTrack };

    const updated = systems.map((s) => (s.system_id === finalRecord.system_id ? finalRecord : s));
    setSystems(updated);
    triggerSaveNotification(`ปรับปรุงและบันทึกข้อมูล 55 Fields ของ "${finalRecord.system_name_th}" สำเร็จ`);
  };

  const deleteSystem = (system_id: string) => {
    const updated = systems.filter((s) => s.system_id !== system_id);
    setSystems(updated);
    triggerSaveNotification(`ลบข้อมูลระบบ ${system_id} สำเร็จ`);
  };

  const addOrgUnit = (newUnit: OrgUnit) => {
    const updated = [...orgUnits, newUnit];
    setOrgUnits(updated);
    triggerSaveNotification(`เพิ่มและบันทึกหน่วยงาน "${newUnit.name_th}" ลงระบบสำเร็จ`);
  };

  const updateOrgUnit = (updatedUnit: OrgUnit) => {
    const updated = orgUnits.map((o) => (o.id === updatedUnit.id ? updatedUnit : o));
    setOrgUnits(updated);
    triggerSaveNotification(`ปรับปรุงและบันทึกหน่วยงาน "${updatedUnit.name_th}" สำเร็จ`);
  };

  const deleteOrgUnit = (id: string) => {
    const updated = orgUnits.filter((o) => o.id !== id);
    setOrgUnits(updated);
    triggerSaveNotification(`ลบข้อมูลหน่วยงานสำเร็จ`);
  };

  const resetToDefaults = () => {
    setSystems(mockAISystems);
    setOrgUnits(initialOrgUnits);
    localStorage.removeItem(LOCAL_STORAGE_SYSTEMS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_ORGS_KEY);
    triggerSaveNotification('รีเซ็ตข้อมูลเป็นค่าเริ่มต้นตั้งต้นเรียบร้อยแล้ว');
  };

  return (
    <GovernanceContext.Provider
      value={{
        systems,
        orgUnits,
        saveNotification,
        addSystem,
        updateSystem,
        deleteSystem,
        addOrgUnit,
        updateOrgUnit,
        deleteOrgUnit,
        resetToDefaults,
        triggerSaveNotification,
      }}
    >
      {children}
    </GovernanceContext.Provider>
  );
};

export const useGovernance = () => {
  const context = useContext(GovernanceContext);
  if (!context) {
    throw new Error('useGovernance must be used within a GovernanceProvider');
  }
  return context;
};
