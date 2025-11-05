import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ColorPickerField({ name, value, onChange, label }) {
  return (
    <div className="space-y-1">
      <FormField
        name="metaColor"
        render={({ field, fieldState }) => {
          const { ref, value, onChange, onBlur, name, ...restField } = field;
          return (
            <div className="space-y-1">
              <Label htmlFor={name}>{label}</Label>
              <Input
                {...restField}
                id={name}
                name={name}
                type="color"
                {...field}
                className="w-12 h-12 p-0"
                value={value}
                onChange={onChange}
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
