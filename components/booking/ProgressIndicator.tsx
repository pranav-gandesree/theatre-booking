"use client"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="mt-6 rounded-xl border bg-card p-4">
      <h3 className="font-medium">Booking Progress</h3>
      <div className="mt-2 space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{percentage}% Complete</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted">
          <div className="h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  )
}

