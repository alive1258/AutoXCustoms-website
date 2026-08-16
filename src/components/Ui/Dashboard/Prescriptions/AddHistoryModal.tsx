"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import {
  DrugHistoryItem,
  FamilyHistoryItem,
  MedicalHistoryItem,
  OncologicHistoryItem,
  OtNoteItem,
  PrescriptionHistoryFields,
  SurgicalHistoryItem,
  TitledHistoryItem,
} from "@/src/types/historyType";
import {
  DrugHistoryTab,
  FamilyHistoryTab,
  MedicalHistoryTab,
  OncologicHistoryTab,
  OtNotesTab,
  SurgicalHistoryTab,
  TitledHistoryTab,
} from "./HistoryForms";

interface AddHistoryModalProps {
  isOpen: boolean;
  initialHistory: PrescriptionHistoryFields;
  onClose: () => void;
  onSave: (history: PrescriptionHistoryFields) => void;
}

type HistoryTabKey =
  | "medical"
  | "drug"
  | "family"
  | "allergy"
  | "social"
  | "surgical"
  | "sexual"
  | "travel"
  | "oncologic"
  | "ot_notes";

const TABS: { key: HistoryTabKey; navLabel: string; headerLabel: string }[] = [
  { key: "medical", navLabel: "Medical", headerLabel: "Medical History" },
  { key: "drug", navLabel: "Drug", headerLabel: "Drug History" },
  { key: "family", navLabel: "Family", headerLabel: "Family History" },
  { key: "allergy", navLabel: "Allergy", headerLabel: "Allergy History" },
  { key: "social", navLabel: "Social", headerLabel: "Social Habit" },
  { key: "surgical", navLabel: "Surgical", headerLabel: "Past Surgical History" },
  { key: "sexual", navLabel: "Sexual", headerLabel: "Sexual History" },
  { key: "travel", navLabel: "Travel", headerLabel: "Travel History" },
  { key: "oncologic", navLabel: "Oncologic", headerLabel: "Oncologic Therapies" },
  { key: "ot_notes", navLabel: "OT Notes", headerLabel: "OT Notes" },
];

const emptyHistory: Required<PrescriptionHistoryFields> = {
  medical_history: [],
  drug_history: [],
  family_history: [],
  allergy_history: [],
  social_history: [],
  surgical_history: [],
  sexual_history: [],
  travel_history: [],
  oncologic_history: [],
  ot_notes: [],
};

const AddHistoryModal: React.FC<AddHistoryModalProps> = ({
  isOpen,
  initialHistory,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<HistoryTabKey>("medical");

  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryItem[]>([]);
  const [drugHistory, setDrugHistory] = useState<DrugHistoryItem[]>([]);
  const [familyHistory, setFamilyHistory] = useState<FamilyHistoryItem[]>([]);
  const [allergyHistory, setAllergyHistory] = useState<TitledHistoryItem[]>([]);
  const [socialHistory, setSocialHistory] = useState<TitledHistoryItem[]>([]);
  const [surgicalHistory, setSurgicalHistory] = useState<SurgicalHistoryItem[]>([]);
  const [sexualHistory, setSexualHistory] = useState<TitledHistoryItem[]>([]);
  const [travelHistory, setTravelHistory] = useState<TitledHistoryItem[]>([]);
  const [oncologicHistory, setOncologicHistory] = useState<OncologicHistoryItem[]>([]);
  const [otNotes, setOtNotes] = useState<OtNoteItem[]>([]);

  // Reset to a clean slate every time the modal opens, seeded with whatever
  // is already on the prescription so re-opening doesn't lose earlier entries.
  useEffect(() => {
    if (!isOpen) return;
    setActiveTab("medical");
    setMedicalHistory(initialHistory.medical_history ?? emptyHistory.medical_history);
    setDrugHistory(initialHistory.drug_history ?? emptyHistory.drug_history);
    setFamilyHistory(initialHistory.family_history ?? emptyHistory.family_history);
    setAllergyHistory(initialHistory.allergy_history ?? emptyHistory.allergy_history);
    setSocialHistory(initialHistory.social_history ?? emptyHistory.social_history);
    setSurgicalHistory(initialHistory.surgical_history ?? emptyHistory.surgical_history);
    setSexualHistory(initialHistory.sexual_history ?? emptyHistory.sexual_history);
    setTravelHistory(initialHistory.travel_history ?? emptyHistory.travel_history);
    setOncologicHistory(initialHistory.oncologic_history ?? emptyHistory.oncologic_history);
    setOtNotes(initialHistory.ot_notes ?? emptyHistory.ot_notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSave = () => {
    onSave({
      medical_history: medicalHistory.length ? medicalHistory : undefined,
      drug_history: drugHistory.length ? drugHistory : undefined,
      family_history: familyHistory.length ? familyHistory : undefined,
      allergy_history: allergyHistory.length ? allergyHistory : undefined,
      social_history: socialHistory.length ? socialHistory : undefined,
      surgical_history: surgicalHistory.length ? surgicalHistory : undefined,
      sexual_history: sexualHistory.length ? sexualHistory : undefined,
      travel_history: travelHistory.length ? travelHistory : undefined,
      oncologic_history: oncologicHistory.length ? oncologicHistory : undefined,
      ot_notes: otNotes.length ? otNotes : undefined,
    });
    toast.success("History saved.");
    onClose();
  };

  if (!isOpen) return null;

  const activeTabMeta = TABS.find((t) => t.key === activeTab)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-base font-semibold text-black">
            {activeTabMeta.headerLabel}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[140px_1fr]">
          {/* Tab nav */}
          <nav className="flex shrink-0 gap-0.5 overflow-x-auto border-b border-gray-200 p-2 sm:flex-col sm:overflow-visible sm:border-b-0 sm:border-r">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 rounded-md px-3 py-2 text-left text-sm transition ${
                  activeTab === tab.key
                    ? "bg-emerald-600 font-medium text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.navLabel}
              </button>
            ))}
          </nav>

          {/* Active tab content */}
          <div className="min-h-0 overflow-y-auto p-4">
            {activeTab === "medical" && (
              <MedicalHistoryTab items={medicalHistory} onChange={setMedicalHistory} />
            )}
            {activeTab === "drug" && (
              <DrugHistoryTab items={drugHistory} onChange={setDrugHistory} />
            )}
            {activeTab === "family" && (
              <FamilyHistoryTab items={familyHistory} onChange={setFamilyHistory} />
            )}
            {activeTab === "allergy" && (
              <TitledHistoryTab
                items={allergyHistory}
                onChange={setAllergyHistory}
                label="Allergy History"
              />
            )}
            {activeTab === "social" && (
              <TitledHistoryTab
                items={socialHistory}
                onChange={setSocialHistory}
                label="Social Habit"
              />
            )}
            {activeTab === "surgical" && (
              <SurgicalHistoryTab items={surgicalHistory} onChange={setSurgicalHistory} />
            )}
            {activeTab === "sexual" && (
              <TitledHistoryTab
                items={sexualHistory}
                onChange={setSexualHistory}
                label="Sexual History"
              />
            )}
            {activeTab === "travel" && (
              <TitledHistoryTab
                items={travelHistory}
                onChange={setTravelHistory}
                label="Travel History"
              />
            )}
            {activeTab === "oncologic" && (
              <OncologicHistoryTab
                items={oncologicHistory}
                onChange={setOncologicHistory}
              />
            )}
            {activeTab === "ot_notes" && (
              <OtNotesTab items={otNotes} onChange={setOtNotes} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHistoryModal;
