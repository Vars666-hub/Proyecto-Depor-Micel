import { useState } from "react";

const REDES = [
  {
    id: "whatsapp",
    nombre: "WhatsApp",
    desc: "Atención inmediata por chat",
    icon: "💬",
    color: "#25d366",
    bg: "#0a1f12",
    url: "https://wa.me/573001234567",
    horario: "Lun – Sáb · 8am – 8pm",
    tag: "Respuesta < 5 min",
    tagColor: "#22c55e",
  },
  {
    id: "instagram",
    nombre: "Instagram",
    desc: "Novedades, catálogo y más",
    icon: "📸",
    color: "#e1306c",
    bg: "#1f0a12",
    url: "https://instagram.com/sportstore.co",
    horario: "Publicaciones diarias",
    tag: "Seguinos",
    tagColor: "#e1306c",
  },
  {
    id: "facebook",
    nombre: "Facebook",
    desc: "Comunidad y soporte al cliente",
    icon: "👥",
    color: "#1877f2",
    bg: "#050d1f",
    url: "https://facebook.com/sportstore.co",
    horario: "Lun – Dom · 9am – 6pm",
    tag: "Comunidad 12k",
    tagColor: "#1877f2",
  },
];

const FAQS = [
  { q: "¿Cuánto demora mi pedido?", r: "Los pedidos en Bogotá tardan 1-2 días hábiles. Resto del país 3-5 días." },
  { q: "¿Puedo cambiar mi talla?", r: "Sí, tienes 15 días desde la recepción para solicitar un cambio sin costo adicional." },
  { q: "¿Tienen envío gratis?", r: "Sí, en compras superiores a $200.000 el envío es completamente gratis." },
  { q: "¿Cómo rastreo mi pedido?", r: "Usa la sección de 'Rastreo de Pedidos' con el número de guía que llegó a tu correo." },
];

export default function RF8_Redes() {
  const [faqAbierta, setFaqAbierta] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviarMensaje = () => {
    if (!mensaje.trim()) return;
    setEnviado(true);
    setTimeout(() => { setEnviado(false); setMensaje(""); }, 3000);
  };

  return (
    <div style={{
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      background: "#080808",
      minHeight: "100vh",
      color: "#f5f5f5",
      padding: "40px 32px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#94a3b8", letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>RF8 · Juan Benavides</div>
        <h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 900 }}>Comunícate con Nosotros</h1>
        <p style={{ color: "#64748b", fontSize: 15, margin: 0 }}>Elige tu canal preferido para consultas, soporte o atención al cliente</p>
      </div>

      {/* Cards de redes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 48 }}>
        {REDES.map(r => (
          <div key={r.id} style={{
            background: r.bg,
            border: `1px solid ${r.color}33`,
            borderRadius: 20,
            padding: 28,
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s",
            cursor: "pointer"
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = `0 12px 40px ${r.color}25`;
              e.currentTarget.style.border = `1px solid ${r.color}66`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.border = `1px solid ${r.color}33`;
            }}
          >
            {/* Glow de fondo */}
            <div style={{
              position: "absolute", top: -20, right: -20,
              width: 100, height: 100, borderRadius: "50%",
              background: r.color, opacity: 0.06, filter: "blur(30px)"
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: `${r.color}20`, border: `2px solid ${r.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26
              }}>{r.icon}</div>
              <span style={{
                background: `${r.tagColor}20`, color: r.tagColor,
                fontSize: 11, fontWeight: 800, padding: "4px 12px",
                borderRadius: 20, letterSpacing: 1
              }}>{r.tag}</span>
            </div>

            <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: r.color }}>{r.nombre}</h3>
            <p style={{ margin: "0 0 16px", color: "#94a3b8", fontSize: 14 }}>{r.desc}</p>
            <div style={{ fontSize: 12, color: "#475569", marginBottom: 20 }}>⏰ {r.horario}</div>

            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block", textAlign: "center",
                padding: "12px", background: `${r.color}18`,
                border: `1px solid ${r.color}44`, borderRadius: 12,
                color: r.color, fontWeight: 800, fontSize: 14,
                textDecoration: "none", transition: "background 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = `${r.color}30`}
              onMouseLeave={e => e.currentTarget.style.background = `${r.color}18`}
            >
              Abrir {r.nombre} →
            </a>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {/* FAQ */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 20, padding: 28 }}>
          <div style={{ fontSize: 11, color: "#94a3b8", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>❓ Preguntas Frecuentes</div>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: 12, marginBottom: 12 }}>
              <div
                onClick={() => setFaqAbierta(faqAbierta === i ? null : i)}
                style={{ display: "flex", justifyContent: "space-between", cursor: "pointer", alignItems: "center" }}
              >
                <span style={{ fontWeight: 700, fontSize: 14 }}>{f.q}</span>
                <span style={{ color: "#64748b", fontSize: 18, fontWeight: 300 }}>{faqAbierta === i ? "−" : "+"}</span>
              </div>
              {faqAbierta === i && (
                <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{f.r}</div>
              )}
            </div>
          ))}
        </div>

        {/* Formulario rápido */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 20, padding: 28 }}>
          <div style={{ fontSize: 11, color: "#94a3b8", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>✉️ Mensaje Rápido</div>
          {!enviado ? (
            <>
              <p style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>
                Déjanos tu consulta y te contactaremos por WhatsApp o correo en menos de una hora.
              </p>
              <textarea
                value={mensaje}
                onChange={e => setMensaje(e.target.value)}
                placeholder="Escribe tu consulta aquí..."
                rows={5}
                style={{
                  width: "100%", padding: "14px", background: "#0d0d0d",
                  border: "1px solid #222", borderRadius: 12,
                  color: "#f5f5f5", fontSize: 14, resize: "none",
                  outline: "none", boxSizing: "border-box", marginBottom: 16,
                  fontFamily: "inherit"
                }}
              />
              <button onClick={enviarMensaje} disabled={!mensaje.trim()} style={{
                width: "100%", padding: "13px",
                background: mensaje.trim() ? "linear-gradient(135deg,#25d366,#128c7e)" : "#1a1a1a",
                border: "none", borderRadius: 12,
                color: mensaje.trim() ? "#fff" : "#555",
                fontWeight: 800, fontSize: 15,
                cursor: mensaje.trim() ? "pointer" : "not-allowed"
              }}>💬 Enviar Mensaje</button>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#22c55e" }}>¡Mensaje Enviado!</div>
              <div style={{ color: "#64748b", fontSize: 14, marginTop: 8 }}>Te contactaremos pronto</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
