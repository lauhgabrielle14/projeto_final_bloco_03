import { ListIcon, ShoppingCartIcon, UserIcon, XIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

//Contrução Navbar 

/** 
 * Tipo (type) para controlar o estado do Menu Mobile (aberto ou fechado)
 * 
 * Type é uma forma mais flexível de declarar tipos no TypeScript. 
 * Ele permite criar aliases para objetos, tipos primitivos, unions (|) e 
 * intersections (&). 
 * type é recomendado quando há necessidade de compor tipos complexos, 
 * reutilizar estruturas ou trabalhar com variações de tipo. 
 * Ao contrário da interface, o type não pode ser declarado mais de uma vez
 * no seu código.
*/
type MenuState = 'closed' | 'open';

/** 
 * Tipagem das props recebidas pelo componente Navbar
 * - menuState: estado do menu mobile
 * - onMenuToggle: função para abrir/fechar menu mobile
 * - onMenuClose: função para fechar menu mobile
 * Todas as funções são passadas pelo componente pai (App)
*/
interface NavbarProps {
  menuState: MenuState;
  onMenuToggle: () => void;
  onMenuClose: () => void;
};

function Navbar({ menuState, onMenuToggle, onMenuClose }: Readonly<NavbarProps>) {
    /**
     * Referência para o menu mobile (pode ser usada para acessibilidade ou foco)
     * 
     * O useRef é um hook do React que permite criar uma referência mutável 
     * que persiste durante o ciclo de vida do componente. 
     * Ele é comumente utilizado para acessar diretamente elementos do DOM ou 
     * para armazenar valores que não precisam causar re-renderização quando 
     * modificados, que é o caso do menu mobile.
     *  
    */ 
    const menuRef = useRef<HTMLDivElement>(null);
    
    /** 
     * Função Handler (função responsável por responder a eventos disparados 
     * pela interface do usuário, como cliques, digitação, envio de formulários,
     *  entre outros.), para alternar o menu mobile entre abrir e fechar.
     */ 
    const handleMenuToggle = (): void => {
        onMenuToggle();
    };
    
    // Handler para fechar o menu mobile, ao clicar no botão X
    const handleMenuClose = (): void => {
        onMenuClose();
    };

    return (
        <>
            {/* Navbar fixa no topo, visível em todas as telas */}
            <div className='fixed top-0 left-0 z-50 flex justify-center w-full py-4 text-white bg-slate-800 md:py-2'>
                <div className="container flex items-center justify-between mx-6 mt-2 text-lg">
                    {/* Logo da farmácia, sempre visível, redireciona para Home */}
                    <Link to='/home'>
                        <img
                            src="https://ik.imagekit.io/laurengf/Farmacia_pg/logo.png?updatedAt=1764689632447"
                            alt="Logo"
                            className='w-50 md:w-60'
                        />
                    </Link>

                    {/* Barra de busca (aparece apenas no desktop/tablet) */}
                    <div className="relative flex items-center justify-center w-2/5 text-black max-md:hidden">
                        <SearchForm />
                    </div>

                    {/* Menu de navegação desktop/tablet */}
                    <div className='items-center hidden gap-4 py-4 md:flex'>
                        <Link to='/produtos' className='hover:underline'>Produtos</Link>
                        <Link to='/categorias' className='hover:underline'>Categorias</Link>
                        <Link to='/cadcategoria' className='hover:underline'>Cadastrar Categoria</Link>
                        <UserIcon size={32} weight='bold' />
                        <ShoppingCartIcon size={32} weight='bold' />
                    </div>

                    {/* Botão menu mobile (hambúrguer), só aparece em telas pequenas e quando o menu está fechado */}
                    {menuState === 'closed' && (
                      <button className="p-2 cursor-pointer md:hidden" onClick={handleMenuToggle} aria-label="Abrir menu">
                        <ListIcon size={32} weight="bold" />
                      </button>
                    )}
                </div>
            </div>

            {/* Menu mobile (aparece sobrepondo o conteúdo quando aberto) */}
            {menuState === 'open' && (
                <div 
                    ref={menuRef}
                    className="fixed top-0 left-0 z-50 w-full h-full transition-all duration-300 ease-in-out bg-slate-800 bg-opacity-95 md:hidden animate-fade-in animate-slide-in"
                    style={{ animation: 'fade-in 0.3s, slide-in 0.3s' }}
                >
                    <div className="relative flex flex-col items-start justify-start gap-2 p-6 text-lg text-left text-white">
                        {/* Linha com logo à esquerda e botão X à direita */}
                        <div className="flex items-center justify-between w-full mb-2">
                          <img
                              src="https://ik.imagekit.io/laurengf/Farmacia_pg/logo.png?updatedAt=1764689632447"
                              alt="Logo"
                              className='w-50 md:w-60'
                          />
                          <button
                              type="button"
                              aria-label="Fechar menu"
                              className="mr-2 text-white cursor-pointer hover:text-gray-300"
                              onClick={handleMenuClose}
                          >
                              <XIcon size={32} weight="bold" />
                          </button>
                        </div>
                        
                        {/* Barra de busca mobile */}
                        <div className="w-full mb-4">
                            <SearchForm />
                        </div>
                        
                        {/* Links de navegação mobile OK */}
                        <Link to='/home' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
                            Home
                        </Link>
                        <Link to='/produtos' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
                            Produtos
                        </Link>
                        <Link to='/cadproduto' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
                            Cadastrar Produto
                        </Link>
                        <Link to='/categorias' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
                            Categorias
                        </Link>
                        <Link to='/cadcategoria' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
                            Cadastrar Categoria
                        </Link>
                        
                        {/* Ícones de usuário e carrinho no menu mobile */}
                        <div className='flex gap-4 mt-4'>
                        <Link to='' onClick={handleMenuClose} >
                            <UserIcon size={32} weight='bold' className="text-white" />
                        </Link>
                        <Link to='' onClick={handleMenuClose} >
                            <ShoppingCartIcon size={32} weight='bold' className="text-white" />                        
                        </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar