export default function Input({ label, register, name, type='text', required }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...register(name, { required })}
        type={type}
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
