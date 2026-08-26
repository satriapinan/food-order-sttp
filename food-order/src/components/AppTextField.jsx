const AppTextField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  style = {},
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontWeight: "700",
            color: "#1e3a8a",
          }}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: "10px",
          border: "1px solid #cbd5e1",
          outline: "none",
          fontSize: "0.98rem",
          boxSizing: "border-box",
          background: "#fff",
          ...style,
        }}
      />
    </div>
  );
};

export default AppTextField;
