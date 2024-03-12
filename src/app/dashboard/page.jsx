import AvoidedEmissionsGraph from "@/components/AvoidedEmissionsGraph";
import HistoryGraph from "@/components/HistoryGraph";

export default function Home() {
    return (
        <>
            <section className="relative flex flex-row justify-start items-start w-full gap-8">
                <article className="relative flex flex-row justify-center p-4 bg-white rounded-xl items-start w-[calc(100%/2-10px)] gap-8">
                    <HistoryGraph />
                </article>
                <article className="relative flex flex-row justify-center p-4 bg-white rounded-xl items-start w-[calc(100%/2-10px)] gap-8">
                    <AvoidedEmissionsGraph />
                </article>
            </section>

            <section className="relative flex flex-row xl:flex-row justify-start items-start w-full gap-8">
                <div className="flex flex-row w-[calc(100%/2)] gap-4">
                    <article className="flex flex-col items-start justify-center w-[calc(100%/2)] pb-2 gap-4 bg-white rounded-xl">
                        <div className="bg-blue-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                        <div className="flex flex-col items-start py-2 px-8 justify-center gap-4">
                            <span className="text-base font-normal text-black">Total de clientes cadastrados</span>
                            <span className="text-2xl font-medium text-black">10 Clientes</span>
                        </div>
                    </article>
                    <article className="flex flex-col items-start justify-center w-[calc(100%/2)] pb-2 gap-4 bg-white rounded-xl">
                        <div className="bg-blue-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                        <div className="flex flex-col items-start py-2 px-8 justify-center gap-4">
                            <span className="text-base font-normal text-black">Total de clientes beneficiados</span>
                            <span className="text-2xl font-medium text-black">10 Clientes</span>
                        </div>
                    </article>
                </div>
                <div className="flex flex-row w-[calc(100%/2-20px)] gap-4">
                    <article className="flex flex-col items-start justify-center w-[calc(100%/4-10px)] pb-2 gap-4 bg-white rounded-xl">
                        <div className="bg-red-500 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                        <div className="flex flex-col items-start py-0 px-6 justify-center gap-4">
                            <span className="text-sm font-normal text-black">Emissões de energia Evitadas</span>
                            <div className="flex flex-row gap-4">
                                <span className="text-xl font-medium text-black">10 kg CO2 e</span>
                                {/* <span className="text-lg font-medium text-black"><span className="text-base text-blue-500">Energia</span> 10 kg CO2 e</span>
                                <span className="text-lg font-medium text-black"><span className="text-base text-green-700">Resíduos</span> 10 kg CO2 e</span>
                                <span className="text-lg font-medium text-black"><span className="text-base text-slate-500">Gás</span> 10 kg CO2 e</span> */}
                            </div>
                        </div>
                    </article>
                    <article className="flex flex-col items-start justify-center w-[calc(100%/4-10px)] pb-2 gap-4 bg-white rounded-xl">
                        <div className="bg-blue-500 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                        <div className="flex flex-col items-start py-0 px-6 justify-center gap-4">
                            <span className="text-sm font-normal text-black">Emissões de água Evitadas</span>
                            <div className="flex flex-row gap-4">
                                {/* <span className="text-xl font-medium text-black">10 kg CO2 e</span> */}
                                <span className="text-lg font-medium text-black"> 10 kg CO2 e</span>
                                {/* <span className="text-lg font-medium text-black"><span className="text-base text-green-700">Resíduos</span> 10 kg CO2 e</span> */}
                                {/* <span className="text-lg font-medium text-black"><span className="text-base text-slate-500">Gás</span> 10 kg CO2 e</span> */}
                            </div>
                        </div>
                    </article>
                    <article className="flex flex-col items-start justify-center w-[calc(100%/4-10px)] pb-2 gap-4 bg-white rounded-xl">
                        <div className="bg-green-700 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                        <div className="flex flex-col items-start py-0 px-6 justify-center gap-4">
                            <span className="text-sm font-normal text-black">Emissões de Resíduos Evitadas</span>
                            <div className="flex flex-row gap-4">
                                {/* <span className="text-xl font-medium text-black">10 kg CO2 e</span> */}
                                {/* <span className="text-lg font-medium text-black"> 10 kg CO2 e</span> */}
                                <span className="text-lg font-medium text-black">10 kg CO2 e</span>
                                {/* <span className="text-lg font-medium text-black"><span className="text-base text-slate-500">Gás</span> 10 kg CO2 e</span> */}
                            </div>
                        </div>
                    </article>
                    <article className="flex flex-col items-start justify-center w-[calc(100%/4-10px)] pb-2 gap-4 bg-white rounded-xl">
                        <div className="bg-slate-500 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                        <div className="flex flex-col items-start py-0 px-6 justify-center gap-4">
                            <span className="text-sm font-normal text-black">Emissões de Gás Evitadas</span>
                            <div className="flex flex-row gap-4">
                                {/* <span className="text-xl font-medium text-black">10 kg CO2 e</span> */}
                                {/* <span className="text-lg font-medium text-black"> 10 kg CO2 e</span> */}
                                {/* <span className="text-lg font-medium text-black">10 kg CO2 e</span> */}
                                <span className="text-lg font-medium text-black">10 kg CO2 e</span>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <section className="relative flex flex-row xl:flex-row justify-start items-start w-full gap-8">
                <article className="flex flex-col items-center justify-center pb-4 gap-4 w-[calc(100%/2)] bg-white rounded-xl">
                    <div className="bg-red-500 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                    <div className="flex flex-col items-center py-2 px-56 justify-center gap-4">
                        <span className="text-2xl font-normal text-black">Total de Benefícios</span>
                        <span className="text-3xl font-medium text-black">10 Clientes</span>
                    </div>
                </article>
                <article className="flex flex-col items-center justify-center pb-4 gap-4 w-[calc(100%/2-20px)] bg-white rounded-xl">
                    <div className="bg-orange-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                    <div className="flex flex-col items-center py-2 px-56 justify-center gap-4">
                        <span className="text-2xl font-normal text-black">Total de emissões evitadas</span>
                        <span className="text-3xl font-medium text-black">10 kg CO2 e</span>
                    </div>
                </article>
                {/* <article className="flex flex-col items-start justify-center pb-2 gap-4 bg-white rounded-xl">
                    <div className="bg-blue-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                    <div className="flex flex-col items-start py-2 px-8 justify-center gap-4">
                        <span className="text-xl font-semibold text-black">Total de clientes beneficiados</span>
                        <span className="text-2xl font-medium text-black">10 Clientes</span>
                    </div>
                </article>
                <article className="flex flex-col items-start justify-center pb-2 gap-4 bg-white rounded-xl">
                    <div className="bg-orange-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                    <div className="flex flex-col items-start py-2 px-8 justify-center gap-4">
                        <span className="text-xl font-semibold text-black">Emissões Evitadas</span>
                        <div className="flex flex-row gap-4">
                            <span className="text-lg font-medium text-black"> <span className="text-base text-red-500">Energia</span> 10 kg CO2 e</span>
                            <span className="text-lg font-medium text-black"><span className="text-base text-blue-500">Energia</span> 10 kg CO2 e</span>
                            <span className="text-lg font-medium text-black"><span className="text-base text-green-700">Resíduos</span> 10 kg CO2 e</span>
                            <span className="text-lg font-medium text-black"><span className="text-base text-slate-500">Gás</span> 10 kg CO2 e</span>
                        </div>
                    </div>
                </article> */}
            </section>
        </>
    )
}