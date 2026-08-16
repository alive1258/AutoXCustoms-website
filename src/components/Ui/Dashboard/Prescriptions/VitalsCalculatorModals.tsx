"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

import { PatientGender } from "@/src/types/prescriptionType";
import { useCalculateVitalsMutation } from "@/src/redux/api/vitalsApi";

/** Individual per-metric calculators launched from the On Examination modal's
 * BMI/BSA/IBW/Z-Score tiles. BMI/BSA/IBW share the backend `/vitals/calculate`
 * endpoint (single formula source of truth) with a short debounce so results
 * update live as the doctor types, without a network call per keystroke.
 * Z-Score has no automatic calculation yet — see the module comment below. */

const DEBOUNCE_MS = 400;
const CM_PER_INCH = 2.54;

export const feetInchesToCm = (ft: number, inch: number): number =>
  (ft * 12 + inch) * CM_PER_INCH;

/** Inverse of feetInchesToCm — rounds total inches first so e.g. 11.6"
 * doesn't render as "0 ft 12 in" instead of carrying into "1 ft 0 in". */
export const cmToFeetInches = (cm: number): { ft: number; inch: number } => {
  const totalInches = Math.round(cm / CM_PER_INCH);
  return { ft: Math.floor(totalInches / 12), inch: totalInches % 12 };
};

const inputClass =
  "rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-emerald-600";

interface HeightInputsProps {
  ft: string;
  inch: string;
  onFtChange: (value: string) => void;
  onInchChange: (value: string) => void;
}

export const HeightInputs: React.FC<HeightInputsProps> = ({
  ft,
  inch,
  onFtChange,
  onInchChange,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-600">Height</label>
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={0}
        max={8}
        value={ft}
        onChange={(e) => onFtChange(e.target.value)}
        className={`w-16 ${inputClass}`}
      />
      <span className="text-xs text-gray-500">ft</span>
      <input
        type="number"
        min={0}
        max={11}
        value={inch}
        onChange={(e) => onInchChange(e.target.value)}
        className={`w-16 ${inputClass}`}
      />
      <span className="text-xs text-gray-500">in</span>
    </div>
  </div>
);

interface CalculatorModalShellProps {
  title: string;
  description: string;
  formula: string;
  onCancel: () => void;
  onAdd: () => void;
  addDisabled: boolean;
  children: React.ReactNode;
}

const CalculatorModalShell: React.FC<CalculatorModalShellProps> = ({
  title,
  description,
  formula,
  onCancel,
  onAdd,
  addDisabled,
  children,
}) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h3 className="text-base font-semibold text-black">{title}</h3>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>

      <div className="px-5 py-4">
        <p className="text-sm text-gray-600">{description}</p>
        <p className="mt-2 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-500">
          Formula: {formula}
        </p>

        <div className="mt-4 flex flex-col gap-3">{children}</div>
      </div>

      <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onAdd}
          disabled={addDisabled}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to Examination
        </button>
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// BMI
// ---------------------------------------------------------------------------

interface BmiCalculatorModalProps {
  initialHeightFt: string;
  initialHeightIn: string;
  initialWeightKg: string;
  onCancel: () => void;
  onAdd: (result: {
    bmi: number;
    bmi_category: string;
    heightFt: string;
    heightIn: string;
    weightKg: string;
  }) => void;
}

