import { useEffect } from "react";

const Example = () => {
  useEffect(() => {
    console.log("Komponen pertama kali dimuat");
  }, []);

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#1e3a8a" }}>Contoh useEffect</h2>
      <p>useEffect ini berjalan hanya sekali saat komponen pertama kali dimuat.</p>
    </div>
  );
};

export default Example;
