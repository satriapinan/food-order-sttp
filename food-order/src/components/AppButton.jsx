const AppButton = ({ onClick, children }) => {
  return (
    <button className="app-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default AppButton;