export const BmiCalculatorModal: React.FC<BmiCalculatorModalProps> = ({
  initialHeightFt,
  initialHeightIn,
  initialWeightKg,
  onCancel,
  onAdd,
}) => {
  const [heightFt, setHeightFt] = useState(initialHeightFt);
  const [heightIn, setHeightIn] = useState(initialHeightIn);
  const [weightKg, setWeightKg] = useState(initialWeightKg);
  const [result, setResult] = useState<{
    bmi: number;
    bmi_category: string;
  } | null>(null);
  const [calculateVitals, { isLoading }] = useCalculateVitalsMutation();

  useEffect(() => {
    const heightCm = feetInchesToCm(Number(heightFt) || 0, Number(heightIn) || 0);
    const weight = Number(weightKg);

    const timer = setTimeout(() => {
      if (!heightCm || !weight) {
        setResult(null);
        return;
      }

      calculateVitals({ height_cm: heightCm, weight_kg: weight })
        .unwrap()
        .then((res) => {
          if (res.data.bmi !== undefined && res.data.bmi_category) {
            setResult({ bmi: res.data.bmi, bmi_category: res.data.bmi_category });
          }
        })
        .catch(() => setResult(null));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [heightFt, heightIn, weightKg, calculateVitals]);

  return (
    <CalculatorModalShell
      title="BMI (Body Mass Index)"
      description="Calculate patient's BMI"
      formula="BMI = weight (kg) / height² (m)"
      onCancel={onCancel}
      addDisabled={!result}
      onAdd={() =>
        result && onAdd({ ...result, heightFt, heightIn, weightKg })
      }
    >
      <HeightInputs
        ft={heightFt}
        inch={heightIn}
        onFtChange={setHeightFt}
        onInchChange={setHeightIn}
      />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Weight (kg)</label>
        <input
          type="number"
          min={0}
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
        {isLoading ? (
          <span className="flex items-center gap-2 text-emerald-700">
            <Loader2 size={14} className="animate-spin" /> Calculating...
          </span>
        ) : result ? (
          `BMI: ${result.bmi} (${result.bmi_category})`
        ) : (
          "Enter height and weight"
        )}
      </div>
    </CalculatorModalShell>
  );
};

// ---------------------------------------------------------------------------
// BSA
// ---------------------------------------------------------------------------

interface BsaCalculatorModalProps {
  initialHeightFt: string;
  initialHeightIn: string;
  initialWeightKg: string;
  onCancel: () => void;
  onAdd: (result: {
    bsa: number;
    heightFt: string;
    heightIn: string;
    weightKg: string;
  }) => void;
}

export const BsaCalculatorModal: React.FC<BsaCalculatorModalProps> = ({
  initialHeightFt,
  initialHeightIn,
  initialWeightKg,
  onCancel,
  onAdd,
}) => {
  const [heightFt, setHeightFt] = useState(initialHeightFt);
  const [heightIn, setHeightIn] = useState(initialHeightIn);
  const [weightKg, setWeightKg] = useState(initialWeightKg);
  const [result, setResult] = useState<{ bsa: number } | null>(null);
  const [calculateVitals, { isLoading }] = useCalculateVitalsMutation();

  useEffect(() => {
    const heightCm = feetInchesToCm(Number(heightFt) || 0, Number(heightIn) || 0);
    const weight = Number(weightKg);

    const timer = setTimeout(() => {
      if (!heightCm || !weight) {
        setResult(null);
        return;
      }

      calculateVitals({ height_cm: heightCm, weight_kg: weight })
        .unwrap()
        .then((res) => {
          if (res.data.bsa !== undefined) setResult({ bsa: res.data.bsa });
        })
        .catch(() => setResult(null));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [heightFt, heightIn, weightKg, calculateVitals]);

  return (
    <CalculatorModalShell
      title="BSA (Body Surface Area)"
      description="Calculate patient's BSA"
      formula="BSA = √(height (cm) × weight (kg) / 3600)"
      onCancel={onCancel}
      addDisabled={!result}
      onAdd={() =>
        result && onAdd({ ...result, heightFt, heightIn, weightKg })
      }
    >
      <HeightInputs
        ft={heightFt}
        inch={heightIn}
        onFtChange={setHeightFt}
        onInchChange={setHeightIn}
      />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Weight (kg)</label>
        <input
          type="number"
          min={0}
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
        {isLoading ? (
          <span className="flex items-center gap-2 text-emerald-700">
            <Loader2 size={14} className="animate-spin" /> Calculating...
          </span>
        ) : result ? (
          `BSA: ${result.bsa} m²`
        ) : (
          "Enter height and weight"
        )}
      </div>
    </CalculatorModalShell>
  );
};

// ---------------------------------------------------------------------------
// IBW
// ---------------------------------------------------------------------------

interface IbwCalculatorModalProps {
  initialHeightFt: string;
  initialHeightIn: string;
  patientGender?: PatientGender;
  onCancel: () => void;
  onAdd: (result: { ibw: number; heightFt: string; heightIn: string }) => void;
}

export const IbwCalculatorModal: React.FC<IbwCalculatorModalProps> = ({
  initialHeightFt,
  initialHeightIn,
  patientGender,
  onCancel,
  onAdd,
}) => {
  const [heightFt, setHeightFt] = useState(initialHeightFt);
  const [heightIn, setHeightIn] = useState(initialHeightIn);
  const [result, setResult] = useState<{ ibw: number } | null>(null);
  const [calculateVitals, { isLoading }] = useCalculateVitalsMutation();

  const hasUsableGender =
    patientGender === "male" || patientGender === "female";

  useEffect(() => {
    const heightCm = feetInchesToCm(Number(heightFt) || 0, Number(heightIn) || 0);

    const timer = setTimeout(() => {
      if (!heightCm || !hasUsableGender) {
        setResult(null);
        return;
      }

      calculateVitals({ height_cm: heightCm, patient_gender: patientGender })
        .unwrap()
        .then((res) => {
          if (res.data.ibw !== undefined) setResult({ ibw: res.data.ibw });
        })
        .catch(() => setResult(null));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [heightFt, heightIn, hasUsableGender, patientGender, calculateVitals]);

  const baseKg = patientGender === "female" ? "45.5" : "50";

  return (
    <CalculatorModalShell
      title="Ideal Body Weight (IBW)"
      description="Calculate patient's IBW using Devine formula"
      formula={`${baseKg} kg + 2.3 kg × (height (in) - 60)`}
      onCancel={onCancel}
      addDisabled={!result}
      onAdd={() => result && onAdd({ ...result, heightFt, heightIn })}
    >
      <p className="text-xs text-gray-500">
        Patient Gender:{" "}
        <span className="font-medium text-gray-700">
          {hasUsableGender ? patientGender : "Not set"}
        </span>
      </p>

      <HeightInputs
        ft={heightFt}
        inch={heightIn}
        onFtChange={setHeightFt}
        onInchChange={setHeightIn}
      />

      {!hasUsableGender ? (
        <p className="rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
          Set the patient&apos;s gender in the form above to calculate IBW.
        </p>
      ) : (
        <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          {isLoading ? (
            <span className="flex items-center gap-2 text-emerald-700">
              <Loader2 size={14} className="animate-spin" /> Calculating...
            </span>
          ) : result ? (
            `IBW: ${result.ibw} kg`
          ) : (
            "Enter height"
          )}
        </div>
      )}
    </CalculatorModalShell>
  );
};

// ---------------------------------------------------------------------------
// Z-Score
// ---------------------------------------------------------------------------

interface ZScoreCalculatorModalProps {
  initialHeightFt: string;
  initialHeightIn: string;
  initialWeightKg: string;
  onCancel: () => void;
  onAdd: (result: {
    zScore: number;
    heightFt: string;
    heightIn: string;
    weightKg: string;
  }) => void;
}

/**
 * No automatic Weight-for-Age / Height-for-Age / Weight-for-Height
 * calculation yet — that needs WHO/CDC growth-chart LMS reference tables,
 * which deserve their own vetted dataset rather than a guessed one bolted
 * on here. This collects the same inputs a future automatic version would
 * need, but the score itself is manual entry for now.
 */
export const ZScoreCalculatorModal: React.FC<ZScoreCalculatorModalProps> = ({
  initialHeightFt,
  initialHeightIn,
  initialWeightKg,
  onCancel,
  onAdd,
}) => {
  const [heightFt, setHeightFt] = useState(initialHeightFt);
  const [heightIn, setHeightIn] = useState(initialHeightIn);
  const [weightKg, setWeightKg] = useState(initialWeightKg);
  const [ageMonths, setAgeMonths] = useState("");
  const [manualZScore, setManualZScore] = useState("");

  return (
    <CalculatorModalShell
      title="Z-Score Calculator"
      description="Calculate growth Z-scores for Weight-for-Age, Height-for-Age, and Weight-for-Height"
      formula="WHO/CDC growth-chart reference tables (not available yet)"
      onCancel={onCancel}
      addDisabled={!manualZScore.trim()}
      onAdd={() =>
        onAdd({
          zScore: Number(manualZScore),
          heightFt,
          heightIn,
          weightKg,
        })
      }
    >
      <HeightInputs
        ft={heightFt}
        inch={heightIn}
        onFtChange={setHeightFt}
        onInchChange={setHeightIn}
      />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Weight *</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className={`w-24 ${inputClass}`}
          />
          <span className="text-xs text-gray-500">kg</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Age (months) *
        </label>
        <input
          type="number"
          min={0}
          value={ageMonths}
          onChange={(e) => setAgeMonths(e.target.value)}
          className={inputClass}
        />
      </div>

      <p className="rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
        Automatic calculation isn&apos;t available yet. Enter a Z-score
        manually if you have one from another tool.
      </p>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Z-Score (manual)
        </label>
        <input
          type="number"
          step="0.01"
          value={manualZScore}
          onChange={(e) => setManualZScore(e.target.value)}
          placeholder="e.g. -0.5"
          className={inputClass}
        />
      </div>
    </CalculatorModalShell>
  );
};
