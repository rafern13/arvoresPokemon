type Props = {
    estatica: number;
    arvore: number;
}

export default function Infos({estatica, arvore}: Props) {
    return (
        <aside className="w-1/5 p-4 bg-red-500 sticky top-40 text-white text-center text-2xl font-bold">
            <h2 className="text-3xl mb-4">Árvore Binária</h2>
            <div className="mb-4">
                <h3 className="text-xl mb-2">Estática</h3>
                <p className="text-lg">Número de Pokémons: {estatica}</p>
            </div>
            <div>
                <h3 className="text-xl mb-2">Dinâmica</h3>
                <p className="text-lg">Número de Pokémons: {arvore}</p>
            </div>
        </aside>
    );
}