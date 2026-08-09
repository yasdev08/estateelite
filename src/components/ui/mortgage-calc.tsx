"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Info } from "lucide-react";
import { cn, calculateMortgage, formatPrice } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";

interface MortgageCalcProps {
  price: number;
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
  isDark: boolean;
}

function Slider({ label, value, min, max, step, format, onChange, isDark }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className={cn("text-xs font-semibold", isDark ? "text-slate-400" : "text-slate-500")}>
          {label}
        </span>
        <span className="text-sm font-bold text-gold">{format(value)}</span>
      </div>
      <div className="relative h-1.5 rounded-full" style={{ background: isDark ? "#1e293b" : "#e2e8f0" }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gold-gradient"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          aria-label={label}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold border-2 border-white shadow-gold pointer-events-none transition-transform hover:scale-125"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

export function MortgageCalc({ price }: MortgageCalcProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const result = useMemo(
    () => calculateMortgage({ price, downPaymentPercent: downPct, interestRate: rate, termYears: term }),
    [price, downPct, rate, term]
  );

  const breakdown = [
    { label: "Loan Amount", value: formatPrice(result.loanAmount) },
    { label: "Down Payment", value: formatPrice(result.downPayment) },
    { label: "Total Interest", value: formatPrice(result.totalInterest) },
    { label: "Total Cost", value: formatPrice(result.totalPayment + result.downPayment) },
  ];

  return (
    <div className={cn(
      "rounded-2xl border p-6 space-y-6",
      isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
    )}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
          <Calculator className="w-4.5 h-4.5 text-gold" />
        </div>
        <h3 className={cn("font-bold text-base", isDark ? "text-white" : "text-slate-900")}>
          Mortgage Calculator
        </h3>
      </div>

      {/* Sliders */}
      <div className="space-y-5">
        <Slider
          label="Down Payment"
          value={downPct}
          min={5}
          max={60}
          step={5}
          format={(v) => `${v}%  (${formatPrice(price * v / 100)})`}
          onChange={setDownPct}
          isDark={isDark}
        />
        <Slider
          label="Interest Rate"
          value={rate}
          min={2}
          max={12}
          step={0.1}
          format={(v) => `${v.toFixed(1)}% APR`}
          onChange={setRate}
          isDark={isDark}
        />
        <Slider
          label="Loan Term"
          value={term}
          min={10}
          max={30}
          step={5}
          format={(v) => `${v} years`}
          onChange={setTerm}
          isDark={isDark}
        />
      </div>

      {/* Monthly payment highlight */}
      <motion.div
        layout
        className="rounded-xl overflow-hidden bg-gold-gradient p-5 text-center"
      >
        <div className="text-white/70 text-xs font-bold tracking-widest uppercase mb-1">
          Monthly Payment
        </div>
        <motion.div
          key={Math.round(result.monthlyPayment)}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-4xl font-black tracking-tight"
        >
          {formatPrice(result.monthlyPayment)}
        </motion.div>
        <div className="text-white/60 text-xs mt-1">
          Principal + interest only
        </div>
      </motion.div>

      {/* Breakdown */}
      <div className={cn(
        "rounded-xl border divide-y text-sm",
        isDark ? "border-slate-700 divide-slate-700" : "border-slate-100 divide-slate-100"
      )}>
        {breakdown.map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center px-4 py-3">
            <span className={cn(isDark ? "text-slate-400" : "text-slate-500")}>{label}</span>
            <span className={cn("font-semibold", isDark ? "text-slate-200" : "text-slate-800")}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className={cn(
        "flex gap-2 text-xs leading-relaxed",
        isDark ? "text-slate-600" : "text-slate-400"
      )}>
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        Estimates are for illustrative purposes only. Consult a licensed mortgage professional for accurate figures including taxes, insurance, and HOA.
      </div>
    </div>
  );
}
