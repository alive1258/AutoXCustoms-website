"use client";

import { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import { toast } from "react-toastify";

import {
  BloodGroup,
  PatientGender,
  PrescriptionExaminationItem,
} from "@/src/types/prescriptionType";
import {
  BmiCalculatorModal,
  BsaCalculatorModal,
  cmToFeetInches,
  feetInchesToCm,
  HeightInputs,
  IbwCalculatorModal,
  ZScoreCalculatorModal,
} from "./VitalsCalculatorModals";

interface OnExaminationModalProps {
  isOpen: boolean;
  initialItems: PrescriptionExaminationItem[];
  patientGender?: PatientGender;
  onClose: () => void;
  onSave: (items: PrescriptionExaminationItem[]) => void;
}

type CalculatorKey = "bmi" | "bsa" | "ibw" | "z_score";

const BLOOD_GROUPS: BloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const emptyDraft = {
  blood_group: "" as BloodGroup | "",
  height_ft: "",
  height_in: "",
  weight_kg: "",
  z_score: "",
  note: "",
};

const inputClass =
  "rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-emerald-600";

const OnExaminationModal: React.FC<OnExaminationModalProps> = ({
  isOpen,
  initialItems,
  patientGender,
  onClose,
  onSave,
}) => {
  const [addedItems, setAddedItems] = useState<PrescriptionExaminationItem[]>(
    [],
  );

  const [draft, setDraft] = useState(emptyDraft);
  const [bpInput, setBpInput] = useState("");
  const [tempInput, setTempInput] = useState("");
  const [pulseInput, setPulseInput] = useState("");
  const [bpReadings, setBpReadings] = useState<number[]>([]);
  const [temperatureReadings, setTemperatureReadings] = useState<number[]>(
    [],
  );
  const [pulseReadings, setPulseReadings] = useState<number[]>([]);
  const [openCalculator, setOpenCalculator] = useState<CalculatorKey | null>(
    null,
  );

  const [calculated, setCalculated] = useState<{
    bmi?: number;
    bmi_category?: string;
    bsa?: number;
    ibw?: number;
  } | null>(null);

  const resetDraft = () => {
    setDraft(emptyDraft);
    setBpInput("");
    setTempInput("");
    setPulseInput("");
    setBpReadings([]);
    setTemperatureReadings([]);
    setPulseReadings([]);
    setCalculated(null);
    setOpenCalculator(null);
  };

  // Reset to a clean slate every time the modal opens, seeded with whatever
  // is already on the prescription so re-opening doesn't lose earlier panels.
  useEffect(() => {
    if (!isOpen) return;
    setAddedItems(initialItems);
    resetDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleAddBp = () => {
    const value = Number(bpInput);
    if (!bpInput.trim() || Number.isNaN(value)) return;
    setBpReadings((prev) => [...prev, value]);
    setBpInput("");
  };

  const handleAddTemperature = () => {
    const value = Number(tempInput);
    if (!tempInput.trim() || Number.isNaN(value)) return;
    setTemperatureReadings((prev) => [...prev, value]);
    setTempInput("");
  };

  const handleAddPulse = () => {
    const value = Number(pulseInput);
    if (!pulseInput.trim() || Number.isNaN(value)) return;
    setPulseReadings((prev) => [...prev, value]);
    setPulseInput("");
  };

  const currentHeightCm = () =>
    feetInchesToCm(Number(draft.height_ft) || 0, Number(draft.height_in) || 0);

  const buildDraftItem = (): PrescriptionExaminationItem | null => {
    const heightCm = currentHeightCm() || undefined;
    const weightKg = draft.weight_kg ? Number(draft.weight_kg) : undefined;
    const zScore = draft.z_score ? Number(draft.z_score) : undefined;

    const hasAnyData =
      draft.blood_group ||
      heightCm ||
      weightKg ||
      bpReadings.length ||
      temperatureReadings.length ||
      pulseReadings.length ||
      zScore ||
      draft.note.trim();

    if (!hasAnyData) return null;

    return {
      blood_group: draft.blood_group || undefined,
      height_cm: heightCm,
      weight_kg: weightKg,
      bp_readings: bpReadings.length ? bpReadings : undefined,
      temperature_readings: temperatureReadings.length
        ? temperatureReadings
        : undefined,
      pulse_readings: pulseReadings.length ? pulseReadings : undefined,
      bmi: calculated?.bmi,
      bmi_category: calculated?.bmi_category,
      bsa: calculated?.bsa,
      ibw: calculated?.ibw,
      z_score: zScore,
      note: draft.note.trim() || undefined,
    };
  };

  const handleAddAnotherItem = () => {
    const item = buildDraftItem();
    if (!item) {
      toast.error("Add at least one examination detail first.");
      return;
    }
    setAddedItems((prev) => [...prev, item]);
    resetDraft();
  };

  const handleRemoveAdded = (index: number) => {
    setAddedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Auto-capture an in-progress draft so a doctor who fills the form and
    // clicks Save directly (without clicking "Add Another Item" first)
    // doesn't lose it.
    const draftItem = buildDraftItem();
    const finalItems = draftItem ? [...addedItems, draftItem] : addedItems;

    onSave(finalItems);
    toast.success("Examination findings saved.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-base font-semibold text-black">
            On Examination
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* Blood group + Height + Weight */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Blood Group
              </label>
              <select
                value={draft.blood_group}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    blood_group: e.target.value as BloodGroup | "",
                  }))
                }
                className={inputClass}
              >
                <option value="">Select Blood Group...</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
              {draft.blood_group && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="flex items-center gap-1 rounded-full border border-gray-300 px-2.5 py-1 text-xs text-gray-700">
                    {draft.blood_group}
                    <button
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({ ...prev, blood_group: "" }))
                      }
                      aria-label="Clear blood group"
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                </div>
              )}
            </div>

            <HeightInputs
              ft={draft.height_ft}
              inch={draft.height_in}
              onFtChange={(v) =>
                setDraft((prev) => ({ ...prev, height_ft: v }))
              }
              onInchChange={(v) =>
                setDraft((prev) => ({ ...prev, height_in: v }))
              }
            />

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Weight (kg)
              </label>
              <input
                type="number"
                min={0}
                value={draft.weight_kg}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, weight_kg: e.target.value }))
                }
                placeholder="Weight"
                className={inputClass}
              />
            </div>
          </div>

          {/* B.P / Temperature / Pulse — press Enter to add */}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                B.P (mmHg)
              </label>
              <input
                type="number"
                value={bpInput}
                onChange={(e) => setBpInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBp();
                  }
                }}
                placeholder="Enter B.P (Press Enter to add)"
                className={inputClass}
              />
              {bpReadings.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {bpReadings.map((reading, index) => (
                    <span
                      key={`${reading}-${index}`}
                      className="flex items-center gap-1 rounded-full border border-gray-300 px-2.5 py-1 text-xs text-gray-700"
                    >
                      {reading} mmHg
                      <button
                        type="button"
                        onClick={() =>
                          setBpReadings((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        aria-label={`Remove B.P reading ${reading}`}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Temperature (°F)
              </label>
              <input
                type="number"
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTemperature();
                  }
                }}
                placeholder="Enter Temperature (Press Enter to add)"
                className={inputClass}
              />
              {temperatureReadings.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {temperatureReadings.map((reading, index) => (
                    <span
                      key={`${reading}-${index}`}
                      className="flex items-center gap-1 rounded-full border border-gray-300 px-2.5 py-1 text-xs text-gray-700"
                    >
                      {reading}°F
                      <button
                        type="button"
                        onClick={() =>
                          setTemperatureReadings((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        aria-label={`Remove temperature reading ${reading}`}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Pulse (beats/min)
              </label>
              <input
                type="number"
                value={pulseInput}
                onChange={(e) => setPulseInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddPulse();
                  }
                }}
                placeholder="Enter Pulse (Press Enter to add)"
                className={inputClass}
              />
              {pulseReadings.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {pulseReadings.map((reading, index) => (
                    <span
                      key={`${reading}-${index}`}
                      className="flex items-center gap-1 rounded-full border border-gray-300 px-2.5 py-1 text-xs text-gray-700"
                    >
                      {reading}
                      <button
                        type="button"
                        onClick={() =>
                          setPulseReadings((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        aria-label={`Remove pulse reading ${reading}`}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Calculate */}
          <div className="mt-4 rounded-lg border border-gray-200 p-3">
            <p className="text-sm font-medium text-gray-700">Calculate</p>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <button
                type="button"
                onClick={() => setOpenCalculator("bmi")}
                className="rounded-md bg-gray-50 p-2 text-center transition hover:bg-gray-100"
              >
                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                  BMI
                </p>
                <p className="text-sm font-semibold text-black">
                  {calculated?.bmi ?? "—"}
                </p>
                {calculated?.bmi_category && (
                  <p className="text-[10px] text-gray-500">
                    {calculated.bmi_category}
                  </p>
                )}
              </button>

              <button
                type="button"
                onClick={() => setOpenCalculator("bsa")}
                className="rounded-md bg-gray-50 p-2 text-center transition hover:bg-gray-100"
              >
                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                  BSA
                </p>
                <p className="text-sm font-semibold text-black">
                  {calculated?.bsa !== undefined
                    ? `${calculated.bsa} m²`
                    : "—"}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setOpenCalculator("ibw")}
                className="rounded-md bg-gray-50 p-2 text-center transition hover:bg-gray-100"
              >
                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                  IBW
                </p>
                <p className="text-sm font-semibold text-black">
                  {calculated?.ibw !== undefined
                    ? `${calculated.ibw} kg`
                    : "—"}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setOpenCalculator("z_score")}
                className="rounded-md bg-gray-50 p-2 text-center transition hover:bg-gray-100"
              >
                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                  Z-Score
                </p>
                <p className="text-sm font-semibold text-black">
                  {draft.z_score || "—"}
                </p>
              </button>
            </div>
          </div>

          {/* Note */}
          <input
            value={draft.note}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, note: e.target.value }))
            }
            placeholder="Add note..."
            className={`mt-3 w-full ${inputClass}`}
          />

          <button
            type="button"
            onClick={handleAddAnotherItem}
            className="mt-3 flex items-center gap-1 rounded-md border border-emerald-600 px-3 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
          >
            <Plus size={14} />
            Add Another Item
          </button>

          {/* Added list */}
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700">
              Added Findings ({addedItems.length} Item
              {addedItems.length === 1 ? "" : "s"})
            </p>
            {addedItems.length === 0 ? (
              <p className="mt-1 text-sm italic text-gray-400">
                No examination findings added yet.
              </p>
            ) : (
              <ul className="mt-2 divide-y divide-gray-100 rounded-lg border border-gray-200">
                {addedItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium text-black">
                        {[
                          item.blood_group,
                          item.height_cm
                            ? (() => {
                                const { ft, inch } = cmToFeetInches(
                                  item.height_cm,
                                );
                                return `${ft} ft ${inch} in`;
                              })()
                            : null,
                          item.weight_kg ? `${item.weight_kg} kg` : null,
                        ]
                          .filter(Boolean)
                          .join(" · ") || "Vitals"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {[
                          item.bp_readings?.length
                            ? `BP: ${item.bp_readings.join(", ")} mmHg`
                            : null,
                          item.temperature_readings?.length
                            ? `Temp: ${item.temperature_readings.join(", ")}°F`
                            : null,
                          item.pulse_readings?.length
                            ? `Pulse: ${item.pulse_readings.join(", ")}`
                            : null,
                          item.bmi ? `BMI: ${item.bmi}` : null,
                        ]
                          .filter(Boolean)
                          .join(" · ") || "—"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAdded(index)}
                      className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
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

      {openCalculator === "bmi" && (
        <BmiCalculatorModal
          initialHeightFt={draft.height_ft}
          initialHeightIn={draft.height_in}
          initialWeightKg={draft.weight_kg}
          onCancel={() => setOpenCalculator(null)}
          onAdd={({ bmi, bmi_category, heightFt, heightIn, weightKg }) => {
            setDraft((prev) => ({
              ...prev,
              height_ft: heightFt,
              height_in: heightIn,
              weight_kg: weightKg,
            }));
            setCalculated((prev) => ({ ...prev, bmi, bmi_category }));
            setOpenCalculator(null);
          }}
        />
      )}

      {openCalculator === "bsa" && (
        <BsaCalculatorModal
          initialHeightFt={draft.height_ft}
          initialHeightIn={draft.height_in}
          initialWeightKg={draft.weight_kg}
          onCancel={() => setOpenCalculator(null)}
          onAdd={({ bsa, heightFt, heightIn, weightKg }) => {
            setDraft((prev) => ({
              ...prev,
              height_ft: heightFt,
              height_in: heightIn,
              weight_kg: weightKg,
            }));
            setCalculated((prev) => ({ ...prev, bsa }));
            setOpenCalculator(null);
          }}
        />
      )}

      {openCalculator === "ibw" && (
        <IbwCalculatorModal
          initialHeightFt={draft.height_ft}
          initialHeightIn={draft.height_in}
          patientGender={patientGender}
          onCancel={() => setOpenCalculator(null)}
          onAdd={({ ibw, heightFt, heightIn }) => {
            setDraft((prev) => ({
              ...prev,
              height_ft: heightFt,
              height_in: heightIn,
            }));
            setCalculated((prev) => ({ ...prev, ibw }));
            setOpenCalculator(null);
          }}
        />
      )}

      {openCalculator === "z_score" && (
        <ZScoreCalculatorModal
          initialHeightFt={draft.height_ft}
          initialHeightIn={draft.height_in}
          initialWeightKg={draft.weight_kg}
          onCancel={() => setOpenCalculator(null)}
          onAdd={({ zScore, heightFt, heightIn, weightKg }) => {
            setDraft((prev) => ({
              ...prev,
              height_ft: heightFt,
              height_in: heightIn,
              weight_kg: weightKg,
              z_score: String(zScore),
            }));
            setOpenCalculator(null);
          }}
        />
      )}
    </div>
  );
};

export default OnExaminationModal;
