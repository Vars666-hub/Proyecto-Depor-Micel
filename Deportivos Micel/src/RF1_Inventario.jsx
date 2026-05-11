import { useState } from "react";

const productos = [
  { id: 1, nombre: "Zapatillas Nike Air", categoria: "Running", stock: 24, precio: 320000, img: "👟" },
  { id: 2, nombre: "Balón Adidas Pro", categoria: "Fútbol", stock: 3, precio: 85000, img: "⚽" },
  { id: 3, nombre: "Gafas Speedo", categoria: "Natación", stock: 15, precio: 120000, img: "🥽" },
  { id: 4, nombre: "Camiseta Dry-Fit", categoria: "Running", stock: 0, precio: 65000, img: "👕" },
  { id: 5, nombre: "Guayos Puma King", categoria: "Fútbol", stock: 8, precio: 210000, img: "👞" },
  { id: 6, nombre: "Traje de Baño", categoria: "Natación", stock: 11, precio: 95000, img: "🩱" },
];

export default function RF1_Inventario() {
  const [inventario, setInventario] = useState(productos);
  const [log, setLog] = useState([]);
  const [modal, setModal] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [tipo, setTipo] = useState("ingreso");

  const abrirModal = (prod, t) => {
    setModal(prod);
    setTipo(t);
    setCantidad("");
  };

  const aplicarMovimiento = () => {
    const cant = parseInt(cantidad);
    if (!cant || cant <= 0) return;
    setInventario(prev =>
      prev.map(p => {
        if (p.id !== modal.id) return p;
        const nuevo = tipo === "ingreso" ? p.stock + cant : Math.max(0, p.stock - cant);
        return { ...p, stock: nuevo };
      })
    );
    const entrada = {
      id: Date.now(),
      producto: modal.nombre,
      tipo,
      cantidad: cant,
      hora: new Date().toLocaleTimeString("es-CO"),
    };
    setLog(prev => [entrada, ...prev.slice(0, 9)]);
    setModal(null);
  };

  const stockColor = (s) => s === 0 ? "#ef4444" : s <= 5 ? "#f59e0b" : "#22c55e";

  return (
    <div style={{
      fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
      background: "#0f0f0f",
      minHeight: "100vh",
      color: "#f0f0f0",
      padding: "32px",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <div style={{
          width: 48, height: 48, background: "#e11d48", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24
        }}>📦</div>
        <div>
          <div style={{ fontSize: 11, color: "#e11d48", letterSpacing: 4, textTransform: "uppercase", fontWeight: 700 }}>RF1 · Sebastian Cifuentes</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: 1 }}>Gestión de Inventario Sincronizado</h1>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 24 }}>
          {["Total Productos", "Sin Stock", "Stock Bajo"].map((label, i) => {
            const vals = [inventario.length, inventario.filter(p => p.stock === 0).length, inventario.filter(p => p.stock > 0 && p.stock <= 5).length];
            return (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: i === 1 ? "#ef4444" : i === 2 ? "#f59e0b" : "#e11d48" }}>{vals[i]}</div>
                <div style={{ fontSize: 11, color: "#888", letterSpacing: 2 }}>{label.toUpperCase()}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        {/* Tabla */}
        <div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e11d48" }}>
                {["Producto", "Categoría", "Stock", "Precio", "Acciones"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#e11d48", letterSpacing: 2, fontSize: 11, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventario.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #222", background: i % 2 === 0 ? "#161616" : "#111" }}>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ marginRight: 10, fontSize: 20 }}>{p.img}</span>
                    <span style={{ fontWeight: 700 }}>{p.nombre}</span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{
                      background: "#1e1e1e", border: "1px solid #333",
                      padding: "2px 10px", borderRadius: 20, fontSize: 12, color: "#aaa"
                    }}>{p.categoria}</span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{
                      color: stockColor(p.stock), fontWeight: 900, fontSize: 20
                    }}>{p.stock}</span>
                    {p.stock === 0 && <span style={{ color: "#ef4444", fontSize: 11, marginLeft: 6 }}>AGOTADO</span>}
                    {p.stock > 0 && p.stock <= 5 && <span style={{ color: "#f59e0b", fontSize: 11, marginLeft: 6 }}>BAJO</span>}
                  </td>
                  <td style={{ padding: "12px 14px", color: "#22c55e", fontWeight: 700 }}>
                    ${p.precio.toLocaleString("es-CO")}
                  </td>
                  <td style={{ padding: "12px 14px", display: "flex", gap: 8 }}>
                    <button onClick={() => abrirModal(p, "ingreso")} style={{
                      background: "#166534", color: "#86efac", border: "none",
                      padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 13
                    }}>+ Ingreso</button>
                    <button onClick={() => abrirModal(p, "venta")} style={{
                      background: "#7f1d1d", color: "#fca5a5", border: "none",
                      padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 13
                    }}>− Venta</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Log */}
        <div style={{ background: "#141414", borderRadius: 12, padding: 20, border: "1px solid #222" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 3, marginBottom: 16, textTransform: "uppercase" }}>⟳ Registro en Tiempo Real</div>
          {log.length === 0 && <div style={{ color: "#555", fontSize: 13, textAlign: "center", marginTop: 40 }}>Sin movimientos aún</div>}
          {log.map(e => (
            <div key={e.id} style={{
              borderLeft: `3px solid ${e.tipo === "ingreso" ? "#22c55e" : "#ef4444"}`,
              paddingLeft: 12, marginBottom: 14
            }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{e.producto}</div>
              <div style={{ fontSize: 12, color: e.tipo === "ingreso" ? "#86efac" : "#fca5a5" }}>
                {e.tipo === "ingreso" ? "+" : "−"}{e.cantidad} unidades · {e.tipo.toUpperCase()}
              </div>
              <div style={{ fontSize: 11, color: "#555" }}>{e.hora}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100
        }}>
          <div style={{
            background: "#181818", border: "1px solid #333", borderRadius: 16,
            padding: 36, width: 360, boxShadow: "0 0 60px rgba(225,29,72,0.3)"
          }}>
            <div style={{ fontSize: 11, color: "#e11d48", letterSpacing: 3, marginBottom: 8 }}>
              {tipo === "ingreso" ? "REGISTRAR INGRESO" : "REGISTRAR VENTA"}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
              {modal.img} {modal.nombre}
            </div>
            <div style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>
              Stock actual: <strong style={{ color: "#f0f0f0" }}>{modal.stock}</strong>
            </div>
            <input
              type="number"
              placeholder="Cantidad"
              value={cantidad}
              onChange={e => setCantidad(e.target.value)}
              style={{
                width: "100%", padding: "14px", background: "#0f0f0f",
                border: "1px solid #333", borderRadius: 8, color: "#fff",
                fontSize: 18, fontWeight: 700, boxSizing: "border-box", marginBottom: 16
              }}
            />
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={aplicarMovimiento} style={{
                flex: 1, padding: "14px", background: tipo === "ingreso" ? "#166534" : "#7f1d1d",
                color: "#fff", border: "none", borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: "pointer"
              }}>Confirmar</button>
              <button onClick={() => setModal(null)} style={{
                flex: 1, padding: "14px", background: "#222",
                color: "#aaa", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: "pointer"
              }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
