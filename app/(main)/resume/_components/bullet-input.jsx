"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

const MAX_ITEMS = 5

const BulletInput = ({ label, value = [], onChange, placeholder }) => {
  const addItem = () => {
    if (value.length < MAX_ITEMS) {
      onChange([...value, ""])
    }
  }

  const updateItem = (index, newValue) => {
    const updated = [...value]
    updated[index] = newValue
    onChange(updated)
  }

  const removeItem = (index) => {
    const updated = value.filter((_, i) => i !== index)
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-orange-200">{label}</h3>

      {value.map((item, index) => (
        <div key={index} className="flex gap-2 items-start">
          <Input
            value={item}
            maxLength={200}
            placeholder={placeholder}
            onChange={(e) => updateItem(index, e.target.value)}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {value.length < MAX_ITEMS && (
        <Button type="button" variant="outline" onClick={addItem}>
          + Add Point
        </Button>
      )}

    </div>
  )
}

export default BulletInput
