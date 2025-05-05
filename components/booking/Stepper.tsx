"use client"

import { Check } from "lucide-react"

interface StepperProps {
  steps: string[]
  currentStep: number
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                currentStep > index + 1
                  ? "bg-primary text-primary-foreground border-primary"
                  : currentStep === index + 1
                    ? "border-primary text-primary"
                    : "border-muted-foreground text-muted-foreground"
              }`}
            >
              {currentStep > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
            </div>
            <span className={`mt-2 text-sm ${currentStep >= index + 1 ? "text-foreground" : "text-muted-foreground"}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted"></div>
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all"
          style={{ width: `${(currentStep - 1) * (100 / (steps.length - 1))}%` }}
        ></div>
      </div>
    </div>
  )
}

