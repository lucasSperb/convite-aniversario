import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const dataFesta = new Date("2026-03-25T19:00:00").getTime();

  const [tempo, setTempo] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const [confirmado, setConfirmado] = useState(false);

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

  return (
    <div className="app">
      {confirmado && <Confetti />}

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
        <p className="info">📍 Salão de Festas Estrela</p>

        {!confirmado ? (
          <button onClick={() => setConfirmado(true)}>
            Confirmar Presença
          </button>
        ) : (
          <p className="confirmado">Presença Confirmada 🎉</p>
        )}
      </div>
    </div>
  );
}

export default App;