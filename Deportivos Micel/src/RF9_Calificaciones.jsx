import { useState } from "react";

const comentariosMock = [
  { id: 1, usuario: "María López", avatar: "👩", rol: "cliente", producto: "Nike Air Pegasus 40", stars: 5, texto: "Excelente calidad, llegaron perfectas y en el tiempo estimado. Muy recomendadas para running.", fecha: "hace 2 días", likes: 14, visible: true },
  { id: 2, usuario: "Carlos Torres", avatar: "👨", rol: "cliente", producto: "Balón Adidas UCL", stars: 4, texto: "Muy buen balón, el cuero sintético es de primera. Le quito una estrella porque tardó un día extra en llegar.", fecha: "hace 5 días", likes: 8, visible: true },
  { id: 3, usuario: "Ana Martínez", avatar: "👩", rol: "cliente", producto: "Traje Speedo Fastskin", stars: 5, texto: "El mejor traje que he comprado. La tela se mantiene perfecta después de varios entrenamientos.", fecha: "hace 1 semana", likes: 21, visible: true },
  { id: 4, usuario: "Luis Pérez", avatar: "🧑", rol: "cliente", producto: "Gafas TYR Tracer", stars: 3, texto: "Buenas gafas pero el sellado podría ser mejor. Para entrenamiento diario sirven bien.", fecha: "hace 2 semanas", likes: 4, visible: true },
];

const PRODUCTOS = ["Nike Air Pegasus 40", "Balón Adidas UCL", "Traje Speedo Fastskin", "Gafas TYR Tracer", "Guayos Puma King", "Camiseta Dry-Fit Running"];

function Estrellas({ valor, onChange, size = 24 }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span
          key={s}
          onClick={() => onChange && onChange(s)}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => onChange && setHover(0)}
          style={{
            fontSize: size, cursor: onChange ? "pointer" : "default",
            color: s <= (hover || valor) ? "#f59e0b" : "#2a2a2a",
            transition: "color 0.15s"
          }}
        >★</span>
      ))}
    </div>
  );
}

const statsCalculo = (lista) => {
  const total = lista.length;
  const prom = total ? (lista.reduce((a, c) => a + c.stars, 0) / total).toFixed(1) : 0;
  const dist = [5, 4, 3, 2, 1].map(s => ({ stars: s, count: lista.filter(c => c.stars === s).length }));
  return { total, prom, dist };
};

