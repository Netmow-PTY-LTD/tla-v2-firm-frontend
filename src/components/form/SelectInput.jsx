'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function SelectInput({
  name,
  label,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  triggerClassName = '',
  itemClassName = '',
  labelClassName = '',
  textColor = 'text-black',
  onValueChange, // new prop
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={itemClassName}>
            {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
            <FormControl>
              <Select
                disabled={disabled}
                // onValueChange={field.onChange}
                onValueChange={(val) => {
                  field.onChange(val); // maintain react-hook-form behavior
                  if (onValueChange) onValueChange(val); // call external handler
                }}
                value={field.value ?? ''}
              >
                <SelectTrigger
                  className={clsx(
                    'bg-white h-[48px]',
                    textColor,
                    triggerClassName
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}






// --------------------------------- with watch mood logic select input  ------------------------------


// 'use client';

// import React, { useEffect } from 'react';
// import { useFormContext } from 'react-hook-form';
// import clsx from 'clsx';
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '../ui/form';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select';

// export default function SelectInput({
//   name,
//   label,
//   options = [],
//   placeholder = 'Select an option',
//   disabled = false,
//   triggerClassName = '',
//   itemClassName = '',
//   labelClassName = '',
//   textColor = 'text-black',
//   onValueChange, // external handler
//   dependentOn, // optional: parent field to watch
// }) {
//   const { control, watch, setValue } = useFormContext();

//   // Watch parent field if dependentOn is provided
//   const parentValue = dependentOn ? watch(dependentOn) : null;

//   // Reset this field when parent changes
//   useEffect(() => {
//     if (dependentOn) {
//       setValue(name, null);
//       if (onValueChange) onValueChange(null); // propagate reset to parent
//     }
//   }, [parentValue]);

//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => {
//         return (
//           <FormItem className={itemClassName}>
//             {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
//             <FormControl>
//               <Select
//                 disabled={disabled}
//                 value={field.value ?? ''}
//                 onValueChange={(val) => {
//                   field.onChange(val); // maintain RHF behavior
//                   if (onValueChange) onValueChange(val); // external handler
//                 }}
//               >
//                 <SelectTrigger
//                   className={clsx('bg-white h-[48px]', textColor, triggerClassName)}
//                 >
//                   <SelectValue placeholder={placeholder} />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {options?.map((opt) => (
//                     <SelectItem key={opt.value} value={opt.value}>
//                       {opt.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         );
//       }}
//     />
//   );
// }
