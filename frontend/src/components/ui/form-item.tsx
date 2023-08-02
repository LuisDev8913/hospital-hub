import { createContext, forwardRef, useContext, useId } from "react";
import LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/styling/utils";
import { Label } from "@/components/ui";
import { Slot } from "@radix-ui/react-slot";

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const useFormItem = () => {
  const formItemContext = useContext(FormItemContext);

  if (!formItemContext) {
    throw new Error("FormItemContext not found");
  }

  return formItemContext;
};

const FormLabel = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ ...props }, ref) => {
  const { id } = useFormItem();

  return <Label ref={ref} htmlFor={id} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { id } = useFormItem();

  return <Slot ref={ref} id={id} {...props} />;
});
FormControl.displayName = "FormControl";

export { FormItem, FormLabel, FormControl };
