import { useState } from "react";

const catalogo = {
  Running: {
    color: "#f97316",
    icon: "🏃",
    bg: "linear-gradient(135deg,#431407,#1c0a00)",
    productos: [
      { id: 1, nombre: "Nike Air Zoom Pegasus", precio: 420000, tag: "Nuevo", img: "👟" },
      { id: 2, nombre: "Adidas Ultraboost 23", precio: 380000, tag: "Top Ventas", img: "👟" },
      { id: 3, nombre: "Camiseta Running Pro", precio: 89000, tag: "", img: "👕" },
      { id: 4, nombre: "Licra Compresión", precio: 115000, tag: "Oferta", img: "🩲" },
      { id: 5, nombre: "Gorra Reflectiva", precio: 45000, tag: "", img: "🧢" },
      { id: 6, nombre: "Reloj GPS Garmin", precio: 890000, tag: "Premium", img: "⌚" },
    ],
  },
  Fútbol: {
    color: "#22c55e",
    icon: "⚽",
    bg: "linear-gradient(135deg,#052e16,#0a1a0a)",
    productos: [
      { id: 7, nombre: "Balón Adidas UCL 2025", precio: 180000, tag: "Oficial", img: "⚽" },
      { id: 8, nombre: "Guayos Nike Mercurial", precio: 320000, tag: "Nuevo", img: "👞" },
      { id: 9, nombre: "Camiseta Colombia 2025", precio: 220000, tag: "Selección", img: "👕" },
      { id: 10, nombre: "Canilleras Pro Shield", precio: 55000, tag: "", img: "🦵" },
      { id: 11, nombre: "Guantes Portero", precio: 140000, tag: "Top Ventas", img: "🧤" },
      { id: 12, nombre: "Malla de Arco", precio: 95000, tag: "", img: "🥅" },
    ],
  },
  Natación: {
    color: "#38bdf8",
    icon: "🏊",
    bg: "linear-gradient(135deg,#0c1a3a,#071124)",
    productos: [
      { id: 13, nombre: "Traje Speedo Fastskin", precio: 320000, tag: "Competición", img: "🩱" },
      { id: 14, nombre: "Gafas TYR Tracer", precio: 145000, tag: "Pro", img: "🥽" },
      { id: 15, nombre: "Tabla de Natación", precio: 65000, tag: "", img: "🏊" },
      { id: 16, nombre: "Aletas Formación", precio: 88000, tag: "", img: "🦶" },
      { id: 17, nombre: "Gorro Silicona", precio: 35000, tag: "Oferta", img: "🏊" },
      { id: 18, nombre: "Pullbuoy Pro", precio: 50000, tag: "", img: "💪" },
    ],
  },
};

const categorias = Object.keys(catalogo);

export default function RF3_Catalogo() {
  const [activa, setActiva] = useState("Running");
  const [carrito, setCarrito] = useState([]);
  const [filtro, setFiltro] = useState("");

  const cat = catalogo[activa];
  const filtrados = cat.productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  const agregar = (prod) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === prod.id);
      if (existe) return prev.map(p => p.id === prod.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...prod, qty: 1 }];
    });
  };

  const totalCarrito = carrito.reduce((acc, p) => acc + p.qty, 0);

  return (
    <div style={{
      fontFamily: "'Exo 2', 'Segoe UI', sans-serif",
      background: "#0a0a0a",
      minHeight: "100vh",
      color: "#f5f5f5",
    }}>
      {/* Header */}
      <div style={{
        background: "#111",
        borderBottom: `3px solid ${cat.color}`,
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        transition: "border-color 0.4s"
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: cat.color, letterSpacing: 4, textTransform: "uppercase", fontWeight: 700 }}>RF3 · Sebastian Cifuentes</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>Catálogo Dinámico Deportivo</h1>
        </div>
        <input
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          placeholder="Buscar producto..."
          style={{
            padding: "10px 16px", background: "#1a1a1a", border: `1px solid ${cat.color}44`,
            borderRadius: 10, color: "#f5f5f5", fontSize: 14, width: 220, outline: "none"
          }}
        />
        <div style={{
          background: cat.color, color: "#000", padding: "10px 18px",
          borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: "pointer",
          position: "relative"
        }}>
          🛒 Carrito
          {totalCarrito > 0 && (
            <span style={{
              position: "absolute", top: -8, right: -8,
              background: "#fff", color: "#000",
              borderRadius: "50%", width: 20, height: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 900
            }}>{totalCarrito}</span>
          )}
        </div>
      </div>

      {/* Tabs de categorías */}
      <div style={{ display: "flex", background: "#111", padding: "0 32px" }}>
        {categorias.map(c => (
          <button
            key={c}
            onClick={() => { setActiva(c); setFiltro(""); }}
            style={{
              padding: "16px 32px",
              background: "transparent",
              border: "none",
              borderBottom: `4px solid ${activa === c ? catalogo[c].color : "transparent"}`,
              color: activa === c ? catalogo[c].color : "#555",
              fontWeight: activa === c ? 800 : 600,
              fontSize: 16,
              cursor: "pointer",
              transition: "all 0.3s",
              letterSpacing: 1
            }}
          >
            {catalogo[c].icon} {c}
          </button>
        ))}
      </div>

      {/* Banner categoría */}
      <div style={{
        background: cat.bg,
        padding: "32px 32px 20px",
        borderBottom: `1px solid ${cat.color}33`,
        transition: "background 0.4s"
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>{cat.icon}</div>
        <h2 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: cat.color }}>{activa}</h2>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>
          {filtrados.length} producto{filtrados.length !== 1 ? "s" : ""} disponible{filtrados.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grilla de productos */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 20,
        padding: "32px",
      }}>
        {filtrados.map(prod => (
          <div key={prod.id} style={{
            background: "#141414",
            border: `1px solid #222`,
            borderRadius: 16,
            padding: 20,
            transition: "all 0.2s",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden"
          }}
            onMouseEnter={e => {
              e.currentTarget.style.border = `1px solid ${cat.color}66`;
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 8px 32px ${cat.color}22`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = "1px solid #222";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {prod.tag && (
              <div style={{
                position: "absolute", top: 12, right: 12,
                background: cat.color, color: "#000",
                fontSize: 10, fontWeight: 800, padding: "3px 8px",
                borderRadius: 6, letterSpacing: 1
              }}>{prod.tag}</div>
            )}
            <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>{prod.img}</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{prod.nombre}</div>
            <div style={{ color: cat.color, fontWeight: 900, fontSize: 18, marginBottom: 16 }}>
              ${prod.precio.toLocaleString("es-CO")}
            </div>
            <button
              onClick={() => agregar(prod)}
              style={{
                width: "100%", padding: "10px", background: `${cat.color}22`,
                border: `1px solid ${cat.color}66`, borderRadius: 10,
                color: cat.color, fontWeight: 700, fontSize: 13, cursor: "pointer"
              }}
            >
              + Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {filtrados.length === 0 && (
        <div style={{ textAlign: "center", color: "#555", padding: "60px 0", fontSize: 16 }}>
          Sin resultados para "{filtro}"
        </div>
      )}
    </div>
  );
}
