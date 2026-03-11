import { useState } from "react";
import "./ListaPresentes.css";

interface Presente {
  id: number;
  nome: string;
  valor: string;
}

interface Props{
  voltar: () => void;
}

export default function ListaPresentes({ voltar }: Props){

  const chavePix = "057.378.620-89";

  const [pixCopiado,setPixCopiado] = useState(false);

  const presentes: Presente[] = [
    { id:1, nome:"Maquiagem", valor:"R$150" },
    { id:2, nome:"Livro", valor:"R$80" },
    { id:3, nome:"Pix", valor:"Qualquer valor" },
    { id:4, nome:"Pijama tamanho M", valor:"R$120" },
    { id:5, nome:"Roupa", valor:"R$200" }
  ];

  function copiarPix(){

    navigator.clipboard.writeText(chavePix);

    setPixCopiado(true);

    setTimeout(()=>{
      setPixCopiado(false);
    },2000);

  }

  return(

    <div className="lista-presentes-container">

      <div className="card">

        <h1>Sugestões de Presentes 🎁</h1>

        <div className="grid-presentes">

          {presentes.map((presente)=>(
            
            <div
              key={presente.id}
              className="presente-card"
              onClick={presente.nome === "Pix" ? copiarPix : undefined}
            >

              <h3 className="h3">{presente.nome}</h3>

              <p>
                Valor aproximado:
                <br/>
                {presente.valor}
              </p>

              {presente.nome === "Pix" && (

                <>
                  <span className="pix-info">
                    Clique para copiar a chave Pix
                  </span>

                  {pixCopiado && (
                    <span className="pix-copiado">
                      Pix copiado ✓
                    </span>
                  )}

                </>

              )}

            </div>

          ))}

        </div>

        <button
          className="btn-confirmar"
          onClick={voltar}
        >
          Voltar
        </button>

      </div>

    </div>

  )

}