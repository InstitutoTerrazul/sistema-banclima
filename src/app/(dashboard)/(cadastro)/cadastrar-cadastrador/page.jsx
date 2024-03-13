export default function CadastrarCadastrador() {
    return (

        <div className="flex flex-col justify-start items-start p-10 w-full gap-8 bg-white rounded-xl">

            <h1 className="text-3xl font-bold text-gray-800"> Cadastrar Cadastrador</h1>

            <form className="flex flex-col items-center justify-center w-full gap-6 px-8">
                <div className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Nome" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="E-mail" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                </div>
                <div className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Usuário" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Senha" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                </div>
                <div className="flex flex-row justify-end w-full gap-4">
                    <button type="submit" className="flex items-center justify-center bg-primary px-8 py-2 rounded-lg">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}