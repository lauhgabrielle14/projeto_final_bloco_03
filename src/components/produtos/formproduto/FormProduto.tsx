import { type ChangeEvent, type FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { atualizar, cadastrar, listar } from "../../../services/Service"

import type Categoria from "../../../models/Categoria"
import type Produto from "../../../models/Produto"
import { ClipLoader } from "react-spinners"

function FormProduto() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [categorias, setCategorias] = useState<Categoria[]>([])

	const [categoria, setCategoria] = useState<Categoria>({
		id: 0,
		nome: "",
	})
	const [produto, setProduto] = useState<Produto>({} as Produto)

	const { id } = useParams<{ id: string }>()

	// Detecta se está em uma rota (página completa) ou no modal
	const isPageView = id !== undefined || window.location.pathname.includes('/produto')

	async function buscarProdutoPorId(id: string) {
		try {
			await listar(`/produtos/${id}`, setProduto)
		} catch (error: any) {
			alert("Erro ao Buscar Produto")
			console.error(error)
		}
	}

	async function buscarCategoriaPorId(id: string) {
		try {
			await listar(`/categorias/${id}`, setCategoria)
		} catch (error: any) {
			alert("Erro ao Buscar Categoria")
			console.error(error)
		}
	}

	async function buscarCategorias() {
		try {
			await listar(`/categorias`, setCategorias)
		} catch (error: any) {
			alert("Erro ao Buscar Categorias")
			console.error(error)
		}
	}

	useEffect(() => {
		buscarCategorias()

		if (id !== undefined) {
			buscarProdutoPorId(id)
		}
	}, [id])

	useEffect(() => {
		setProduto({
			...produto,
			categoria: categoria,
		})
	}, [categoria])

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		const { type, value, name } = e.target
		let valor: string | number = value

		if (["number", "range"].includes(type) || (!isNaN(Number(value)) && value !== "")) {
			const valorSemZeros = value.replace(/^0+(?!$)/, "") || "0"
			valor = parseFloat(Number(valorSemZeros).toFixed(2))
		}

		setProduto({
			...produto,
			[name]: valor,
			categoria: categoria,
		})
	}

	function retornar() {
		navigate("/produtos")
	}

	async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)

		if (id !== undefined) {
			try {
				await atualizar(`/produtos`, produto, setProduto)

				alert("Produto atualizado com sucesso")
			} catch (error: any) {
				alert("Erro ao atualizar o Produto!")
				console.error(error)
			}
		} else {
			try {
				await cadastrar(`/produtos`, produto, setProduto)

				alert("Produto cadastrado com sucesso")
			} catch (error: any) {
				alert("Erro ao cadastrar o Produto!")
				console.error(error)
			}
		}

		setIsLoading(false)
		retornar()
	}

	return (
		<div className={`container flex flex-col items-center justify-center mx-auto my-4 md:my-0 md:h-[81vh] ${
			isPageView ? 'px-4 py-12 md:py-20 min-h-[60vh]' : 'px-4 py-12'
		}`}>
			<h1 className="text-3xl md:text-4xl text-center mb-6">
				{id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
			</h1>

			<form
				className="w-full max-w-lg flex flex-col gap-4"
				onSubmit={gerarNovoProduto}
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="nome" className="font-medium">Nome do Produto</label>
					<input
						value={produto.nome}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						type="text"
						placeholder="Insira aqui o nome do Produto"
						name="nome"
						id="nome"
						required
						className="border-2 border-slate-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="preco" className="font-medium">Preço do Produto</label>
					<input
						value={
							produto.preco === 0 || produto.preco === undefined ? "" : produto.preco
						}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						type="number"
						step=".01"
						placeholder="Adicione aqui o preço do Produto"
						name="preco"
						id="preco"
						required
						className="border-2 border-slate-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="foto" className="font-medium">Foto do Produto</label>
					<input
						value={produto.foto}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						type="text"
						placeholder="Adicione aqui a URL da foto do Produto"
						name="foto"
						id="foto"
						required
						className="border-2 border-slate-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="categoria" className="font-medium">Categoria do Produto</label>
					<select
						name="categoria"
						id="categoria"
						className="p-2 bg-white border-2 rounded border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
						value={categoria.id !== 0 ? categoria.id : ""}
						onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
					>
						<option value="" disabled>
							Selecione uma Categoria
						</option>
						{categorias.map((categoria) => (
							<option key={categoria.id} value={categoria.id}>
								{categoria.nome}
							</option>
						))}
					</select>
				</div>

				<button
					className="rounded text-slate-100 bg-slate-400 hover:bg-slate-800 
								w-full py-2 mt-2 flex justify-center items-center text-base transition-colors"
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? (
						<ClipLoader color="#ffffff" size={24} />
					) : (
						<span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
					)}
				</button>
			</form>
		</div>
	)
}

export default FormProduto