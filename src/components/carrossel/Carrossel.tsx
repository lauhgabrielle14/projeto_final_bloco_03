import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"
import Slide01 from "./Slide01"
import Slide02 from "./Slide02"
import Slide03 from "./Slide03"

/**
 * Componente de carrossel responsivo com funcionalidades de:
 * - Autoplay automático a cada 5 segundos
 * - Navegação manual com botões (anterior/próximo)
 * - Paginação com dots indicadores
 * - Loop infinito
 * - Controles que aparecem no hover
 * - Layout responsivo (mobile/desktop)
 */
function Carrossel() {

	// Inicializa o Carrossel com configurações do Embla
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true, // Exibe os slides infinitamente
			align: "start", // Alinha os slides à esquerda
			slidesToScroll: 1, // Permite rolagem de um slide por vez
		},

		// Plugin de autoplay: avança automaticamente a cada 5s, sem parar ao interagir
		[Autoplay({ delay: 5000, stopOnInteraction: false })]
	)

	// Armazena o índice do slide atual
	const [selectedIndex, setSelectedIndex] = useState(0) 
	
	// Armazena o número total de slides
	const [slidesCount, setSlidesCount] = useState(0)

	/**
	 * Efeito que gerencia os eventos do carrossel
	 * Atualiza o índice atual e o total de slides quando o carrossel é inicializado
	 */
	useEffect(() => {

		/** Continua apenas se o emblaapi existir */
		if (!emblaApi) return

		/**
		 * Atualiza o índice do slide atual, através do método selectedScrollSnap()
		 * A função updateIndex será chamada sempre que trocar o slide atual
		 */
		const updateIndex = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap()) 
		}

		/**
		 * Atualiza o número de slides, através da função scrollSnapList().length
		 * scrollSnapList() retorna um array e através da propriedade length
		 * identificamos o tamano do array (numero total de slides)
		 */
		setSlidesCount(emblaApi.scrollSnapList().length)

		/**
		 * - "on" = adiciona um ouvinte de eventos (semelhante ao addEventListener)
		 * - "select" = nome do evento (disparado quando o slide muda)
		 * - updateIndex = função que será chamada quando o evento acontecer (troca do slide)
		 */
		emblaApi.on("select", updateIndex)

		// Atualiza o índice do slide inicial
		updateIndex()

		// Função Cleanup: remove o evento ao desmontar o componente
		return () => {
			/**
			 * Remove o ouvinte de eventos que foi adicionado com .on()
			 * Fazendo uma analogia, é como desligar a luz antes de sair de um cômodo
			 */
			emblaApi.off("select", updateIndex)
		}
	}, [emblaApi])

	/**
	 * Navega para um slide específico ao clicar no dot correspondente, 
	 * através da função scrollTo(index), onde index é o índice do slide
	 * @param index Índice do slide para navegar
	 */
	function scrollTo(index: number) {
		emblaApi?.scrollTo(index)
	}

	/**
	 * Navega para o slide anterior, através da função scrollPrev()
	 */
	function scrollPrev() {
		emblaApi?.scrollPrev()
	}

	/**
	 * Navega para o próximo slide, através da função scrollNext()
	 */
	function scrollNext() {
		emblaApi?.scrollNext()
	}

	return (
		<div className="relative md:max-h-[70vh] max-h-[50vh]">
			{/* 
				Container principal do carrossel
				
				A propriedade ref={emblaRef} indica que o container
				<div> será controlado pelo Embla Carousel

				Imagine que emblaRef é um controle remoto e a <div> é uma TV.
				Ao fazer ref={emblaRef}, você está "emparelhando" o controle com a TV.
				Agora o Embla pode ligar, desligar, mudar de canal (slides), etc.
				
				A classe "group" permite usar group-hover nos botões, ou seja,
				permite estilizar elementos filhos com base no estado do elemento pai, 
				como, por exemplo, quando o pai é hover. 

				No nosso exemplo, ao passar o mouse no Carrossel (Elemento pai), os botões de
				navegação ficam visíveis (Elementos filhos).
			*/}
			<div 
				className="overflow-hidden group" 
				ref={emblaRef}
			>
				{/* Container dos slides */}
				<div className="flex flex-cols">
					{/* Slide 1 */}
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide01 />
						</article>
					</div>
					
					{/* Slide 2 */}
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide02 />
						</article>
					</div>
					
					{/* Slide 3 */}
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide03 />
						</article>
					</div>

				</div>

				{/* Botões de Navegação - Anterior e Próximo */}
				{/* Botão Anterior */}
				<button
					className="cursor-pointer hidden md:flex items-center justify-center w-16 h-16 absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-opacity opacity-0 group-hover:opacity-100 bg-transparent hover:bg-transparent"
					onClick={scrollPrev}
					aria-label="Slide anterior"
				>
					<CaretLeftIcon size={48} className="text-white fill-white drop-shadow-xl" />
				</button>

				{/* Botão Próximo */}
				<button
					className="cursor-pointer hidden md:flex items-center justify-center w-16 h-16 absolute right-3 top-1/2 -translate-y-1/2 z-10 transition-opacity opacity-0 group-hover:opacity-100 bg-transparent hover:bg-transparent"
					onClick={scrollNext}
					aria-label="Próximo slide"
				>
					<CaretRightIcon size={48} className="text-white fill-white drop-shadow-xl" />
				</button>
			</div>

			{/* Paginação (Dots) - Indicadores de slide 
			
			 	- cria um array vazio com o numero de posições equivalente ao número de slides
				- Itera sobre cada posição do array
				- Para cada iteração, cria um botão (dot)
				- A propriedade KEY é o identificador único para cada dot
				- Ao clicar em um botão dot, ele executa a função scrollTo(index), redirecionando
				  para o respectivo slide associado ao respectivo indíce
				- Observe que a estilização dos dot é dinâmica, ou seja, mudam de cor sempre
				  que o estado slidesCount for modificado
			
			*/}
			<div className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
				{[...Array(slidesCount)].map((_, index) => (
					<button
						key={`carousel-dot-${index + 1}`}
						className={`cursor-pointer w-2 h-2 md:w-3 md:h-3 rounded-full transition-all p-0 ${
							selectedIndex === index ? "bg-white scale-125" : "bg-gray-400"
						}`}
						onClick={() => scrollTo(index)}
						aria-label={`Ir para slide ${index + 1}`}
						aria-current={selectedIndex === index ? "true" : "false"}
					/>
				))}
			</div>
		</div>
	)
}

export default Carrossel