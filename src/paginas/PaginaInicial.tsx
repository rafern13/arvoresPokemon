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
      if (pokemon[this.chave] < atual.valor[this.chave]) {
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
}

export default function Component() {
  const arvoreHP = useRef(new ArvoreBinaria("Hp"));
  const arvoreAtk = useRef(new ArvoreBinaria("Atk"));
  const arvoreDef = useRef(new ArvoreBinaria("Def"));

  const [pokemonsOrdenados, setPokemonsOrdenados] = useState<Pokemon[]>([]);
  const [ordemAtual, setOrdemAtual] = useState<string>("");

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
        setOrdemAtual("Hp");
      } catch (error) {
        console.error("Erro ao carregar pokémons:", error);
      }
    };

    carregarPokemons();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="sticky top-0 w-full z-10">
        <Header/>
        <div className="flex h-[10%] bg-emerald-200 justify-around items-center w-full gap-4 mb-4">
          <div className="">
            Ordenado por: <span className="font-bold">{ordemAtual}</span>
          </div>
          <div>
            <button className="p-4 hover:bg-emerald-600" onClick={() => { 
              setPokemonsOrdenados(arvoreHP.current.emOrdem())
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setOrdemAtual("Hp");
            }}>
              Ordenar por HP
            </button>
            <button className="p-4 hover:bg-emerald-600" onClick={() => {
              setPokemonsOrdenados(arvoreAtk.current.emOrdem())
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setOrdemAtual("Ataque");
            }}>
              Ordenar por Ataque
            </button>
            <button className="p-4 hover:bg-emerald-600" onClick={() => {
              setPokemonsOrdenados(arvoreDef.current.emOrdem())
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setOrdemAtual("Defesa");
            }}>
              Ordenar por Defesa
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <PokemonList list={pokemonsOrdenados} />
      </div>
    </div>
  );
}
