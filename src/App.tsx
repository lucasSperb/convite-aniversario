import { useState, useEffect } from "react";
// @ts-ignore
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import conviteImg from "./assets/background.png";
import "./App.css";

function App() {
  const [tela, setTela] = useState<"capa" | "convite">("capa");

  const dataFesta = new Date("2026-05-29T21:00:00").getTime();
  const telefone = "5551994789241";
  const endereco = "Pura Folia - Casa de Festas Canoas";

  const [tempo, setTempo] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const agora = new Date().getTime();
      const distancia = dataFesta - agora;

      if (distancia <= 0) return;

      setTempo({
        dias: Math.floor(distancia / (1000 * 60 * 60 * 24)),
        horas: Math.floor(
          (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutos: Math.floor(
          (distancia % (1000 * 60 * 60)) / (1000 * 60)
        ),
        segundos: Math.floor(
          (distancia % (1000 * 60)) / 1000
        ),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const confirmarPresenca = () => {
    const mensagem = encodeURIComponent(
      "Olá! Confirmo minha presença no aniversário 🎉"
    );
    window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
  };

  const abrirMapa = () => {
    const query = encodeURIComponent(endereco);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    );
  };

  const abrirListaPresentes = () => {
  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLScpQB70oX-PVCZuL8wR7-gAJeObs6mxghmgLH4avecPw2yvzg/viewform",
    "_blank"
  );
};

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {tela === "capa" && (
          <motion.div
            key="capa"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="capa-container"
          >
            <img
              src={conviteImg}
              alt="Convite 15 anos"
              className="capa-img"
            />

            <div
              className="area-clique"
              onClick={() => setTela("convite")}
            />
          </motion.div>
        )}

        {tela === "convite" && (
          <motion.div
            key="convite"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={250}
            />

            <h1>Raphaela 15 Anos 👑</h1>

            <div className="countdown">
              <div>
                <span>{tempo.dias}</span>
                <small>Dias</small>
              </div>
              <div>
                <span>{tempo.horas}</span>
                <small>Horas</small>
              </div>
              <div>
                <span>{tempo.minutos}</span>
                <small>Min</small>
              </div>
              <div>
                <span>{tempo.segundos}</span>
                <small>Seg</small>
              </div>
            </div>

            <p className="info">📅 29 de Maio • 21h</p>

            <p className="info">
              📍 {endereco}
            </p>

            <button className="btn-maps" onClick={abrirMapa}>
              Ver localização
            </button>

            <button className="btn-confirmar" onClick={confirmarPresenca}>
              Confirmar presença
            </button>

            <button className="btn-presentes" onClick={abrirListaPresentes}>
              Lista de Presentes 🎁
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;