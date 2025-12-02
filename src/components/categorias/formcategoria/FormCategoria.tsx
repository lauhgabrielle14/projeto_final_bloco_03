import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import { atualizar, cadastrar, listar } from "../../../services/Service";

function FormCategoria() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria)
    } catch (error: any) {
      alert('Categoria não encontrada!')
      console.error(error)
      retornar();
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })
  }

  async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategoria)

        alert('Categoria atualizado com sucesso')

      } catch (error: any) {
        alert('Erro ao atualizar o Categoria')
        console.error(error)
      }

    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria)

        alert('Categoria cadastrada com sucesso')

      } catch (error: any) {
        alert('Erro ao cadastrar a Categoria')
        console.error(error)
      }
    }

    setIsLoading(false)
    retornar();

  }

  function retornar() {
    navigate("/categorias")
  }

  return (
    <div className="container flex flex-col items-center justify-center px-2 pt-4 mx-auto">
      <h1 className="my-8 text-3xl text-center md:text-4xl">
        {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
      </h1>

      <form className="flex flex-col w-full max-w-md gap-4 px-2 md:max-w-1/2"
        onSubmit={gerarNovaCategoria}
      >
        <div className="flex flex-col gap-2 ">
          <label htmlFor="nome">Categoria</label>
          <input
            type="text"
            placeholder="Categoria"
            id='nome'
            name='nome'
            className="p-2 text-base bg-white border-2 rounded border-slate-700 utral-800 md:text-lg"
            required
            value={categoria.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="flex justify-center w-full py-2 mx-auto text-base rounded text-slate-100 bg-slate-400 hover:bg-slate-800 md:w-1/2 md:text-lg"
          type="submit"
        >
          {isLoading ?
            <ClipLoader
            color="#ffffff"
            size={24}
          />
            :
            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
          }
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;