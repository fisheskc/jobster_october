// This component is a reusable controlled input field.
// It accepts a value and an onChange handler from the parent component.

type FormRowProps = {
  type: string; // input type: text, email, password, etc.
  name: string; // field name (used for state updates)
  labelText: string; // label displayed above the input
  value: string; // controlled input value
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // parent onChange handler
}

export default function FormRow({ type, name, labelText, value, handleChange }: FormRowProps) {
  return (
    <div>
      <label htmlFor={name} className="block mb-1">
        {labelText || name}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        className="form-input w-full bg-blue-500/30 p-0.5 rounded-md"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};




