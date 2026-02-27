import { useEffect, useState } from "react";
// @ts-ignore
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const dataFesta = new Date("2026-03-25T19:00:00").getTime();

  const telefone = "555184584889"; // sem + e sem espaços
  const endereco = "Salão de Festas Estrela, Porto Alegre, RS";

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

    window.open(
      `https://wa.me/${telefone}?text=${mensagem}`,
      "_blank"
    );
  };

  const abrirMapa = () => {
    const query = encodeURIComponent(endereco);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    );
  };

  return (
    <div className="app">
      <div className="card">
        <h1>🎉 Você está convidado!</h1>
        <h2>Aniversário do Lucas 🎂</h2>

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

        <p className="info">📅 25 de Março • 19h</p>

        <p className="info endereco" onClick={abrirMapa}>
          📍 {endereco}
        </p>

        <button onClick={confirmarPresenca}>
          Confirmar Presença
        </button>
      </div>
    </div>
  );
}

export default App;