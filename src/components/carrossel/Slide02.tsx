function Slide02() {
	return (
		<div className="bg-yellow-400 flex justify-center h-[50vh] md:h-[70vh]">
			<div className="container grid grid-cols-1 md:grid-cols-2 text-slate-900">
				<div className="flex flex-col gap-2 md:gap-4 items-center justify-center py-2 md:py-4">
					<h2 className="text-3xl md:text-5xl font-bold text-center">
						Promoção de Cosméticos!
					</h2>
					<p className="text-lg md:text-3xl text-center">
						Descontos de até 25%
					</p>
				</div>

				<div className="flex justify-center items-center w-full">
					<img
						src="https://ik.imagekit.io/laurengf/Farmacia_pg/itens.png"
						alt="Imagem Página Home"
						className="w-2/3 md:w-2/3 mx-auto h-52 md:h-80 lg:h-96 object-contain"
					/>
				</div>
			</div>
		</div>
	)
}

export default Slide02