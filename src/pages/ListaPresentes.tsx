import { useEffect, useState } from "react";
import "./ListaPresentes.css";

interface Presente {
  id: number;
  nome: string;
  valor: string;
  status: string;
}

export default function ListaPresentes() {

  const [presentes, setPresentes] = useState<Presente[]>([]);

  const API = "https://convite-backend-0whn.onrender.com/presentes";

  useEffect(() => {

    carregarPresentes();

  }, []);

  async function carregarPresentes(){

    const res = await fetch(API);
    const data = await res.json();

    setPresentes(data);

  }

  async function selecionarPresente(id:number){

    const res = await fetch(`${API}/${id}`,{
      method:"PUT"
    });

    const data = await res.json();

    setPresentes(data);

  }

  return (

    <div className="app">

      <div className="card">

        <h1>Lista de Presentes 🎁</h1>

        <div className="grid-presentes">

          {presentes.map(presente => (

            <div
              key={presente.id}
              className={`presente-card ${presente.status}`}
              onClick={() => {

                if(presente.status !== "reservado" && presente.status !== "pix"){
                  selecionarPresente(presente.id)
                }

              }}
            >

              <h2 style={{ color: "#000" }}>{presente.nome}</h2>

              <p  style={{ color: "#000" }}>{presente.valor}</p>

              <span className="status"  style={{ color: "#000" }}>

                {presente.status === "reservado"
                  ? "Indisponível"
                  : presente.status === "pix"
                  ? "Pix"
                  : "Disponível"}

              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}