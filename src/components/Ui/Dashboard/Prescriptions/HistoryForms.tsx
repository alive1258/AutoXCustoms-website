"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Loader2, X } from "lucide-react";

import { ComplaintDurationUnit } from "@/src/types/prescriptionType";
import {
  DrugHistoryItem,
  FamilyHistoryItem,
  FamilyMember,
  MedicalHistoryItem,
  OncologicHistoryItem,
  OncologicTherapyCategory,
  OtNoteItem,
  SurgicalHistoryItem,
  TitledHistoryItem,
} from "@/src/types/historyType";
import { useGetQuickPickDiagnosesQuery } from "@/src/redux/api/diagnosesApi";
import { useLazySearchMedicinesQuery } from "@/src/redux/api/prescriptionApi";
import { useDebounce } from "@/src/hooks/useDebounce";

/** Ten tab bodies for the Add History modal. Each tab owns its own draft
 * input state and commits to the parent-held array via `onChange` — same
 * two-stage pattern (local draft -> array -> modal-level Save) already used
 * by ChiefComplaintsModal / OnExaminationModal. */

export const inputClass =
  "rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-emerald-600";

const addButtonClass =
  "flex w-fit items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50";

const DURATION_UNITS: ComplaintDurationUnit[] = ["day", "week", "month", "year"];
const DURATION_UNIT_LABELS: Record<ComplaintDurationUnit, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
  year: "Year",
};
const QUICK_DURATION_VALUES = Array.from({ length: 10 }, (_, i) => i + 1);
const DIAGNOSIS_SEARCH_MIN_LENGTH = 2;
const MEDICINE_SEARCH_MIN_LENGTH = 3;

// ---------------------------------------------------------------------------
// Shared presentational helpers
// ---------------------------------------------------------------------------

interface AddedListSectionProps {
  title: string;
  isEmpty: boolean;
  emptyLabel?: string;
  children: React.ReactNode;
}

export const AddedListSection: React.FC<AddedListSectionProps> = ({
  title,
  isEmpty,
  emptyLabel = "No items added yet.",
  children,
}) => (
  <div className="mt-2">
    <p className="text-sm font-semibold text-gray-700">{title}</p>
    {isEmpty ? (
      <p className="mt-1 text-sm italic text-gray-400">{emptyLabel}</p>
    ) : (
      <ul className="mt-2 divide-y divide-gray-100 rounded-lg border border-gray-200">
        {children}
      </ul>
    )}
  </div>
);

interface AddedListRowProps {
  onRemove: () => void;
  children: React.ReactNode;
}

export const AddedListRow: React.FC<AddedListRowProps> = ({
  onRemove,
  children,
}) => (
  <li className="flex items-start justify-between gap-3 px-3 py-2 text-sm">
    <div className="min-w-0 flex-1">{children}</div>
    <button
      type="button"
      onClick={onRemove}
      className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
    >
      <X size={16} />
    </button>
  </li>
);

interface DiagnosisPickerProps {
  selected: string | null;
  onSelect: (name: string) => void;
  searchPlaceholder: string;
}

const DiagnosisPicker: React.FC<DiagnosisPickerProps> = ({
  selected,
  onSelect,
  searchPlaceholder,
}) => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetQuickPickDiagnosesQuery();
  const quickPick = useMemo(() => data?.data ?? [], [data]);

  const isSearching = search.trim().length >= DIAGNOSIS_SEARCH_MIN_LENGTH;
  const filtered = useMemo(() => {
    if (!isSearching) return quickPick;
    const q = search.trim().toLowerCase();
    return quickPick.filter((name) => name.toLowerCase().includes(q));
  }, [quickPick, isSearching, search]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className={`w-full py-2 pl-9 pr-3 ${inputClass}`}
        />
      </div>

      <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto">
        {isLoading && <p className="text-sm text-gray-400">Loading...</p>}

        {!isLoading &&
          filtered.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => onSelect(name)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                selected === name
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {name}
            </button>
          ))}

        {!isLoading && isSearching && filtered.length === 0 && (
          <button
            type="button"
            onClick={() => onSelect(search.trim())}
            className="flex items-center gap-1 rounded-full border border-emerald-600 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
          >
            <Plus size={14} />
            Use &quot;{search.trim()}&quot;
          </button>
        )}
      </div>

      {selected && (
        <p className="text-sm text-gray-600">
          Selected: <span className="font-semibold text-black">{selected}</span>
        </p>
      )}
    </div>
  );
};

