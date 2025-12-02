import { useEffect, useState } from "react"
import { PacmanLoader } from "react-spinners"
import type Categoria from "../../../models/Categoria"
import { listar } from "../../../services/Service"
import CardCategorias from "../cardcategorias/CardCategorias"

//Componente para listar categorias

function ListarCategorias() {
	const [isLoading, setIsLoading] = useState(true)

	const [categorias, setCategorias] = useState<Categoria[]>([])

	async function buscarCategorias() {
		await listar("/categorias", setCategorias)
	}

	useEffect(() => {
		setIsLoading(true)
		buscarCategorias().finally(() => setIsLoading(false))
	}, [])

	return (
		<>
			{isLoading && (
				<div className="flex justify-center items-center min-h-[calc(100vh-8rem)] w-full overflow-x-hidden">
					<PacmanLoader
						color="#0D9488"
						margin={0}
						size={80}
						speedMultiplier={2}
						aria-label="Pacman-loading"
					/>
				</div>
			)}

			<div className="flex justify-center w-full min-h-[calc(100vh-8rem)] overflow-x-hidden">
				<div className="box-border w-full px-4 py-4 mt-8 mb-4 max-w-8xl sm:px-6 md:px-8 lg:px-12 md:py-6">
					{!isLoading && categorias.length === 0 && (
						<div className="my-8 text-2xl text-center md:text-3xl text-slate-700 md:my-16">
							Nenhuma categoria foi encontrada
						</div>
					)}

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 mb-4 md:mb-0">
						{categorias.map((categoria) => (
							<CardCategorias key={categoria.id} categoria={categoria} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default ListarCategorias
