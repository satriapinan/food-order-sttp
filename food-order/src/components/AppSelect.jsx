const AppSelect = ({ label, value, onChange, options = [], placeholder = "Pilih opsi" }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
      {label && (
        <label style={{ fontWeight: 700, color: "#334155" }}>{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: "10px",
          border: "1px solid #cbd5e1",
          background: "white",
          boxSizing: "border-box",
          color: "#0f172a",
          fontSize: "14px",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AppSelect;
