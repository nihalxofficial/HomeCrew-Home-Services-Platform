"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  TextField,
  Input,
  Label,
  FieldError,
  TextArea,
  Select,
  ListBox,
} from "@heroui/react";
import {
  FaArrowLeft, FaArrowRight, FaCheckCircle, FaTimes, FaPlus,
  FaImage, FaClock, FaDollarSign, FaBroom, FaWrench, FaHammer,
  FaBug, FaUserGraduate, FaScrewdriver, FaBolt, FaTv, FaSeedling,
  FaSpinner, FaInfoCircle, FaList, FaEye,
} from "react-icons/fa";
import { User } from "@/types";
import { addService } from "@/lib/action/services";
import { toast } from "react-toastify";

/* ──────────────────────────── Constants ──────────────────────────── */

const CATEGORIES = [
  { id: "cleaning",         name: "Cleaning",            icon: <FaBroom /> },
  { id: "repair",           name: "Repair & Maintenance", icon: <FaWrench /> },
  { id: "home-improvement", name: "Home Improvement",     icon: <FaHammer /> },
  { id: "pest-control",     name: "Pest Control",         icon: <FaBug /> },
  { id: "tutoring",         name: "Tutoring",             icon: <FaUserGraduate /> },
  { id: "installation",     name: "Installation",         icon: <FaScrewdriver /> },
  { id: "electrical",       name: "Electrical",           icon: <FaBolt /> },
  { id: "tv-mounting",      name: "TV Mounting",          icon: <FaTv /> },
  { id: "gardening",        name: "Gardening",            icon: <FaSeedling /> },
];

const STEPS = [
  { label: "Basic Info",     icon: <FaInfoCircle /> },
  { label: "Pricing",        icon: <FaDollarSign /> },
  { label: "Details",        icon: <FaList /> },
  { label: "Preview",        icon: <FaEye /> },
];

/* ─── Shared class tokens ─── */
const FIELD = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all";
const LBL   = "block text-sm font-semibold text-gray-700 mb-1.5";
const ERR   = "text-red-500 text-xs mt-1";

/* ──────────────────────────── Chip ──────────────────────────── */

