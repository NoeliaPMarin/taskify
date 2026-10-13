import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  placeholder?: string;
  minLength?: number;
  hint?: string;
}

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  autoComplete,
  placeholder = "Enter your password",
  minLength,
  hint,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-primaryText">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          minLength={minLength}
          required
          placeholder={placeholder}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4 pr-12 text-primaryText outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-0 right-0 grid w-12 place-items-center text-secondaryText transition hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
      {hint && <p id={`${id}-hint`} className="mt-2 text-sm text-secondaryText">{hint}</p>}
    </div>
  );
}
