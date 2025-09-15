import { useState } from "react";

type Props = {
    handlePesquisar: (termo: number) => void;
}

export default function Header( {handlePesquisar}: Props) {
    const [numeroSelecionado, setNumeroSelecionado] = useState<number | null>(null);

    return (
        <header className="w-full flex justify-between items-center p-4 bg-red-500 text-white text-center text-3xl font-bold">
        <h1 className="text-4xl ml-4">
            Pokédex
        </h1>
        <div className="mt-2">
            <input
                type="number"
                placeholder="Pesquisar por atributo"
                onChange={(e) => setNumeroSelecionado(e.target.value ? parseInt(e.target.value) : null)}
                value={numeroSelecionado !== null ? numeroSelecionado : ""}
                className="p-2 rounded text-md border bg-emerald-200 text-black"
            />
            <input
                type="button"
                value={"Pesquisar"}
                onClick={() => handlePesquisar(numeroSelecionado ?? 0)}
                className="ml-2 mr-2 p-2 rounded text-md border border-black text-black bg-emerald-200 hover:bg-emerald-500 cursor-pointer"
            />
        </div>
        </header>
    );
}