interface DurationPickerProps {
  value: number;
  isCustom: boolean;
  unit: ComplaintDurationUnit;
  onValueChange: (v: number) => void;
  onCustomToggle: (custom: boolean) => void;
  onUnitChange: (u: ComplaintDurationUnit) => void;
}

const DurationPicker: React.FC<DurationPickerProps> = ({
  value,
  isCustom,
  unit,
  onValueChange,
  onCustomToggle,
  onUnitChange,
}) => (
  <div>
    <div className="flex flex-wrap gap-1.5">
      {QUICK_DURATION_VALUES.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => {
            onCustomToggle(false);
            onValueChange(v);
          }}
          className={`h-8 w-8 rounded-md border text-sm transition ${
            !isCustom && value === v
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {v}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onCustomToggle(true)}
        className={`rounded-md border px-3 text-sm transition ${
          isCustom
            ? "border-emerald-600 bg-emerald-600 text-white"
            : "border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        Custom
      </button>
      {isCustom && (
        <input
          type="number"
          min={1}
          max={999}
          value={value}
          onChange={(e) => onValueChange(Number(e.target.value) || 1)}
          className="h-8 w-20 rounded-md border border-gray-300 px-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-emerald-600"
        />
      )}
    </div>
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {DURATION_UNITS.map((u) => (
        <button
          key={u}
          type="button"
          onClick={() => onUnitChange(u)}
          className={`rounded-md border px-3 py-1 text-sm transition ${
            unit === u
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {DURATION_UNIT_LABELS[u]}
        </button>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// 1. Medical History
// ---------------------------------------------------------------------------

interface MedicalHistoryTabProps {
  items: MedicalHistoryItem[];
  onChange: (items: MedicalHistoryItem[]) => void;
}

export const MedicalHistoryTab: React.FC<MedicalHistoryTabProps> = ({
  items,
  onChange,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const handleAdd = () => {
    if (!selected) return;
    onChange([...items, { diagnosis: selected, comment: comment.trim() || undefined }]);
    setSelected(null);
    setComment("");
  };

  const handleRemove = (index: number) =>
    onChange(items.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-3">
      <DiagnosisPicker
        selected={selected}
        onSelect={setSelected}
        searchPlaceholder="Search diagnoses (min 2 char)"
      />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Comment (Optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comment..."
          rows={2}
          className={inputClass}
        />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!selected}
        className={addButtonClass}
      >
        <Plus size={14} /> Add
      </button>

      <AddedListSection
        title={`Added Medical History (${items.length} Item${items.length === 1 ? "" : "s"})`}
        isEmpty={items.length === 0}
      >
        {items.map((item, index) => (
          <AddedListRow key={index} onRemove={() => handleRemove(index)}>
            <p className="font-medium text-black">{item.diagnosis}</p>
            {item.comment && (
              <p className="text-xs text-gray-500">Comment: {item.comment}</p>
            )}
          </AddedListRow>
        ))}
      </AddedListSection>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 2. Drug History
// ---------------------------------------------------------------------------

interface DrugHistoryTabProps {
  items: DrugHistoryItem[];
  onChange: (items: DrugHistoryItem[]) => void;
}

export const DrugHistoryTab: React.FC<DrugHistoryTabProps> = ({
  items,
  onChange,
}) => {
  const [name, setName] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [durationValue, setDurationValue] = useState(1);
  const [isCustomDuration, setIsCustomDuration] = useState(false);
  const [durationUnit, setDurationUnit] = useState<ComplaintDurationUnit>("day");

  const debouncedName = useDebounce(name, 350);
  const [triggerSearch, { data, isFetching }] = useLazySearchMedicinesQuery();
  const suggestions = data?.data ?? [];
  const showSuggestions =
    !dismissed && name.trim().length >= MEDICINE_SEARCH_MIN_LENGTH;

  useEffect(() => {
    const term = (debouncedName as string).trim();
    if (term.length >= MEDICINE_SEARCH_MIN_LENGTH) {
      triggerSearch(term);
    }
  }, [debouncedName, triggerSearch]);

  const handlePick = (medicine: string) => {
    setName(medicine);
    setDismissed(true);
  };

  const handleAdd = () => {
    const medicineName = name.trim();
    if (!medicineName) return;
    onChange([
      ...items,
      {
        medicine_name: medicineName,
        duration_value: durationValue,
        duration_unit: durationUnit,
      },
    ]);
    setName("");
    setDurationValue(1);
    setIsCustomDuration(false);
    setDurationUnit("day");
  };

  const handleRemove = (index: number) =>
    onChange(items.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setDismissed(false);
          }}
          placeholder={`Search medicines (min ${MEDICINE_SEARCH_MIN_LENGTH} char)`}
          className={`w-full ${inputClass}`}
        />
        {showSuggestions && (
          <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {isFetching && (
              <div className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500">
                <Loader2 size={12} className="animate-spin" />
                Searching...
              </div>
            )}
            {!isFetching && suggestions.length === 0 && (
              <div className="px-3 py-2 text-xs text-gray-400">
                No suggestions — you can still use this name as typed.
              </div>
            )}
            {!isFetching &&
              suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handlePick(s)}
                  className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-emerald-50"
                >
                  {s}
                </button>
              ))}
          </div>
        )}
      </div>

      <DurationPicker
        value={durationValue}
        isCustom={isCustomDuration}
        unit={durationUnit}
        onValueChange={setDurationValue}
        onCustomToggle={setIsCustomDuration}
        onUnitChange={setDurationUnit}
      />

      <button
        type="button"
        onClick={handleAdd}
        disabled={!name.trim()}
        className={addButtonClass}
      >
        <Plus size={14} /> Add
      </button>

      <AddedListSection
        title={`Added Drug History (${items.length} Item${items.length === 1 ? "" : "s"})`}
        isEmpty={items.length === 0}
      >
        {items.map((item, index) => (
          <AddedListRow key={index} onRemove={() => handleRemove(index)}>
            <p className="font-medium text-black">{item.medicine_name}</p>
            {item.duration_value && item.duration_unit && (
              <p className="text-xs text-gray-500">
                {item.duration_value} {DURATION_UNIT_LABELS[item.duration_unit]}(s)
              </p>
            )}
          </AddedListRow>
        ))}
      </AddedListSection>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 3. Family History
// ---------------------------------------------------------------------------

const FAMILY_MEMBERS: FamilyMember[] = [
  "father",
  "mother",
  "brother",
  "sister",
  "grandfather",
  "grandmother",
];
const FAMILY_MEMBER_LABELS: Record<FamilyMember, string> = {
  father: "Father",
  mother: "Mother",
  brother: "Brother",
  sister: "Sister",
  grandfather: "Grandfather",
  grandmother: "Grandmother",
};

interface FamilyHistoryTabProps {
  items: FamilyHistoryItem[];
  onChange: (items: FamilyHistoryItem[]) => void;
}

export const FamilyHistoryTab: React.FC<FamilyHistoryTabProps> = ({
  items,
  onChange,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [members, setMembers] = useState<FamilyMember[]>([]);

  const toggleMember = (m: FamilyMember) =>
    setMembers((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    );

  const handleAdd = () => {
    if (!selected) return;
    onChange([
      ...items,
      { diagnosis: selected, family_members: members.length ? members : undefined },
    ]);
    setSelected(null);
    setMembers([]);
  };

  const handleRemove = (index: number) =>
    onChange(items.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-3">
      <DiagnosisPicker
        selected={selected}
        onSelect={setSelected}
        searchPlaceholder="Search family history (min 2 char)"
      />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Family Members (Optional)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {FAMILY_MEMBERS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => toggleMember(m)}
              className={`rounded-md border px-3 py-1 text-sm transition ${
                members.includes(m)
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {FAMILY_MEMBER_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!selected}
        className={addButtonClass}
      >
        <Plus size={14} /> Add
      </button>

      <AddedListSection
        title={`Added Family History (${items.length} Item${items.length === 1 ? "" : "s"})`}
        isEmpty={items.length === 0}
      >
        {items.map((item, index) => (
          <AddedListRow key={index} onRemove={() => handleRemove(index)}>
            <p className="font-medium text-black">{item.diagnosis}</p>
            {!!item.family_members?.length && (
              <p className="text-xs text-gray-500">
                {item.family_members.map((m) => FAMILY_MEMBER_LABELS[m]).join(", ")}
              </p>
            )}
          </AddedListRow>
        ))}
      </AddedListSection>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 4. Shared "titled" history tab — Allergy / Social / Sexual / Travel
// ---------------------------------------------------------------------------

interface TitledHistoryTabProps {
  items: TitledHistoryItem[];
  onChange: (items: TitledHistoryItem[]) => void;
  label: string;
}

export const TitledHistoryTab: React.FC<TitledHistoryTabProps> = ({
  items,
  onChange,
  label,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onChange([
      ...items,
      {
        title: title.trim(),
        description: description.trim() || undefined,
        comment: comment.trim() || undefined,
      },
    ]);
    setTitle("");
    setDescription("");
    setComment("");
  };

  const handleRemove = (index: number) =>
    onChange(items.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`Enter ${label} title`}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          {label} Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          rows={2}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Add Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter comment"
          rows={2}
          className={inputClass}
        />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!title.trim()}
        className={addButtonClass}
      >
        <Plus size={14} /> Add
      </button>

      <AddedListSection
        title={`Added ${label} (${items.length} Item${items.length === 1 ? "" : "s"})`}
        isEmpty={items.length === 0}
      >
        {items.map((item, index) => (
          <AddedListRow key={index} onRemove={() => handleRemove(index)}>
            <p className="font-medium text-black">{item.title}</p>
            {item.description && (
              <p className="text-xs text-gray-500">{item.description}</p>
            )}
            {item.comment && (
              <p className="text-xs text-gray-500">Comment: {item.comment}</p>
            )}
          </AddedListRow>
        ))}
      </AddedListSection>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 5. Surgical History (Titled + therapy date)
// ---------------------------------------------------------------------------

interface SurgicalHistoryTabProps {
  items: SurgicalHistoryItem[];
  onChange: (items: SurgicalHistoryItem[]) => void;
}

export const SurgicalHistoryTab: React.FC<SurgicalHistoryTabProps> = ({
  items,
  onChange,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [therapyDate, setTherapyDate] = useState("");
  const [comment, setComment] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onChange([
      ...items,
      {
        title: title.trim(),
        description: description.trim() || undefined,
        therapy_date: therapyDate || undefined,
        comment: comment.trim() || undefined,
      },
    ]);
    setTitle("");
    setDescription("");
    setTherapyDate("");
    setComment("");
  };

  const handleRemove = (index: number) =>
    onChange(items.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Past Surgical History title"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Past Surgical History Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          rows={2}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Select a therapy date
        </label>
        <input
          type="date"
          value={therapyDate}
          onChange={(e) => setTherapyDate(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Add Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter comment"
          rows={2}
          className={inputClass}
        />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!title.trim()}
        className={addButtonClass}
      >
        <Plus size={14} /> Add
      </button>

      <AddedListSection
        title={`Added Past Surgical History (${items.length} Item${items.length === 1 ? "" : "s"})`}
        isEmpty={items.length === 0}
      >
        {items.map((item, index) => (
          <AddedListRow key={index} onRemove={() => handleRemove(index)}>
            <p className="font-medium text-black">{item.title}</p>
            {item.therapy_date && (
              <p className="text-xs text-gray-500">Date: {item.therapy_date}</p>
            )}
            {item.description && (
              <p className="text-xs text-gray-500">{item.description}</p>
            )}
            {item.comment && (
              <p className="text-xs text-gray-500">Comment: {item.comment}</p>
            )}
          </AddedListRow>
        ))}
      </AddedListSection>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 6. Oncologic Therapies
// ---------------------------------------------------------------------------

const ONCOLOGIC_CATEGORIES: { value: OncologicTherapyCategory; label: string }[] = [
  { value: "chemotherapy", label: "Chemotherapy" },
  { value: "radiotherapy", label: "Radiotherapy" },
  { value: "immunotherapy", label: "Immunotherapy" },
  { value: "hormonal_therapy", label: "Hormonal Therapy" },
  { value: "targeted_therapy", label: "Targeted Therapy" },
  { value: "surgery", label: "Surgery" },
  { value: "other", label: "Other" },
];

interface OncologicHistoryTabProps {
  items: OncologicHistoryItem[];
  onChange: (items: OncologicHistoryItem[]) => void;
}

export const OncologicHistoryTab: React.FC<OncologicHistoryTabProps> = ({
  items,
  onChange,
}) => {
  const [category, setCategory] = useState<OncologicTherapyCategory | "">("");
  const [description, setDescription] = useState("");
  const [therapyDate, setTherapyDate] = useState("");
  const [comment, setComment] = useState("");

  const handleAdd = () => {
    if (!category) return;
    onChange([
      ...items,
      {
        category,
        description: description.trim() || undefined,
        therapy_date: therapyDate || undefined,
        comment: comment.trim() || undefined,
      },
    ]);
    setCategory("");
    setDescription("");
    setTherapyDate("");
    setComment("");
  };

  const handleRemove = (index: number) =>
    onChange(items.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Select Category
        </label>
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as OncologicTherapyCategory | "")
          }
          className={inputClass}
        >
          <option value="">Select Category...</option>
          {ONCOLOGIC_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Oncologic Therapies Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          rows={2}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Select a therapy date
        </label>
        <input
          type="date"
          value={therapyDate}
          onChange={(e) => setTherapyDate(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Add Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter comment"
          rows={2}
          className={inputClass}
        />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!category}
        className={addButtonClass}
      >
        <Plus size={14} /> Add
      </button>

      <AddedListSection
        title={`Added Oncologic Therapies (${items.length} Item${items.length === 1 ? "" : "s"})`}
        isEmpty={items.length === 0}
      >
        {items.map((item, index) => (
          <AddedListRow key={index} onRemove={() => handleRemove(index)}>
            <p className="font-medium text-black">
              {ONCOLOGIC_CATEGORIES.find((c) => c.value === item.category)
                ?.label ?? item.category}
            </p>
            {item.therapy_date && (
              <p className="text-xs text-gray-500">Date: {item.therapy_date}</p>
            )}
            {item.description && (
              <p className="text-xs text-gray-500">{item.description}</p>
            )}
            {item.comment && (
              <p className="text-xs text-gray-500">Comment: {item.comment}</p>
            )}
          </AddedListRow>
        ))}
      </AddedListSection>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 7. OT Notes
// ---------------------------------------------------------------------------

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

interface OtNotesTabProps {
  items: OtNoteItem[];
  onChange: (items: OtNoteItem[]) => void;
}

export const OtNotesTab: React.FC<OtNotesTabProps> = ({ items, onChange }) => {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");
  const [operationName, setOperationName] = useState("");
  const [indicationName, setIndicationName] = useState("");
  const [anesthesiaType, setAnesthesiaType] = useState("");
  const [anaesthesiologistName, setAnaesthesiologistName] = useState("");
  const [surgeonName, setSurgeonName] = useState("");
  const [assistantSurgeonName, setAssistantSurgeonName] = useState("");

  const isValid = Boolean(
    date && hour && minute && operationName.trim() && indicationName.trim(),
  );

  const handleAdd = () => {
    if (!isValid) return;
    onChange([
      ...items,
      {
        date,
        time: `${hour}:${minute} ${ampm}`,
        operation_name: operationName.trim(),
        indication_name: indicationName.trim(),
        anesthesia_type: anesthesiaType.trim() || undefined,
        anaesthesiologist_name: anaesthesiologistName.trim() || undefined,
        surgeon_name: surgeonName.trim() || undefined,
        assistant_surgeon_name: assistantSurgeonName.trim() || undefined,
      },
    ]);
    setDate("");
    setHour("");
    setMinute("");
    setAmpm("AM");
    setOperationName("");
    setIndicationName("");
    setAnesthesiaType("");
    setAnaesthesiologistName("");
    setSurgeonName("");
    setAssistantSurgeonName("");
  };

  const handleRemove = (index: number) =>
    onChange(items.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Date: *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Time: *</label>
          <div className="flex items-center gap-1.5">
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className={inputClass}
            >
              <option value="">Hour</option>
              {HOURS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <span>:</span>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className={inputClass}
            >
              <option value="">Min</option>
              {MINUTES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={ampm}
              onChange={(e) => setAmpm(e.target.value as "AM" | "PM")}
              className={inputClass}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Name of the operation: *
        </label>
        <input
          value={operationName}
          onChange={(e) => setOperationName(e.target.value)}
          placeholder="Enter operation name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Name of the indication: *
        </label>
        <input
          value={indicationName}
          onChange={(e) => setIndicationName(e.target.value)}
          placeholder="Enter indication name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Type of Anesthesia:
        </label>
        <input
          value={anesthesiaType}
          onChange={(e) => setAnesthesiaType(e.target.value)}
          placeholder="Enter anesthesia type"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Name of the Anaesthesiologist:
        </label>
        <input
          value={anaesthesiologistName}
          onChange={(e) => setAnaesthesiologistName(e.target.value)}
          placeholder="Enter anaesthesiologist name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Name of the surgeon:
        </label>
        <input
          value={surgeonName}
          onChange={(e) => setSurgeonName(e.target.value)}
          placeholder="Enter surgeon name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Name of the Assistant Surgeon:
        </label>
        <input
          value={assistantSurgeonName}
          onChange={(e) => setAssistantSurgeonName(e.target.value)}
          placeholder="Enter assistant surgeon name"
          className={inputClass}
        />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!isValid}
        className={addButtonClass}
      >
        <Plus size={14} /> Add OT Notes
      </button>

      <div className="mt-2">
        <p className="text-sm font-semibold text-gray-700">Added OT Notes</p>
        {items.length === 0 ? (
          <div className="mt-2 flex flex-col items-center gap-1 rounded-lg border border-dashed border-gray-200 py-6 text-center text-sm text-gray-400">
            <span className="text-xl">📝</span>
            <span>No OT Notes Added Yet</span>
            <span className="text-xs">Add OT notes using the form above.</span>
          </div>
        ) : (
          <ul className="mt-2 divide-y divide-gray-100 rounded-lg border border-gray-200">
            {items.map((item, index) => (
              <AddedListRow key={index} onRemove={() => handleRemove(index)}>
                <p className="font-medium text-black">{item.operation_name}</p>
                <p className="text-xs text-gray-500">
                  {item.date} · {item.time} · {item.indication_name}
                </p>
                {(item.surgeon_name || item.anesthesia_type) && (
                  <p className="text-xs text-gray-500">
                    {[
                      item.surgeon_name ? `Surgeon: ${item.surgeon_name}` : null,
                      item.anesthesia_type
                        ? `Anesthesia: ${item.anesthesia_type}`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </AddedListRow>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
