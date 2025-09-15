import { useEffect, useRef, useState } from "react";
import PokemonList from "../componentes/PokemonList";
import Header from "../componentes/Header";
import type { Pokemon } from "../types/Pokemon";

class Node {
  valor: Pokemon;
  esquerda: Node | null = null;
  direita: Node | null = null;
  constructor(valor: Pokemon) {
    this.valor = valor;
  }
}

class ArvoreBinaria {
  raiz: Node | null = null;
  chave: keyof Pokemon;

  constructor(chave: keyof Pokemon) {
    this.chave = chave;
  }
  
  inserir(pokemon: Pokemon) {
    const novo = new Node(pokemon);
    if (!this.raiz) {
      this.raiz = novo;
      return;
    }
    let atual = this.raiz;
    while (true) {
      if ((pokemon[this.chave] as number) < (atual.valor[this.chave] as number)) {
        if (atual.esquerda) {
          atual = atual.esquerda;
        } else {
          atual.esquerda = novo;
          return;
        }
      } else {
        if (atual.direita) {
          atual = atual.direita;
        } else {
          atual.direita = novo;
          return;
        }
      }
    }
  }

  emOrdem(no: Node | null = this.raiz): Pokemon[] {
    if (!no) return [];
    return [
      ...this.emOrdem(no.esquerda),
      no.valor,
      ...this.emOrdem(no.direita),
    ];
  }

  buscar(valor: number): { vistos: number } {
    let atual = this.raiz;
    let vistos = 0;

    while (atual !== null) {
      vistos++;
      const valorAtual = atual.valor[this.chave] as number;

      if (valor === valorAtual) {
        return { vistos: vistos };
      } else if (valor < valorAtual) {
        atual = atual.esquerda;
      } else {
        atual = atual.direita;
      }
    }

    return { vistos: vistos };
  }
}

type estatisticas = {
  estatica: number;
  arvore: number;
}

export default function Component() {
  const arvoreHP = useRef(new ArvoreBinaria("Hp"));
  const arvoreAtk = useRef(new ArvoreBinaria("Atk"));
  const arvoreDef = useRef(new ArvoreBinaria("Def"));

  const [pokemonsOrdenados, setPokemonsOrdenados] = useState<Pokemon[]>([]);
  const [ordemAtual, setOrdemAtual] = useState<string>("Hp");
  const [ordenacao, setOrdenacao] = useState<string>("cres"); 
  const [pesquisa, setPesquisa] = useState<number | null>(null);
  const [estaticas, setEstatisticas] = useState<estatisticas>({estatica: 0, arvore: 0});


  useEffect(() => {
    const carregarPokemons = async () => {
      try {
        const res = await fetch("/pokemons.json");
        const data: Pokemon[] = await res.json();
        
        data.forEach((p) => {
          arvoreHP.current.inserir(p);
          arvoreAtk.current.inserir(p);
          arvoreDef.current.inserir(p);
        });
        
        setPokemonsOrdenados(arvoreHP.current.emOrdem());
      } catch (error) {
        console.error("Erro ao carregar pokémons:", error);
      }
    };
    carregarPokemons();
  }, []);

  useEffect(() => {
    let arvore = arvoreHP.current;
    if (ordemAtual === "Ataque") arvore = arvoreAtk.current;
    else if (ordemAtual === "Defesa") arvore = arvoreDef.current;

    let listaBase = arvore.emOrdem();

    if (pesquisa !== null) {
      const chaveAtual = arvore.chave;
      listaBase = listaBase.filter(p => p[chaveAtual] === pesquisa);
      const buscaBinaria = arvore.buscar(pesquisa);
      const buscaEstatica = buscarEstatica(arvore.emOrdem(), pesquisa, chaveAtual);
      setEstatisticas({arvore: buscaBinaria.vistos, estatica: buscaEstatica});

    }
    
    if (ordenacao === "decres") {
      setPokemonsOrdenados([...listaBase].reverse());
    } else {
      setPokemonsOrdenados(listaBase);
    }
  }, [pesquisa, ordemAtual, ordenacao]);


  return (
    <div className="flex flex-col items-center">
      <div className="sticky top-0 w-full z-10">
        <Header handlePesquisar={setPesquisa} />
        <div className="flex h-[10%] bg-emerald-200 justify-evenly items-center w-full gap-4">
          <div className="flex-row justify-center gap-4">
            <p>Percorridos pela <br></br>Lista binária:{estaticas.arvore}<br></br>Lista estática:{estaticas.estatica}</p>
            <p>
              Ordenado por: <span className="font-bold">{ordemAtual}</span>
            </p>
          </div>
          <div>
            <button className="p-4 hover:bg-emerald-600" onClick={() => { 
              setOrdemAtual("Hp");
              setPesquisa(null);
              setEstatisticas({estatica: 0, arvore: 0});
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}>
              Ordenar por HP
            </button>
            <button className="p-4 hover:bg-emerald-600" onClick={() => {
              setOrdemAtual("Ataque");
              setPesquisa(null);
              setEstatisticas({estatica: 0, arvore: 0});
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}>
              Ordenar por Ataque
            </button>
            <button className="p-4 hover:bg-emerald-600" onClick={() => {
              setOrdemAtual("Defesa");
              setPesquisa(null);
              setEstatisticas({estatica: 0, arvore: 0});
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}>
              Ordenar por Defesa
            </button>
            <select className="p-2 ml-4 rounded text-md border bg-emerald-200 text-black font-bold" onChange={(e) => {
              setOrdenacao(e.target.value);
            }}>
              <option value="cres">Crescente</option>
              <option value="decres">Decrescente</option>
            </select>

          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row max-h-fit justify-between min-h-screen bg-emerald-100 w-full">
        <div className="flex w-full flex-col items-center justify-center">
          <PokemonList list={pokemonsOrdenados} />
        </div>
      </div>
    </div>
  );
}

const buscarEstatica = (list: Pokemon[], valor: number, chave: keyof Pokemon): number => {
  let vistos = 0;
  for (let i = 0; i < list.length; i++) {
    vistos++;
    if (list[i][chave] === valor) {
      break;
    }
  }
  return vistos;
}
