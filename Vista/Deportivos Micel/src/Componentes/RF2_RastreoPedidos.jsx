import { useState } from "react";

const pedidosMock = {
  "GU-100234": {
    producto: "Zapatillas Nike Air Max",
    fecha: "2025-05-08",
    destino: "Bogotá, Cundinamarca",
    etapas: [
      { nombre: "Preparación", desc: "Pedido recibido y en preparación", fecha: "08 May · 09:15", done: true },
      { nombre: "Despacho", desc: "Paquete entregado a transportadora", fecha: "08 May · 14:30", done: true },
      { nombre: "En Ruta", desc: "En camino hacia su destino", fecha: "09 May · 08:00", done: true },
      { nombre: "Entregado", desc: "Pendiente de entrega", fecha: "—", done: false },
    ],
  },
  "GU-200891": {
    producto: "Traje de Baño Speedo",
    fecha: "2025-05-06",
    destino: "Medellín, Antioquia",
    etapas: [
      { nombre: "Preparación", desc: "Pedido recibido y empacado", fecha: "06 May · 10:00", done: true },
      { nombre: "Despacho", desc: "Entregado a Servientrega", fecha: "06 May · 15:45", done: true },
      { nombre: "En Ruta", desc: "En bodega de distribución", fecha: "07 May · 07:30", done: true },
      { nombre: "Entregado", desc: "Entregado al destinatario", fecha: "08 May · 11:20", done: true },
    ],
  },
  "GU-300455": {
    producto: "Balón Adidas Champions",
    fecha: "2025-05-09",
    destino: "Cali, Valle",
    etapas: [
      { nombre: "Preparación", desc: "Procesando pedido", fecha: "09 May · 16:00", done: true },
      { nombre: "Despacho", desc: "Pendiente despacho", fecha: "—", done: false },
      { nombre: "En Ruta", desc: "—", fecha: "—", done: false },
      { nombre: "Entregado", desc: "—", fecha: "—", done: false },
    ],
  },
};

const iconos = ["📦", "🚚", "🛣️", "✅"];

export default function RF2_Rastreo() {
  const [guia, setGuia] = useState("");
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState("");
  const [buscando, setBuscando] = useState(false);

  const buscar = () => {
    setError("");
    setPedido(null);
    setBuscando(true);
    setTimeout(() => {
      const found = pedidosMock[guia.toUpperCase().trim()];
      if (found) setPedido({ ...found, guia: guia.toUpperCase().trim() });
      else setError("Número de guía no encontrado. Verifique el código.");
      setBuscando(false);
    }, 800);
  };

  const etapaActual = pedido ? pedido.etapas.filter(e => e.done).length - 1 : -1;

  return (
    <div style={{
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #0a192f 0%, #0d2137 50%, #0a192f 100%)",
      minHeight: "100vh",
      color: "#e2e8f0",
      padding: "40px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48, maxWidth: 600 }}>
        <div style={{ fontSize: 11, color: "#38bdf8", letterSpacing: 4, textTransform: "uppercase", marginBottom: 8, fontWeight: 700 }}>
          RF2 · Cristhian Romero
        </div>
        <h1 style={{ margin: "0 0 12px", fontSize: 36, fontWeight: 900, background: "linear-gradient(90deg,#38bdf8,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Rastreo de Pedidos
        </h1>
        <p style={{ color: "#64748b", fontSize: 15, margin: 0 }}>
          Ingresa tu número de guía para conocer el estado de tu envío
        </p>
      </div>

      {/* Buscador */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(56,189,248,0.2)",
        borderRadius: 20,
        padding: "32px",
        width: "100%",
        maxWidth: 560,
        marginBottom: 40,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 12 }}>Número de guía</div>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            value={guia}
            onChange={e => setGuia(e.target.value)}
            onKeyDown={e => e.key === "Enter" && buscar()}
            placeholder="Ej: GU-100234"
            style={{
              flex: 1, padding: "14px 18px", background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(56,189,248,0.3)", borderRadius: 12,
              color: "#e2e8f0", fontSize: 16, fontWeight: 700,
              outline: "none", letterSpacing: 2
            }}
          />
          <button onClick={buscar} style={{
            padding: "14px 28px", background: "linear-gradient(135deg,#0ea5e9,#6366f1)",
            border: "none", borderRadius: 12, color: "#fff",
            fontWeight: 800, fontSize: 16, cursor: "pointer", letterSpacing: 1
          }}>
            {buscando ? "..." : "🔍 Buscar"}
          </button>
        </div>
        {error && <div style={{ color: "#f87171", fontSize: 13, marginTop: 12 }}>⚠ {error}</div>}
        <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.keys(pedidosMock).map(g => (
            <button key={g} onClick={() => setGuia(g)} style={{
              background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)",
              color: "#38bdf8", borderRadius: 8, padding: "4px 12px", fontSize: 12,
              cursor: "pointer", fontWeight: 700
            }}>{g}</button>
          ))}
          <span style={{ color: "#475569", fontSize: 12, alignSelf: "center" }}>← Ejemplos</span>
        </div>
      </div>

      {/* Resultado */}
      {pedido && (
        <div style={{
          width: "100%", maxWidth: 560,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(56,189,248,0.15)",
          borderRadius: 20, padding: 32,
          backdropFilter: "blur(12px)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: "#38bdf8", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Guía</div>
              <div style={{ fontSize: 20, fontWeight: 900 }}>{pedido.guia}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Producto</div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{pedido.producto}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>📍 {pedido.destino}</div>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: 48 }}>
            {/* Línea vertical */}
            <div style={{
              position: "absolute", left: 19, top: 20, bottom: 20,
              width: 2, background: "rgba(56,189,248,0.15)"
            }} />

            {pedido.etapas.map((etapa, i) => (
              <div key={i} style={{ position: "relative", marginBottom: i < 3 ? 32 : 0 }}>
                {/* Círculo */}
                <div style={{
                  position: "absolute", left: -48, top: 0,
                  width: 36, height: 36, borderRadius: "50%",
                  background: etapa.done
                    ? (i === etapaActual ? "linear-gradient(135deg,#0ea5e9,#6366f1)" : "rgba(56,189,248,0.2)")
                    : "rgba(255,255,255,0.05)",
                  border: etapa.done
                    ? (i === etapaActual ? "2px solid #38bdf8" : "2px solid rgba(56,189,248,0.4)")
                    : "2px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16,
                  boxShadow: i === etapaActual ? "0 0 20px rgba(56,189,248,0.5)" : "none"
                }}>
                  {iconos[i]}
                </div>
                <div>
                  <div style={{
                    fontWeight: 800, fontSize: 15,
                    color: etapa.done ? (i === etapaActual ? "#38bdf8" : "#e2e8f0") : "#334155"
                  }}>{etapa.nombre}</div>
                  <div style={{ fontSize: 13, color: etapa.done ? "#94a3b8" : "#334155" }}>{etapa.desc}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{etapa.fecha}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Barra progreso */}
          <div style={{ marginTop: 32, background: "rgba(255,255,255,0.05)", borderRadius: 8, height: 8 }}>
            <div style={{
              height: "100%", borderRadius: 8,
              background: "linear-gradient(90deg,#0ea5e9,#6366f1)",
              width: `${((etapaActual + 1) / 4) * 100}%`,
              transition: "width 0.8s ease"
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 11, color: "#64748b" }}>0%</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#38bdf8" }}>{Math.round(((etapaActual + 1) / 4) * 100)}% completado</span>
            <span style={{ fontSize: 11, color: "#64748b" }}>100%</span>
          </div>
        </div>
      )}
    </div>
  );
}
