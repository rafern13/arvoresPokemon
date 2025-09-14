import { useEffect, useState } from "react";
import type { Pokemon } from "../types/Pokemon";

type Props = {
  pokemon: Pokemon;
  position: number;
};

export default function PokemonCard({ pokemon , position }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<any>(null);

  useEffect(() => {
    if (typeof pokemon.Nome === "string" && pokemon.Nome.trim() !== "") {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.Nome.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => {
          setPokemonData(data);
          setIsLoading(false);
        })
        .catch(() => {
          setPokemonData(null);
          setIsLoading(false);
        });
    }
  }, [pokemon]);

  return (
    <div className="pokemon-card">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-50 h-90 flex justify-between flex-col items-center gap-1 p-1 border border-gray-500 rounded-2xl">
          <div className="relative font-bold text-2xl font-mono right-0 w-full top-2">{position + 1}º</div>
          <h2 className="text-2xl font-bold">{pokemon.Nome}</h2>
          <div className="border-gray-300 border-2 rounded-2xl p-1 w-full flex justify-center items-center">
            {pokemonData?.sprites?.front_default ? (
              <img
                className="p-4"
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
              />
            ) : (
              <div className="p-4 text-center text-gray-400">Imagem indisponível</div>
            )}
          </div>
          <div className="w-full flex flex-col gap-1 items-start">
            <p className="px-2">Hp: {pokemon.Hp ?? "?"}</p>
            <p className="px-2">Atk: {pokemon.Atk ?? "?"}</p>
            <p className="px-2">Def: {pokemon.Def ?? "?"}</p>
            <p className="px-2">
              Tipos:{" "}
              {pokemonData?.types
                ? pokemonData.types.map((typeInfo: any) => typeInfo.type.name).join(", ")
                : "?"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
