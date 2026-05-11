import { useState } from "react";

const PASOS = ["Carrito", "Pago", "Comprobante"];

const carritoMock = [
  { nombre: "Nike Air Pegasus 40", talla: "42", color: "Negro/Blanco", precio: 420000 },
  { nombre: "Balón Adidas UCL", talla: "—", color: "Blanco", precio: 180000 },
];

function fmtCC(v) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function fmtExp(v) {
  return v.replace(/\D/g, "").slice(0, 4).replace(/(.{2})/, "$1/");
}

export default function RF5_Pagos() {
  const [paso, setPaso] = useState(0);
  const [form, setForm] = useState({ nombre: "", correo: "", cc: "", exp: "", cvv: "" });
  const [errores, setErrores] = useState({});
  const [procesando, setProcesando] = useState(false);
  const [folio, setFolio] = useState("");
  const [metodoPago, setMetodoPago] = useState("tarjeta");

  const total = carritoMock.reduce((a, p) => a + p.precio, 0);
  const iva = Math.round(total * 0.19);
  const totalConIva = total + iva;

  const handleChange = (k, v) => {
    let val = v;
    if (k === "cc") val = fmtCC(v);
    if (k === "exp") val = fmtExp(v);
    if (k === "cvv") val = v.replace(/\D/g, "").slice(0, 3);
    setForm(f => ({ ...f, [k]: val }));
    setErrores(e => ({ ...e, [k]: "" }));
  };

  const validar = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Campo requerido";
    if (!/^\S+@\S+\.\S+$/.test(form.correo)) e.correo = "Correo inválido";
    if (metodoPago === "tarjeta") {
      if (form.cc.replace(/\s/g, "").length < 16) e.cc = "Número de tarjeta inválido";
      if (form.exp.length < 5) e.exp = "Fecha inválida";
      if (form.cvv.length < 3) e.cvv = "CVV inválido";
    }
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const pagar = () => {
    if (!validar()) return;
    setProcesando(true);
    setTimeout(() => {
      setProcesando(false);
      setFolio("TXN-" + Math.random().toString(36).slice(2, 10).toUpperCase());
      setPaso(2);
    }, 2000);
  };

  const inputStyle = (k) => ({
    width: "100%", padding: "12px 14px",
    background: "#111", border: `1px solid ${errores[k] ? "#ef4444" : "#2a2a2a"}`,
    borderRadius: 10, color: "#f5f5f5", fontSize: 15, outline: "none",
    boxSizing: "border-box"
  });
  const labelStyle = { fontSize: 12, color: "#888", marginBottom: 4, display: "block", letterSpacing: 1 };

  return (
    <div style={{
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      background: "#0a0a0a",
      minHeight: "100vh",
      color: "#f5f5f5",
      padding: "32px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, color: "#a78bfa", letterSpacing: 4, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>RF5 · Cristhian Romero</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>Pasarela de Pagos</h1>
      </div>

      {/* Stepper */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 40, maxWidth: 500 }}>
        {PASOS.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: paso >= i ? "#7c3aed" : "#1e1e1e",
              border: `2px solid ${paso >= i ? "#a78bfa" : "#333"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 14, color: paso >= i ? "#fff" : "#555",
              flexShrink: 0
            }}>{paso > i ? "✓" : i + 1}</div>
            <div style={{ marginLeft: 10, marginRight: i < 2 ? 20 : 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: paso >= i ? "#f5f5f5" : "#555" }}>{p}</div>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 2, background: paso > i ? "#7c3aed" : "#222", marginRight: 20, borderRadius: 1 }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: paso === 2 ? "1fr" : "1fr 360px", gap: 28, maxWidth: paso === 2 ? 560 : "none" }}>

        {/* Panel izquierdo */}
        {paso === 0 && (
          <div style={{ background: "#141414", border: "1px solid #222", borderRadius: 20, padding: 28 }}>
            <div style={{ fontSize: 11, color: "#a78bfa", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>Tu Carrito</div>
            {carritoMock.map((p, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 0", borderBottom: "1px solid #1e1e1e"
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.nombre}</div>
                  <div style={{ color: "#888", fontSize: 12 }}>Talla: {p.talla} · Color: {p.color}</div>
                </div>
                <div style={{ color: "#a78bfa", fontWeight: 800 }}>${p.precio.toLocaleString("es-CO")}</div>
              </div>
            ))}
            <button onClick={() => setPaso(1)} style={{
              marginTop: 24, width: "100%", padding: "14px",
              background: "#7c3aed", border: "none", borderRadius: 12,
              color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer"
            }}>Continuar al Pago →</button>
          </div>
        )}

        {paso === 1 && (
          <div style={{ background: "#141414", border: "1px solid #222", borderRadius: 20, padding: 28 }}>
            <div style={{ fontSize: 11, color: "#a78bfa", letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>Información de Pago</div>

            {/* Método de pago */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              {[["tarjeta", "💳 Tarjeta"], ["pse", "🏦 PSE"], ["nequi", "📱 Nequi"]].map(([k, label]) => (
                <div key={k} onClick={() => setMetodoPago(k)} style={{
                  flex: 1, padding: "12px", textAlign: "center",
                  borderRadius: 12, cursor: "pointer",
                  background: metodoPago === k ? "rgba(124,58,237,0.2)" : "#1e1e1e",
                  border: `2px solid ${metodoPago === k ? "#7c3aed" : "#2a2a2a"}`,
                  fontWeight: 700, fontSize: 14, transition: "all 0.2s"
                }}>{label}</div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>NOMBRE COMPLETO</label>
                <input value={form.nombre} onChange={e => handleChange("nombre", e.target.value)} placeholder="Como aparece en la tarjeta" style={inputStyle("nombre")} />
                {errores.nombre && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errores.nombre}</div>}
              </div>
              <div>
                <label style={labelStyle}>CORREO ELECTRÓNICO</label>
                <input value={form.correo} onChange={e => handleChange("correo", e.target.value)} placeholder="correo@ejemplo.com" style={inputStyle("correo")} />
                {errores.correo && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errores.correo}</div>}
              </div>
              {metodoPago === "tarjeta" && <>
                <div>
                  <label style={labelStyle}>NÚMERO DE TARJETA</label>
                  <input value={form.cc} onChange={e => handleChange("cc", e.target.value)} placeholder="0000 0000 0000 0000" style={inputStyle("cc")} />
                  {errores.cc && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errores.cc}</div>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={labelStyle}>VENCIMIENTO</label>
                    <input value={form.exp} onChange={e => handleChange("exp", e.target.value)} placeholder="MM/AA" style={inputStyle("exp")} />
                    {errores.exp && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errores.exp}</div>}
                  </div>
                  <div>
                    <label style={labelStyle}>CVV</label>
                    <input value={form.cvv} onChange={e => handleChange("cvv", e.target.value)} placeholder="123" type="password" style={inputStyle("cvv")} />
                    {errores.cvv && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errores.cvv}</div>}
                  </div>
                </div>
              </>}
            </div>
            <button onClick={pagar} disabled={procesando} style={{
              marginTop: 24, width: "100%", padding: "16px",
              background: procesando ? "#4c1d95" : "#7c3aed",
              border: "none", borderRadius: 12, color: "#fff",
              fontWeight: 800, fontSize: 16, cursor: procesando ? "not-allowed" : "pointer",
              boxShadow: "0 4px 24px rgba(124,58,237,0.4)"
            }}>
              {procesando ? "⏳ Procesando..." : `💜 Pagar $${totalConIva.toLocaleString("es-CO")}`}
            </button>
          </div>
        )}

        {paso === 2 && (
          <div style={{
            background: "#141414", border: "1px solid #22c55e44",
            borderRadius: 20, padding: 40, textAlign: "center",
            boxShadow: "0 0 60px rgba(34,197,94,0.15)"
          }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
            <h2 style={{ color: "#22c55e", margin: "0 0 8px", fontSize: 28, fontWeight: 900 }}>¡Pago Exitoso!</h2>
            <p style={{ color: "#888", marginBottom: 28 }}>Tu comprobante ha sido enviado a <strong style={{ color: "#f5f5f5" }}>{form.correo}</strong></p>
            <div style={{ background: "#111", border: "1px dashed #333", borderRadius: 12, padding: 20, marginBottom: 28 }}>
              <div style={{ fontSize: 11, color: "#888", letterSpacing: 3, marginBottom: 8 }}>NÚMERO DE COMPROBANTE</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#a78bfa", letterSpacing: 2 }}>{folio}</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 8 }}>{new Date().toLocaleString("es-CO")}</div>
            </div>
            {carritoMock.map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1e1e1e", padding: "10px 0", textAlign: "left" }}>
                <span style={{ fontSize: 13 }}>{p.nombre}</span>
                <span style={{ color: "#a78bfa", fontWeight: 700 }}>${p.precio.toLocaleString("es-CO")}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontWeight: 900, fontSize: 16 }}>
              <span>Total pagado</span>
              <span style={{ color: "#22c55e" }}>${totalConIva.toLocaleString("es-CO")}</span>
            </div>
            <button onClick={() => { setPaso(0); setForm({ nombre: "", correo: "", cc: "", exp: "", cvv: "" }); setFolio(""); }} style={{
              marginTop: 16, padding: "12px 32px", background: "#1e2a1e",
              border: "1px solid #22c55e44", borderRadius: 10,
              color: "#22c55e", fontWeight: 700, cursor: "pointer"
            }}>← Volver al inicio</button>
          </div>
        )}

        {/* Resumen lateral (solo pasos 0 y 1) */}
        {paso < 2 && (
          <div style={{ background: "#141414", border: "1px solid #222", borderRadius: 20, padding: 24, height: "fit-content" }}>
            <div style={{ fontSize: 11, color: "#888", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>Resumen</div>
            {carritoMock.map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: "#aaa" }}>{p.nombre}</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>${p.precio.toLocaleString("es-CO")}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #222", paddingTop: 12, marginTop: 12 }}>
              {[["Subtotal", total], ["IVA 19%", iva]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "#888" }}>{k}</span>
                  <span style={{ fontSize: 13 }}>${v.toLocaleString("es-CO")}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, borderTop: "1px solid #333", paddingTop: 12 }}>
                <span style={{ fontWeight: 800, fontSize: 16 }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: 18, color: "#a78bfa" }}>${totalConIva.toLocaleString("es-CO")}</span>
              </div>
            </div>
            <div style={{ marginTop: 20, background: "#111", borderRadius: 10, padding: 12, display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>🔒</span>
              <span style={{ fontSize: 12, color: "#64748b" }}>Pago 100% seguro. Cifrado SSL 256-bit.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
