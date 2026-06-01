import { useState } from "react";

const USUARIOS = [
  { correo: "cliente@deportes.com", password: "cliente123", rol: "cliente", nombre: "Laura García" },
  { correo: "admin@deportes.com", password: "admin123", rol: "administrador", nombre: "Carlos Admin" },
  { correo: "trabajador@deportes.com", password: "trabajo123", rol: "trabajador", nombre: "Juan Trabajador" },
];

const ROL_CONFIG = {
  cliente: {
    color: "#22c55e",
    icon: "🛒",
    badge: "CLIENTE",
    funciones: ["Ver catálogo de productos", "Realizar pedidos", "Rastrear envíos", "Calificar productos", "Ver historial de compras"],
  },
  administrador: {
    color: "#f59e0b",
    icon: "👑",
    badge: "ADMINISTRADOR",
    funciones: ["Gestionar inventario", "Ver reportes de ventas", "Administrar usuarios", "Configurar productos", "Acceso total al sistema"],
  },
  trabajador: {
    color: "#38bdf8",
    icon: "🔧",
    badge: "TRABAJADOR",
    funciones: ["Registrar ingresos de stock", "Preparar pedidos", "Actualizar estados de envío", "Atención al cliente", "Reportes básicos"],
  },
};

function generarToken() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [sesion, setSesion] = useState(null);
  const [mostrarPass, setMostrarPass] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);

  const handleLogin = () => {
    setError("");
    if (!correo || !password) { setError("Completa todos los campos."); return; }
    setCargando(true);
    setTimeout(() => {
      const usuario = USUARIOS.find(u => u.correo === correo && u.password === password);
      if (usuario) {
        const token = generarToken();
        const exp = new Date(Date.now() + 3600000).toLocaleTimeString("es-CO");
        setSesion({ ...usuario, token, exp, inicio: new Date().toLocaleString("es-CO") });
      } else {
        setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
      }
      setCargando(false);
    }, 1200);
  };

  const cerrarSesion = () => {
    setSesion(null);
    setCorreo("");
    setPassword("");
    setTokenVisible(false);
  };

  if (sesion) {
    const cfg = ROL_CONFIG[sesion.rol];
    return (
      <div style={{
        fontFamily: "'Exo 2','Segoe UI',sans-serif",
        background: "#090909",
        minHeight: "100vh",
        color: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}>
        <div style={{
          width: "100%", maxWidth: 560,
          background: "#131313",
          border: `1px solid ${cfg.color}33`,
          borderRadius: 24,
          padding: 40,
          boxShadow: `0 0 60px ${cfg.color}18`
        }}>
          {/* Badge RF */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            <span style={{ fontSize: 10, background: "#1e293b", color: "#38bdf8", padding: "3px 10px", borderRadius: 20, letterSpacing: 2 }}>RF6</span>
            <span style={{ fontSize: 10, background: "#1e293b", color: "#a78bfa", padding: "3px 10px", borderRadius: 20, letterSpacing: 2 }}>RF7</span>
            <span style={{ fontSize: 10, color: "#64748b", alignSelf: "center" }}>Cristhian Romero · Juan Benavides</span>
          </div>

          {/* Avatar & Rol */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: `${cfg.color}22`,
              border: `3px solid ${cfg.color}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32,
              boxShadow: `0 0 24px ${cfg.color}44`
            }}>{cfg.icon}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{sesion.nombre}</div>
              <div style={{
                display: "inline-block",
                background: `${cfg.color}22`,
                color: cfg.color,
                padding: "3px 12px", borderRadius: 20,
                fontSize: 11, fontWeight: 800, letterSpacing: 2, marginTop: 4
              }}>{cfg.badge}</div>
            </div>
          </div>

          {/* Funciones del rol */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Accesos según tu rol</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {cfg.funciones.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#cbd5e1" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Token de sesión (RF7) */}
          <div style={{
            background: "#0d0d0d", border: "1px solid #1e293b",
            borderRadius: 12, padding: 16, marginBottom: 28
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 3, textTransform: "uppercase" }}>🔑 Token de Sesión (RF7)</div>
              <button onClick={() => setTokenVisible(v => !v)} style={{
                background: "#1e293b", border: "none", color: "#94a3b8",
                padding: "3px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12
              }}>{tokenVisible ? "Ocultar" : "Mostrar"}</button>
            </div>
            <div style={{
              fontFamily: "monospace", fontSize: 12, color: "#94a3b8",
              wordBreak: "break-all", letterSpacing: 1
            }}>
              {tokenVisible ? sesion.token : "•".repeat(32)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontSize: 11, color: "#475569" }}>Inicio: {sesion.inicio}</span>
              <span style={{ fontSize: 11, color: "#475569" }}>Expira: {sesion.exp}</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              {sesion.correo}
            </div>
            <button onClick={cerrarSesion} style={{
              background: "#1e1e1e", border: "1px solid #333", borderRadius: 10,
              color: "#ef4444", padding: "10px 20px", fontWeight: 700,
              cursor: "pointer", fontSize: 14
            }}>Cerrar Sesión</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "'Exo 2','Segoe UI',sans-serif",
      background: "#090909",
      minHeight: "100vh",
      color: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>🏋️</div>
          <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900 }}>SportStore</h1>
          <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 4, textTransform: "uppercase" }}>RF6 · RF7 · Autenticación</div>
        </div>

        <div style={{
          background: "#131313", border: "1px solid #1e1e1e",
          borderRadius: 20, padding: 36,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
        }}>
          <h2 style={{ margin: "0 0 28px", fontSize: 20, fontWeight: 800 }}>Iniciar Sesión</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ fontSize: 12, color: "#64748b", letterSpacing: 2, display: "block", marginBottom: 6 }}>CORREO ELECTRÓNICO</label>
              <input
                value={correo}
                onChange={e => { setCorreo(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="correo@deportes.com"
                type="email"
                style={{
                  width: "100%", padding: "13px 16px", background: "#0d0d0d",
                  border: `1px solid ${error ? "#ef4444" : "#222"}`, borderRadius: 10,
                  color: "#f5f5f5", fontSize: 15, outline: "none", boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, color: "#64748b", letterSpacing: 2, display: "block", marginBottom: 6 }}>CONTRASEÑA</label>
              <div style={{ position: "relative" }}>
                <input
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="••••••••"
                  type={mostrarPass ? "text" : "password"}
                  style={{
                    width: "100%", padding: "13px 48px 13px 16px", background: "#0d0d0d",
                    border: `1px solid ${error ? "#ef4444" : "#222"}`, borderRadius: 10,
                    color: "#f5f5f5", fontSize: 15, outline: "none", boxSizing: "border-box"
                  }}
                />
                <button
                  onClick={() => setMostrarPass(v => !v)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 16
                  }}
                >{mostrarPass ? "🙈" : "👁️"}</button>
              </div>
            </div>
          </div>

          {error && (
            <div style={{
              marginTop: 14, padding: "10px 14px", background: "#1c0909",
              border: "1px solid #ef4444", borderRadius: 8, color: "#ef4444", fontSize: 13
            }}>⚠ {error}</div>
          )}

          <button onClick={handleLogin} disabled={cargando} style={{
            marginTop: 24, width: "100%", padding: "15px",
            background: cargando ? "#312e81" : "linear-gradient(135deg,#4f46e5,#7c3aed)",
            border: "none", borderRadius: 12, color: "#fff",
            fontWeight: 800, fontSize: 16, cursor: cargando ? "not-allowed" : "pointer",
            boxShadow: "0 4px 24px rgba(99,102,241,0.4)"
          }}>
            {cargando ? "⏳ Validando..." : "Ingresar →"}
          </button>

          {/* Credenciales demo */}
          <div style={{ marginTop: 24, borderTop: "1px solid #1e1e1e", paddingTop: 20 }}>
            <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Cuentas de Prueba</div>
            {USUARIOS.map((u, i) => (
              <div key={i} onClick={() => { setCorreo(u.correo); setPassword(u.password); setError(""); }} style={{
                display: "flex", justifyContent: "space-between", padding: "8px 12px",
                borderRadius: 8, cursor: "pointer", marginBottom: 4,
                background: "#0d0d0d", border: "1px solid #1a1a1a",
                transition: "border-color 0.2s"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#4f46e5"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a1a"}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{u.correo}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{u.password}</div>
                </div>
                <div style={{
                  fontSize: 10, color: ROL_CONFIG[u.rol].color,
                  background: `${ROL_CONFIG[u.rol].color}22`,
                  padding: "3px 8px", borderRadius: 6, alignSelf: "center", fontWeight: 700, letterSpacing: 1
                }}>{u.rol.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