export default function RF9_Calificaciones() {
  const [comentarios, setComentarios] = useState(comentariosMock);
  const [form, setForm] = useState({ usuario: "", producto: "", stars: 0, texto: "" });
  const [enviado, setEnviado] = useState(false);
  const [filtro, setFiltro] = useState("todos");
  const [likes, setLikes] = useState({});

  const stats = statsCalculo(comentarios);

  const handleLike = (id) => {
    setLikes(prev => {
      if (prev[id]) return prev;
      setComentarios(c => c.map(cm => cm.id === id ? { ...cm, likes: cm.likes + 1 } : cm));
      return { ...prev, [id]: true };
    });
  };

  const enviar = () => {
    if (!form.usuario || !form.producto || !form.stars || !form.texto) return;
    const nuevo = {
      id: Date.now(), usuario: form.usuario, avatar: "😊",
      rol: "cliente", producto: form.producto, stars: form.stars,
      texto: form.texto, fecha: "ahora mismo", likes: 0, visible: true
    };
    setComentarios(prev => [nuevo, ...prev]);
    setForm({ usuario: "", producto: "", stars: 0, texto: "" });
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  const listado = filtro === "todos" ? comentarios : comentarios.filter(c => c.stars === parseInt(filtro));

  return (
    <div style={{
      fontFamily: "'Nunito','Segoe UI',sans-serif",
      background: "#09090b",
      minHeight: "100vh",
      color: "#f5f5f5",
      padding: "36px 32px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 11, color: "#f59e0b", letterSpacing: 4, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>RF9 · Juan Benavides</div>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>Calificaciones y Comentarios</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 28 }}>
        {/* Columna principal */}
        <div>
          {/* Estadísticas globales */}
          <div style={{
            background: "#111", border: "1px solid #1e1e1e",
            borderRadius: 20, padding: 28, marginBottom: 24,
            display: "flex", gap: 32, alignItems: "center"
          }}>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontSize: 56, fontWeight: 900, color: "#f59e0b", lineHeight: 1 }}>{stats.prom}</div>
              <Estrellas valor={Math.round(stats.prom)} size={18} />
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{stats.total} reseñas</div>
            </div>
            <div style={{ flex: 1 }}>
              {stats.dist.map(({ stars, count }) => (
                <div key={stars} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "#f59e0b", width: 16 }}>{stars}★</span>
                  <div style={{ flex: 1, background: "#1e1e1e", borderRadius: 4, height: 8, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 4,
                      background: "linear-gradient(90deg,#f59e0b,#fbbf24)",
                      width: `${stats.total ? (count / stats.total) * 100 : 0}%`,
                      transition: "width 0.5s"
                    }} />
                  </div>
                  <span style={{ fontSize: 12, color: "#64748b", width: 16 }}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filtros */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            {["todos", "5", "4", "3", "2", "1"].map(f => (
              <button key={f} onClick={() => setFiltro(f)} style={{
                padding: "7px 18px", borderRadius: 20,
                background: filtro === f ? "#f59e0b" : "#1a1a1a",
                border: `1px solid ${filtro === f ? "#f59e0b" : "#2a2a2a"}`,
                color: filtro === f ? "#000" : "#94a3b8",
                fontWeight: filtro === f ? 800 : 600, fontSize: 13, cursor: "pointer"
              }}>
                {f === "todos" ? "Todos" : `${f} ★`}
              </button>
            ))}
          </div>

          {/* Lista comentarios */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {listado.map(c => (
              <div key={c.id} style={{
                background: "#111", border: "1px solid #1e1e1e",
                borderRadius: 16, padding: 22,
                transition: "border-color 0.2s"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#f59e0b44"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e1e"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "#1e1e1e", border: "1px solid #2a2a2a",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
                    }}>{c.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{c.usuario}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{c.producto}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Estrellas valor={c.stars} size={16} />
                    <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{c.fecha}</div>
                  </div>
                </div>
                <p style={{ margin: "0 0 14px", color: "#cbd5e1", fontSize: 14, lineHeight: 1.65 }}>{c.texto}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => handleLike(c.id)} style={{
                    background: likes[c.id] ? "#1c1409" : "#1a1a1a",
                    border: `1px solid ${likes[c.id] ? "#f59e0b66" : "#2a2a2a"}`,
                    color: likes[c.id] ? "#f59e0b" : "#64748b",
                    padding: "5px 14px", borderRadius: 20, cursor: "pointer", fontSize: 13,
                    fontWeight: 700
                  }}>
                    👍 {c.likes}
                  </button>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["📱 Instagram", "👥 Facebook"].map(r => (
                      <span key={r} style={{
                        fontSize: 11, color: "#475569", background: "#1a1a1a",
                        padding: "4px 10px", borderRadius: 16, cursor: "pointer"
                      }}>{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {listado.length === 0 && (
              <div style={{ textAlign: "center", color: "#475569", padding: "48px 0" }}>Sin reseñas para este filtro</div>
            )}
          </div>
        </div>

        {/* Formulario */}
        <div style={{ position: "sticky", top: 32, height: "fit-content" }}>
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 20, padding: 28 }}>
            <div style={{ fontSize: 11, color: "#f59e0b", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>✏️ Dejar Reseña</div>

            {enviado && (
              <div style={{
                background: "#1c2e1a", border: "1px solid #22c55e44",
                borderRadius: 10, padding: 12, marginBottom: 16,
                color: "#22c55e", fontSize: 14, fontWeight: 700
              }}>✅ ¡Gracias por tu reseña!</div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 6 }}>TU NOMBRE</label>
                <input
                  value={form.usuario}
                  onChange={e => setForm(f => ({ ...f, usuario: e.target.value }))}
                  placeholder="¿Cómo te llamas?"
                  style={{ width: "100%", padding: "11px 14px", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, color: "#f5f5f5", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 6 }}>PRODUCTO</label>
                <select
                  value={form.producto}
                  onChange={e => setForm(f => ({ ...f, producto: e.target.value }))}
                  style={{ width: "100%", padding: "11px 14px", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, color: form.producto ? "#f5f5f5" : "#64748b", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                >
                  <option value="">Selecciona un producto</option>
                  {PRODUCTOS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 8 }}>CALIFICACIÓN</label>
                <Estrellas valor={form.stars} onChange={s => setForm(f => ({ ...f, stars: s }))} size={32} />
                {form.stars > 0 && (
                  <div style={{ fontSize: 12, color: "#f59e0b", marginTop: 4 }}>
                    {["", "Malo", "Regular", "Bueno", "Muy Bueno", "¡Excelente!"][form.stars]}
                  </div>
                )}
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 6 }}>COMENTARIO</label>
                <textarea
                  value={form.texto}
                  onChange={e => setForm(f => ({ ...f, texto: e.target.value }))}
                  placeholder="Cuéntanos tu experiencia con el producto..."
                  rows={4}
                  style={{ width: "100%", padding: "11px 14px", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, color: "#f5f5f5", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                />
              </div>
            </div>

            <button
              onClick={enviar}
              disabled={!form.usuario || !form.producto || !form.stars || !form.texto}
              style={{
                marginTop: 16, width: "100%", padding: "13px",
                background: (form.usuario && form.producto && form.stars && form.texto)
                  ? "linear-gradient(135deg,#d97706,#f59e0b)"
                  : "#1a1a1a",
                border: "none", borderRadius: 12,
                color: (form.usuario && form.producto && form.stars && form.texto) ? "#000" : "#555",
                fontWeight: 800, fontSize: 15,
                cursor: (form.usuario && form.producto && form.stars && form.texto) ? "pointer" : "not-allowed"
              }}
            >⭐ Publicar Reseña</button>

            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              {["📱 Instagram", "👥 Facebook"].map(r => (
                <div key={r} style={{
                  flex: 1, textAlign: "center", padding: "8px",
                  background: "#0d0d0d", border: "1px solid #222",
                  borderRadius: 10, fontSize: 12, color: "#64748b", cursor: "pointer"
                }}>{r}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#475569", textAlign: "center", marginTop: 8 }}>Tu reseña también puede compartirse en redes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
