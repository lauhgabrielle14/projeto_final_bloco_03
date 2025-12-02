import Carrossel from "../../components/carrossel/Carrossel"
import ListarProdutos from "../../components/produtos/listarprodutos/ListarProdutos"

//Construção do componente Home

function Home() {
	return (
		<>
			<div className="mt-6 md:mt-0">
				<Carrossel />
			</div>
			<div className="py-2 md:py-0 md:mb-4">
				<ListarProdutos />
			</div>
		</>
	)
}

export default Home
