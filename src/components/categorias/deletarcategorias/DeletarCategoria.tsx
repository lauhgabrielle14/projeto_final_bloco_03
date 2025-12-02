import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import type Categoria from "../../../models/Categoria"
import { deletar, listar } from "../../../services/Service"

//Componente para deletar categorias

function DeletarCategoria() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await listar(`/categorias/${id}`, setCategoria)
        } catch (error: any) {
            alert('Tema não encontrado!')
            console.error(error)
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarCategoria() {
        setIsLoading(true)

        try {
            await deletar(`/categorias/${id}`)

            alert('Categoria apagada com sucesso')

        } catch (error) {
            alert('Erro ao apagar a categoria')
            console.error(error)
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/categorias")
    }

    return (
        <div className='container w-full max-w-md px-4 pt-4 mx-auto md:pt-6'>
            <h1 className='py-4 text-3xl text-center md:text-4xl'>Deletar Categoria</h1>
            <p className='mb-4 text-base font-semibold text-center md:text-lg'>
                Você tem certeza de que deseja apagar a categoria a seguir?</p>
            <div className='flex flex-col justify-between overflow-hidden border rounded-2xl'>
                <header
                    className='px-4 py-2 text-lg font-bold text-white md:px-6 bg-slate-600 md:text-2xl'>
                    Categoria
                </header>
                <p className='h-full p-4 text-xl bg-white md:p-8 md:text-3xl'>{categoria.nome}</p>
                <div className="flex flex-row">
                    <button
                        className='w-full py-2 text-base bg-red-400 text-slate-100 hover:bg-red-600 md:text-lg'
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className='flex items-center justify-center w-full text-base bg-teal-600 text-slate-100 hover:bg-teal-700 md:text-lg'
                        onClick={deletarCategoria}
                    >
                        {isLoading ?
                            <ClipLoader
                            color="#ffffff"
                            size={24}
                          />
                            :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarCategoria