import type { Pokemon } from "../types/Pokemon";
import PokemonCard from "./PokemonCard";

type Props = {
    list: Pokemon[];
}

export default function PokemonList( {list} : Props) {
    console.log(list);
    return (
        <ul className="w-3/5 flex justify-center items-center flex-wrap gap-4 sm:gap-7 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  sm:grid">
            {list.map((pokemon, i) => (
                <PokemonCard key={i} pokemon={pokemon} position={i} />
            ))}
        </ul>
    );
}