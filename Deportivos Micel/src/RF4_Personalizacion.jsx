import { useState } from "react";

const producto = {
  nombre: "Nike Air Pegasus 40",
  precio: 420000,
  img: "👟",
  tallas: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
  colores: [
    { nombre: "Negro/Blanco", hex: "#1a1a1a", hex2: "#f5f5f5" },
    { nombre: "Azul Royal", hex: "#1d4ed8", hex2: "#93c5fd" },
    { nombre: "Rojo Carmín", hex: "#991b1b", hex2: "#fca5a5" },
    { nombre: "Verde Oliva", hex: "#365314", hex2: "#86efac" },
    { nombre: "Naranja Fire", hex: "#ea580c", hex2: "#fed7aa" },
  ],
  materiales: [
    { nombre: "Malla Transpirable", desc: "Ligero y ventilado, ideal para climas cálidos", extra: 0 },
    { nombre: "Cuero Sintético", desc: "Mayor durabilidad y protección ante el clima", extra: 30000 },
    { nombre: "Knit Tejido", desc: "Máximo confort y ajuste al pie, premium", extra: 60000 },
  ],
};

export default function RF4_Personalizacion() {
  const [talla, setTalla] = useState(null);
  const [color, setColor] = useState(null);
  const [material, setMaterial] = useState(null);
  const [confirmado, setConfirmado] = useState(false);

  const listo = talla && color !== null && material !== null;

  const precioFinal = producto.precio + (material !== null ? producto.materiales[material].extra : 0);

  const confirmar = () => {
    if (listo) setConfirmado(true);
  };

  if (confirmado) {
    const c = producto.colores[color];
    const m = producto.materiales[material];
    return (
      <div style={{
        fontFamily: "'Exo 2','Segoe UI',sans-serif",
        background: "#0f0f0f",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#f5f5f5"
      }}>
        <div style={{
          background: "#161616",
          border: "1px solid #22c55e44",
          borderRadius: 24,
          padding: 48,
          textAlign: "center",
          maxWidth: 420,
          boxShadow: "0 0 60px rgba(34,197,94,0.15)"
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
          <h2 style={{ color: "#22c55e", margin: "0 0 8px", fontSize: 24, fontWeight: 900 }}>¡Pedido Listo!</h2>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>{producto.nombre}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left", marginBottom: 28 }}>
            {[
              ["Talla", talla],
              ["Color", c.nombre],
              ["Material", m.nombre],
              ["Precio Final", `$${precioFinal.toLocaleString("es-CO")}`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #222", paddingBottom: 8 }}>
                <span style={{ color: "#888", fontSize: 13 }}>{k}</span>
                <span style={{ fontWeight: 700, color: k === "Precio Final" ? "#22c55e" : "#f5f5f5" }}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={() => { setConfirmado(false); setTalla(null); setColor(null); setMaterial(null); }} style={{
            padding: "12px 32px", background: "#1e3a2f",
            border: "1px solid #22c55e44", borderRadius: 12,
            color: "#22c55e", fontWeight: 700, cursor: "pointer", fontSize: 14
          }}>← Nueva Personalización</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "'Exo 2', 'Segoe UI', sans-serif",
      background: "#0f0f0f",
      minHeight: "100vh",
      color: "#f5f5f5",
      padding: "32px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, color: "#f97316", letterSpacing: 4, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>RF4 · Sebastian Cifuentes</div>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>Módulo de Personalización</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>
        {/* Selector de atributos */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

          {/* Producto base */}
          <div style={{
            background: "#161616", border: "1px solid #222",
            borderRadius: 16, padding: 24, display: "flex", alignItems: "center", gap: 20
          }}>
            <div style={{ fontSize: 72 }}>{producto.img}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{producto.nombre}</div>
              <div style={{ color: "#f97316", fontWeight: 700, fontSize: 18 }}>
                Desde ${producto.precio.toLocaleString("es-CO")}
              </div>
            </div>
          </div>

          {/* Tallas */}
          <div style={{ background: "#141414", border: "1px solid #222", borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 11, color: "#f97316", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
              1 · Selecciona tu Talla {talla && <span style={{ color: "#22c55e" }}>✓ {talla}</span>}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {producto.tallas.map(t => (
                <button key={t} onClick={() => setTalla(t)} style={{
                  width: 52, height: 52, borderRadius: 10,
                  background: talla === t ? "#f97316" : "#1e1e1e",
                  border: talla === t ? "2px solid #f97316" : "1px solid #333",
                  color: talla === t ? "#000" : "#e2e8f0",
                  fontWeight: 800, fontSize: 15, cursor: "pointer",
                  transition: "all 0.2s"
                }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Colores */}
          <div style={{ background: "#141414", border: "1px solid #222", borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 11, color: "#f97316", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
              2 · Elige el Color {color !== null && <span style={{ color: "#22c55e" }}>✓ {producto.colores[color].nombre}</span>}
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {producto.colores.map((c, i) => (
                <div key={i} onClick={() => setColor(i)} style={{
                  cursor: "pointer",
                  border: color === i ? "3px solid #f97316" : "3px solid transparent",
                  borderRadius: 14,
                  padding: 3,
                  transition: "all 0.2s"
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 10,
                    background: `linear-gradient(135deg, ${c.hex} 50%, ${c.hex2} 50%)`,
                    boxShadow: color === i ? "0 0 16px rgba(249,115,22,0.5)" : "none"
                  }} title={c.nombre} />
                  <div style={{ fontSize: 11, textAlign: "center", marginTop: 4, color: "#888" }}>{c.nombre.split("/")[0]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Materiales */}
          <div style={{ background: "#141414", border: "1px solid #222", borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 11, color: "#f97316", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
              3 · Selecciona el Material {material !== null && <span style={{ color: "#22c55e" }}>✓</span>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {producto.materiales.map((m, i) => (
                <div key={i} onClick={() => setMaterial(i)} style={{
                  padding: "16px 20px", borderRadius: 12, cursor: "pointer",
                  border: material === i ? "2px solid #f97316" : "1px solid #2a2a2a",
                  background: material === i ? "rgba(249,115,22,0.08)" : "#1a1a1a",
                  transition: "all 0.2s",
                  display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{m.nombre}</div>
                    <div style={{ color: "#888", fontSize: 13 }}>{m.desc}</div>
                  </div>
                  <div style={{ color: m.extra > 0 ? "#f97316" : "#22c55e", fontWeight: 800, fontSize: 14, whiteSpace: "nowrap" }}>
                    {m.extra > 0 ? `+$${m.extra.toLocaleString("es-CO")}` : "Base"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen */}
        <div style={{ position: "sticky", top: 32, height: "fit-content" }}>
          <div style={{
            background: "#141414", border: "1px solid #222",
            borderRadius: 20, padding: 28, overflow: "hidden"
          }}>
            <div style={{ fontSize: 13, color: "#888", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Resumen del Pedido</div>

            <div style={{ fontSize: 64, textAlign: "center", marginBottom: 16 }}>{producto.img}</div>
            <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 20, textAlign: "center" }}>{producto.nombre}</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {[
                ["Talla", talla || <span style={{ color: "#555" }}>Sin seleccionar</span>],
                ["Color", color !== null ? producto.colores[color].nombre : <span style={{ color: "#555" }}>Sin seleccionar</span>],
                ["Material", material !== null ? producto.materiales[material].nombre : <span style={{ color: "#555" }}>Sin seleccionar</span>],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1e1e1e", paddingBottom: 10 }}>
                  <span style={{ color: "#888", fontSize: 13 }}>{k}</span>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{
              background: listo ? "rgba(249,115,22,0.1)" : "#1a1a1a",
              border: `1px solid ${listo ? "#f9731644" : "#222"}`,
              borderRadius: 12, padding: 16, marginBottom: 20,
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <span style={{ color: "#888" }}>Total</span>
              <span style={{ fontSize: 22, fontWeight: 900, color: listo ? "#f97316" : "#555" }}>
                ${precioFinal.toLocaleString("es-CO")}
              </span>
            </div>

            {/* Progreso */}
            <div style={{ marginBottom: 20 }}>
              {["Talla", "Color", "Material"].map((step, i) => {
                const hecho = [!!talla, color !== null, material !== null][i];
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: hecho ? "#22c55e" : "#222",
                      border: `2px solid ${hecho ? "#22c55e" : "#333"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, color: hecho ? "#000" : "#555", fontWeight: 900, flexShrink: 0
                    }}>{hecho ? "✓" : i + 1}</div>
                    <span style={{ fontSize: 13, color: hecho ? "#f5f5f5" : "#555" }}>{step} seleccionado</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={confirmar}
              disabled={!listo}
              style={{
                width: "100%", padding: "16px",
                background: listo ? "#f97316" : "#1e1e1e",
                border: "none", borderRadius: 12,
                color: listo ? "#000" : "#444",
                fontWeight: 900, fontSize: 16, cursor: listo ? "pointer" : "not-allowed",
                transition: "all 0.3s",
                boxShadow: listo ? "0 4px 24px rgba(249,115,22,0.4)" : "none"
              }}
            >
              {listo ? "🛒 Confirmar Pedido" : "Completa los campos"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
