import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Home() {
  // Estado para armazenar os dados dos imóveis
  const [imoveis, setImoveis] = useState([]);
  // Estado para armazenar o valor da busca
  const [searchTerm, setSearchTerm] = useState("");

  // Obter a localização atual para acessar os parâmetros da URL
  const location = useLocation();
  // Extrair o parâmetro "walletHash" da query string da URL
  const queryParams = new URLSearchParams(location.search);
  const userWalletHash = queryParams.get("walletHash") || "";

  // Função para carregar os dados dos imóveis
  useEffect(() => {
    // Lógica para carregar os dados dos imóveis do arquivo JSON
    const fetchImoveis = async () => {
      try {
        // Supondo que os dados dos imóveis estejam em arquivos chamados "imovel1.json", "imovel2.json" e "imovel3.json"
        const response1 = await fetch("/src/metadata/imovel1.json");
        const data1 = await response1.json();

        const response2 = await fetch("/src/metadata/imovel2.json");
        const data2 = await response2.json();

        const response3 = await fetch("/src/metadata/imovel3.json");
        const data3 = await response3.json();

        setImoveis([data1, data2, data3]); // Adicionando todos os dados dos imóveis ao estado imoveis
      } catch (error) {
        console.error("Error fetching imoveis:", error);
      }
    };

    fetchImoveis();
  }, []);

  return (
    <div className="bg-purple-900 text-white h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-4">Bem vindo ao CryptoHome</h1>
      <p className="text-l mb-4">
        Explore uma ampla variedade de opções de apartamentos, casas e outros
        tipos de propriedades disponíveis para aluguel
      </p>
      <p className="absolute top-0 right-0 m-5 font-bold">
        Carteira conectada: {userWalletHash}
      </p>

      {/* Barra de busca */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar imóveis..."
        className="bg-white text-gray-800 rounded-md p-2 mb-4"
        style={{ width: "50%", padding: "0.5rem" }}
      />

      {/* Cards de imóveis */}
      <div className="grid grid-cols-3 gap-4">
        {imoveis.map((imovel, index) => (
          <div key={index} className="bg-white p-4 rounded-md">
            <img
              src={imovel.image}
              alt={imovel.name}
              className="w-full h-auto mb-2 rounded-md"
            />
            <p className="text-gray-800">{imovel.description}</p>
            <p className="text-gray-800">Endereço: {imovel.address}</p>
            {/* Botão de locação */}
            <button
              className="bg-purple-600 text-white py-2 px-4 rounded-md mt-2"
              onClick={() => handleLocacao(imovel.id)} // Substitua 'handleLocacao' pela sua função de locação
            >
              Alugar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