function Chip({ label, color, onRemove }: { label: string; color: "green" | "blue" | "purple"; onRemove: () => void }) {
  const cls = { green: "bg-green-50 text-green-700 border-green-200", blue: "bg-blue-50 text-blue-700 border-blue-200", purple: "bg-purple-50 text-purple-700 border-purple-200" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full border font-medium ${cls[color]}`}>
      {label}
      <button type="button" onClick={onRemove} className="cursor-pointer opacity-60 hover:opacity-100 hover:text-red-500 transition-all">
        <FaTimes />
      </button>
    </span>
  );
}

/* ──────────────────────────── Main Component ──────────────────────────── */
export interface CreatorProps{
  creator: User | null,
}

export default function AddServicePage({creator} : CreatorProps) {
  const router = useRouter();
  const [step, setStep]           = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Step-level form data snapshots (collected via Object.fromEntries on each step's Form)
  const [stepData, setStepData]   = useState<Record<string, FormDataEntryValue>>({});

  // List fields (not covered by FormData natively)
  const [included, setIncluded]   = useState<string[]>([]);
  const [tags, setTags]           = useState<string[]>([]);
  const [cities, setCities]       = useState<string[]>([]);

  // Temporary input values for list fields
  const [newIncluded, setNewIncluded] = useState("");
  const [newTag, setNewTag]           = useState("");
  const [newCity, setNewCity]         = useState("");

  /* ── Step progression ── */

  const goNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Collect this step's named inputs all at once
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStepData((prev) => ({ ...prev, ...data }));
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Final submit ── */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lastStepData = Object.fromEntries(new FormData(e.currentTarget));
    const finalData = {
      ...stepData,
      ...lastStepData,
      whatsIncluded: included,
      tags,
      availableCities: cities,
      price: Number(stepData.price),
      creatorId: creator?.id,
    };
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    // console.log("Service Created:", finalData);
    const result = await addService(finalData);
    if(result.title){
      setIsSuccess(true);
      router.push("/my-services");
    }
    if(result.success===false){
      toast.error("Service couldn't added!")
    }
    setIsSubmitting(false);
    setTimeout(() => router.push("/"), 2500);
  };

  /* ── List helpers ── */
  const addItem = (list: string[], setList: (v: string[]) => void, val: string, clear: () => void) => {
    if (!val.trim()) return;
    setList([...list, val.trim()]);
    clear();
  };
  const removeItem = (list: string[], setList: (v: string[]) => void, i: number) =>
    setList(list.filter((_, idx) => idx !== i));

  /* ── Step Indicator ── */
  const StepBar = () => (
    <div className="flex items-center justify-center gap-1.5 mb-8">
      {STEPS.map((s, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 cursor-default
            ${i === step   ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-110"
            : i < step     ? "bg-green-100 text-green-600"
                           : "bg-gray-100 text-gray-400"}`}
          >
            {i < step ? <FaCheckCircle className="text-green-500" /> : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-10 h-0.5 transition-all duration-300 ${i < step ? "bg-green-500" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );

  /* ── Select trigger reused style ── */
  const selectTrigger = "w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all";
  const listItem = "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 cursor-pointer outline-none hover:bg-green-50 hover:text-green-700 data-[selected=true]:bg-green-50 data-[selected=true]:text-green-700 data-[focused=true]:bg-gray-50 transition-colors";

  /* ──────────── Success ──────────── */
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border border-green-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
            <FaCheckCircle className="text-4xl text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Added!</h2>
          <p className="text-gray-500 mb-6">Your service is now live. Redirecting…</p>
          <button onClick={() => router.push("/")} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold cursor-pointer hover:shadow-lg transition-all">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  /* ──────────── Page Shell ──────────── */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 md:py-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 group cursor-pointer transition-colors">
          <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold text-white mb-3">
            <FaPlus className="text-[10px]" /> New Service
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Add a New Service</h1>
          <p className="text-emerald-100/80 text-sm">Step {step + 1} of {STEPS.length} — {STEPS[step].label}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 md:p-8">
          <StepBar />

          {/* ══════════ STEP 0 — Basic Info ══════════ */}
          {step === 0 && (
            <Form onSubmit={goNext} className="space-y-5">
              <TextField name="title" isRequired>
                <Label className={LBL}>Service Title <span className="text-red-500">*</span></Label>
                <Input className={FIELD} placeholder="e.g., Premium Home Deep Cleaning" defaultValue={stepData.title as string} />
                <FieldError className={ERR} />
              </TextField>

              {/* Category */}
              <div>
                <label className={LBL}>Category <span className="text-red-500">*</span></label>
                <Select
                  name="category"
                  isRequired
                  selectedKey={(stepData.category as string) || null}
                  onSelectionChange={(key) => setStepData((p) => ({ ...p, category: String(key) }))}
                  placeholder="Select a category"
                  className="w-full"
                >
                  <Select.Trigger className={selectTrigger}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="z-50 w-[--trigger-width] rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                    <ListBox className="p-1 max-h-60 overflow-y-auto">
                      {CATEGORIES.map((cat) => (
                        <ListBox.Item key={cat.id} id={cat.id} textValue={cat.name} className={listItem}>
                          <span className="text-green-500">{cat.icon}</span>
                          <span>{cat.name}</span>
                          <ListBox.ItemIndicator className="ml-auto text-green-500" />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField name="shortDescription" isRequired>
                <div className="flex justify-between items-center mb-1.5">
                  <Label className="text-sm font-semibold text-gray-700">Short Description <span className="text-red-500">*</span></Label>
                  <span className="text-xs text-gray-400">{((stepData.shortDescription as string) || "").length}/100</span>
                </div>
                <Input
                  className={FIELD}
                  placeholder="One-liner about the service (max 100 chars)"
                  maxLength={100}
                  defaultValue={stepData.shortDescription as string}
                  onChange={(e) => setStepData((p) => ({ ...p, shortDescription: e.target.value }))}
                />
                <FieldError className={ERR} />
              </TextField>

              <TextField name="fullDescription" isRequired>
                <Label className={LBL}>Full Description <span className="text-red-500">*</span></Label>
                <TextArea className={`${FIELD} min-h-[110px] resize-none`} placeholder="Detailed description of the service…" defaultValue={stepData.fullDescription as string} />
                <FieldError className={ERR} />
              </TextField>

              <NavButtons step={step} onPrev={goPrev} />
            </Form>
          )}

          {/* ══════════ STEP 1 — Pricing ══════════ */}
          {step === 1 && (
            <Form onSubmit={goNext} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField name="price" isRequired>
                  <Label className={LBL}>Price ($) <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                    <Input type="number" className={`${FIELD} pl-9`} placeholder="0.00" min={0} step={0.01} defaultValue={stepData.price as string} />
                  </div>
                  <FieldError className={ERR} />
                </TextField>

                <div>
                  <label className={LBL}>Price Unit</label>
                  <Select
                    name="priceUnit"
                    selectedKey={(stepData.priceUnit as string) || "fixed"}
                    onSelectionChange={(key) => setStepData((p) => ({ ...p, priceUnit: String(key) }))}
                    className="w-full"
                  >
                    <Select.Trigger className={selectTrigger}>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="z-50 w-[--trigger-width] rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                      <ListBox className="p-1">
                        {[{ id: "fixed", label: "Fixed Price" }, { id: "hourly", label: "Hourly Rate" }].map((opt) => (
                          <ListBox.Item key={opt.id} id={opt.id} textValue={opt.label} className={listItem}>
                            {opt.label}
                            <ListBox.ItemIndicator className="ml-auto text-green-500" />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>

              <TextField name="duration" isRequired>
                <Label className={LBL}>Duration <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <FaClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                  <Input className={`${FIELD} pl-9`} placeholder="e.g., 3-4 hours, 2-3 days" defaultValue={stepData.duration as string} />
                </div>
                <FieldError className={ERR} />
              </TextField>

              <TextField name="imageUrl">
                <Label className={LBL}>Image URL</Label>
                <div className="relative">
                  <FaImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                  <Input className={`${FIELD} pl-9`} placeholder="https://images.unsplash.com/…" defaultValue={stepData.imageUrl as string} />
                </div>
                <FieldError className={ERR} />
              </TextField>

              <NavButtons step={step} onPrev={goPrev} />
            </Form>
          )}

          {/* ══════════ STEP 2 — Details ══════════ */}
          {step === 2 && (
            <Form onSubmit={goNext} className="space-y-6">
              {/* What's Included */}
              <ListSection
                label="What's Included"
                color="green"
                items={included}
                inputValue={newIncluded}
                onInputChange={setNewIncluded}
                onAdd={() => addItem(included, setIncluded, newIncluded, () => setNewIncluded(""))}
                onRemove={(i) => removeItem(included, setIncluded, i)}
                placeholder="e.g., All rooms deep cleaned"
              />

              {/* Tags */}
              <ListSection
                label="Tags"
                color="blue"
                items={tags}
                inputValue={newTag}
                onInputChange={setNewTag}
                onAdd={() => addItem(tags, setTags, newTag, () => setNewTag(""))}
                onRemove={(i) => removeItem(tags, setTags, i)}
                placeholder="e.g., Eco-Friendly"
              />

              {/* Cities */}
              <ListSection
                label="Available Cities"
                color="purple"
                items={cities}
                inputValue={newCity}
                onInputChange={setNewCity}
                onAdd={() => addItem(cities, setCities, newCity, () => setNewCity(""))}
                onRemove={(i) => removeItem(cities, setCities, i)}
                placeholder="e.g., New York"
              />

              <NavButtons step={step} onPrev={goPrev} />
            </Form>
          )}

          {/* ══════════ STEP 3 — Preview + Submit ══════════ */}
          {step === 3 && (
            <Form onSubmit={handleSubmit} className="space-y-6">
              {/* Preview Card */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  {stepData.imageUrl ? (
                    <img src={stepData.imageUrl as string} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-300">
                      <FaImage className="text-4xl" />
                      <span className="text-xs">No image</span>
                    </div>
                  )}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{(stepData.title as string) || "—"}</h3>
                    <span className="font-bold text-green-600">${String(stepData.price || "0")}{stepData.priceUnit === "hourly" && <span className="text-sm font-normal text-gray-500">/hr</span>}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">{(stepData.shortDescription as string) || "—"}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">{CATEGORIES.find(c => c.id === stepData.category)?.name || "No category"}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1"><FaClock className="text-[10px]" /> {(stepData.duration as string) || "—"}</span>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                      {tags.map((t, i) => <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[11px] rounded-full border border-blue-100">{t}</span>)}
                    </div>
                  )}
                </div>
              </div>


              {/* Nav + Submit */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <button type="button" onClick={goPrev} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm cursor-pointer hover:bg-gray-50 transition-all">
                  <FaArrowLeft className="text-xs" /> Previous
                </button>
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm cursor-pointer hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100">
                  {isSubmitting ? <><FaSpinner className="animate-spin" /> Creating…</> : <><FaCheckCircle /> Create Service</>}
                </button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────── Reusable sub-components ──────────── */

function NavButtons({ step, onPrev }: { step: number; onPrev: () => void }) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <button
        type="button"
        onClick={onPrev}
        disabled={step === 0}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm cursor-pointer hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <FaArrowLeft className="text-xs" /> Previous
      </button>
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm cursor-pointer hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all"
      >
        Next <FaArrowRight className="text-xs" />
      </button>
    </div>
  );
}

function ListSection({
  label, color, items, inputValue, onInputChange, onAdd, onRemove, placeholder,
}: {
  label: string;
  color: "green" | "blue" | "purple";
  items: string[];
  inputValue: string;
  onInputChange: (v: string) => void;
  onAdd: () => void;
  onRemove: (i: number) => void;
  placeholder: string;
}) {
  const FIELD = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all";
  const LBL   = "block text-sm font-semibold text-gray-700 mb-1.5";
  return (
    <div>
      <label className={LBL}>{label}</label>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAdd(); } }}
          placeholder={placeholder}
          className={`${FIELD} flex-1`}
        />
        <button
          type="button"
          onClick={onAdd}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl cursor-pointer hover:shadow-md hover:shadow-green-500/30 transition-all"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <Chip key={i} label={item} color={color} onRemove={() => onRemove(i)} />
        ))}
      </div>
    </div>
  );
}