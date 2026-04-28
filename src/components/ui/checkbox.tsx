import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <input
        type="checkbox"
        ref={ref}
        className="sr-only"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        {...props}
      />
      <div 
        onClick={() => setChecked(!checked)}
        className={cn(
          "h-4 w-4 rounded-sm border border-gray-800 flex items-center justify-center transition-all cursor-pointer",
          checked ? "bg-blue-600 border-blue-600" : "bg-transparent",
          className
        )}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
