import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Upload, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CalendarIcon, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from "date-fns";

interface SimpleFormFieldProps {
  form: any;
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  valueType?: string;
  framework?: { value: string; label: string }[];
  step?: number;
  min?: number | string;
  max?: number | string;
}

export default function SimpleFormField({
  form,
  type,
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  className,
  valueType,
  framework,
  step,
  min,
  max,
}: SimpleFormFieldProps) {
  const [open, setOpen] = useState(false);

  switch (type.toLowerCase()) {
    case "file":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field: { value, onChange, ...fieldProps } }) => {
            const [fileName, setFileName] = useState<string | null>(null);

            const handleFileChange = (
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              const file = e.target.files?.[0];
              if (file) {
                setFileName(file.name);
                onChange(file);
              }
            };

            const clearFile = () => {
              setFileName(null);
              onChange(null);
            };

            return (
              <FormItem className={className}>
                <FormLabel className="text-black dark:text-white">
                  {label} {required && <Required />}
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    {!fileName ? (
                      <div className="flex items-center">
                        <Input
                          type="file"
                          id={`file-${name}`}
                          onChange={handleFileChange}
                          className="hidden"
                          disabled={disabled}
                          accept={placeholder}
                          {...fieldProps}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-dashed flex items-center justify-center gap-2"
                          onClick={() =>
                            document.getElementById(`file-${name}`)?.click()
                          }
                          disabled={disabled}
                        >
                          <Upload className="w-5 h-5" />
                          <span>Click to upload {valueType || "file"}</span>
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full flex truncate items-center justify-between gap-2"
                        disabled={disabled}
                      >
                        <span className="truncate max-w-32">{fileName}</span>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            clearFile();
                          }}
                          className="flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                          <span className="sr-only">Remove file</span>
                        </div>
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-semibold" />
              </FormItem>
            );
          }}
        />
      );
    case "dimension":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel className="text-black dark:text-white">
                {label} {required && <Required />}
              </FormLabel>
              <FormControl>
                <div className="flex">
                  <Input
                    type="number"
                    {...field}
                    placeholder={placeholder}
                    className="w-full rounded-r-none"
                    disabled={disabled}
                    step={step}
                    min={min}
                    max={max}
                  />
                  <span className="flex items-center justify-center py-1.5 px-2.5 text-sm border rounded-r-sm bg-zinc-200 dark:bg-zinc-700">
                    {valueType}
                  </span>
                </div>
              </FormControl>
              <FormMessage className="text-xs font-semibold" />
            </FormItem>
          )}
        />
      );
    case "date":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel className="text-black dark:text-white">
                {label} {required && <Required />}
              </FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-medium",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date...</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date: any) => {
                      if (date) {
                        field.onChange(date.toLocaleDateString("en-CA"));
                      }
                      setOpen(false);
                    }}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs font-semibold" />
            </FormItem>
          )}
        />
      );

    case "popover-select":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel className="text-black dark:text-white">
                {label} {required && <Required />}
              </FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      disabled={disabled}
                      className={cn(
                        "justify-between w-full font-medium",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <span className="truncate">
                        {field.value
                          ? framework?.find(
                              (option) => option.value === field.value
                            )?.label
                          : placeholder || "Select option"}
                      </span>
                      <ChevronDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="p-2 w-[var(--radix-popover-trigger-width)] min-w-48 max-w-[800px]"
                  align="start"
                >
                  <Command>
                    <CommandInput placeholder={`Search ${label}...`} />
                    <CommandList className="max-h-[300px] overflow-y-auto">
                      <CommandEmpty>No option found.</CommandEmpty>
                      <CommandGroup>
                        {framework?.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.label}
                            onSelect={(currentValue) => {
                              const selectedOption = framework.find(
                                (opt) =>
                                  opt.label.toLowerCase() ===
                                  currentValue.toLowerCase()
                              );
                              if (
                                selectedOption &&
                                selectedOption.value !== field.value
                              ) {
                                form.setValue(name, selectedOption.value);
                                form.clearErrors(name);
                              }
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === option.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <span className="truncate">{option.label}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs font-semibold" />
            </FormItem>
          )}
        />
      );

    default:
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel className="text-black dark:text-white">
                {label} {required && <Required />}
              </FormLabel>
              <FormControl>
                <Input
                  type={type}
                  {...field}
                  placeholder={placeholder}
                  className="w-full"
                  disabled={disabled}
                  max={max}
                  min={min}
                />
              </FormControl>
              <FormMessage className="text-xs font-semibold" />
            </FormItem>
          )}
        />
      );
  }
}

const Required = () => <span className="text-red-500">*</span>;
