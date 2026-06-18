import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IoChevronBack, IoEyeOutline, IoEyeOffOutline, IoCloudUploadOutline, IoPersonCircleOutline } from "react-icons/io5"
import logo from "../assets/logo_musa2.png"
import imagemCadastro from "../assets/login-image.png"
import "../Styles/FazerCadastro.css"

import { cadastrarArtista } from "../services/artistasService"

const opcoesCidade = [
    { value: "", label: "Cidade - Estado" },
    { value: "Banabuiu", label: "Banabuiu - CE" },
    { value: "Choró", label: "Choró - CE" },
    { value: "Deputado Irapuan Pinheiro", label: "Deputado Irapuan Pinheiro - CE" },
    { value: "Ibaretama", label: "Ibaretama - CE" },
    { value: "Ibicuitinga", label: "Ibicuitinga - CE" },
    { value: "Milhã", label: "Milhã - CE" },
    { value: "Mombaça", label: "Mombaça - CE" },
    { value: "Pedra Branca", label: "Pedra Branca - CE" },
    { value: "Piquet Carneiro", label: "Piquet Carneiro - CE" },
    { value: "Quixadá", label: "Quixadá - CE" },
    { value: "Quixeramobim", label: "Quixeramobim - CE" },
    { value: "Senador Pompeu", label: "Senador Pompeu - CE" },
    { value: "Solonópole", label: "Solonópole - CE" },
]

const opcoesArea = [
    { value: "", label: "Selecione uma área" },
    { value: "Pintura", label: "Pintura" },
    { value: "Colagem", label: "Colagem" },
    { value: "Arte digital", label: "Arte digital" },
    { value: "Fotografia", label: "Fotografia" },
    { value: "Xilogravura", label: "Xilogravura" },
    { value: "Design", label: "Design" },
    { value: "Poesia", label: "Poesia" },
    { value: "Literatura", label: "Literatura" },
    { value: "Arquitetura", label: "Arquitetura" },
    { value: "Artesanato", label: "Artesanato" },
    { value: "Desenho", label: "Desenho" },
    { value: "Escultura", label: "Escultura" },
]

function FazerCadastro() {
    const navigate = useNavigate()
    const [etapa, setEtapa] = useState(1)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        nomeCompleto: "",
        email: "",
        nomeUsuario: "",
        senha: "",
        confirmarSenha: "",
        localizacao: "",
        linkPortfolio: "",
        linkInstagram: "",
        descricao: "",
        fotoPerfil: null,
        areaAtuacao: "",
        imagemTrabalho: null,
    })

    const [erros, setErros] = useState({})
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false)

    function validarSenha(senha) {
        return {
            minimo: senha.length >= 8,
            numero: /\d/.test(senha),
            simbolo: /[^a-zA-Z0-9]/.test(senha),
        }
    }

    const requisitos = validarSenha(form.senha)
    const senhaValida = requisitos.minimo && requisitos.numero && requisitos.simbolo

    function handleChange(campo, valor) {
        setForm({ ...form, [campo]: valor })
        setErros({ ...erros, [campo]: "" })
    }

    function validarEtapa1() {
        const novosErros = {}
        if (!form.nomeCompleto.trim()) novosErros.nomeCompleto = "Campo obrigatório"

        if (!form.email.trim()) {
            novosErros.email = "Campo obrigatório"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            novosErros.email = "E-mail inválido"
        }

        if (!form.nomeUsuario.trim()) novosErros.nomeUsuario = "Campo obrigatório"
        if (!senhaValida) novosErros.senha = "A senha não atende aos requisitos"
        if (form.senha !== form.confirmarSenha) novosErros.confirmarSenha = "As senhas não coincidem"
        setErros(novosErros)
        return Object.keys(novosErros).length === 0
    }

    function validarEtapa2() {
        const novosErros = {}
        if (!form.localizacao) novosErros.localizacao = "Campo obrigatório"
        setErros(novosErros)
        return Object.keys(novosErros).length === 0
    }

    function validarEtapa3() {
        const novosErros = {}
        if (!form.fotoPerfil) novosErros.fotoPerfil = "Foto de perfil obrigatória"
        if (!form.areaAtuacao) novosErros.areaAtuacao = "Campo obrigatório"
        if (!form.imagemTrabalho) novosErros.imagemTrabalho = "Envie pelo menos uma imagem do seu trabalho"
        setErros(novosErros)
        return Object.keys(novosErros).length === 0
    }

    async function handleFinalizarCadastro() {
        if (!validarEtapa3()) {
            return
        }
        setLoading(true)
        try {
            const formData = new FormData()

            formData.append("nomeCompleto", form.nomeCompleto)
            formData.append("email", form.email)
            formData.append("nomeUsuario", form.nomeUsuario)
            formData.append("senha", form.senha)
            formData.append("localizacao", form.localizacao)
            formData.append("linkPortfolio", form.linkPortfolio || "")
            formData.append("linkInstagram", form.linkInstagram || "")
            formData.append("descricao", form.descricao || "")
            formData.append("areaAtuacao", form.areaAtuacao)

            if (form.fotoPerfil) {
                formData.append("fotoPerfil", form.fotoPerfil)
            }
            if (form.imagemTrabalho) {
                formData.append("imagemTrabalho", form.imagemTrabalho)
            }

            await cadastrarArtista(formData)

            setEtapa(4)
        } catch (error) {
            console.error(error)
            const mensagem = error.response?.data?.erro || "Erro ao realizar cadastro. Tente novamente."
            alert(mensagem)
        } finally {
            setLoading(false)
        }
    }

    function proximaEtapa() {
        if (etapa === 1 && !validarEtapa1()) return
        if (etapa === 2 && !validarEtapa2()) return
        if (etapa === 3) {
            handleFinalizarCadastro()
            return
        }
        setEtapa(etapa + 1)
    }

    function voltarEtapa() {
        if (etapa === 1) {
            navigate("/login")
        } else {
            setEtapa(etapa - 1)
        }
    }

    return (
        <main className="cadastro-page">

            <img src={logo} alt="Musa" className="cadastro-logo-topo" onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
            <div className="cadastro-card">


                <div className="cadastro-formulario">

                    {/* TELA DE SUCESSO */}
                    {etapa === 4 ? (
                        <div className="cadastro-sucesso">
                            <h2>Seu cadastro foi um sucesso!</h2>
                            <p>Seja bem-vinda ao Musa, aqui você pode explorar, compartilhar e acompanhar trajetórias criativas, descobrindo novas expressões e fortalecendo uma rede feita por e para mulheres.</p>
                            <button className="botao-proximo" onClick={() => navigate("/")}>
                                Entrar
                            </button>
                        </div>
                    ) : (
                        <div className="cadastro-conteudo">
                            <button className="cadastro-voltar" onClick={voltarEtapa}>
                                <IoChevronBack />
                            </button>

                            <div className="cadastro-progresso">
                                <div className={`barra-progresso ${etapa >= 1 ? "ativa" : ""}`}></div>
                                <div className={`barra-progresso ${etapa >= 2 ? "ativa" : ""}`}></div>
                                <div className={`barra-progresso ${etapa >= 3 ? "ativa" : ""}`}></div>
                            </div>

                            <h2 className="cadastro-titulo">Criar Conta</h2>

                            {/* ETAPA 1 */}
                            {etapa === 1 && (
                                <div className="cadastro-campos">
                                    <div className="campo-cadastro">
                                        <label>Nome Completo</label>
                                        <input
                                            type="text"
                                            placeholder="Seu nome"
                                            value={form.nomeCompleto}
                                            onChange={(e) => handleChange("nomeCompleto", e.target.value)}
                                            className={erros.nomeCompleto ? "campo-erro" : ""}
                                        />
                                        {erros.nomeCompleto && <span className="erro-msg">{erros.nomeCompleto}</span>}
                                    </div>

                                    <div className="campo-cadastro">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            placeholder="Example@email.com"
                                            value={form.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            className={erros.email ? "campo-erro" : ""}
                                        />
                                        {erros.email && <span className="erro-msg">{erros.email}</span>}
                                    </div>

                                    <div className="campo-cadastro">
                                        <label>Nome de Usuário</label>
                                        <input
                                            type="text"
                                            placeholder="Nome de sua preferência para o perfil"
                                            value={form.nomeUsuario}
                                            onChange={(e) => handleChange("nomeUsuario", e.target.value)}
                                            className={erros.nomeUsuario ? "campo-erro" : ""}
                                        />
                                        {erros.nomeUsuario && <span className="erro-msg">{erros.nomeUsuario}</span>}
                                    </div>

                                    <div className="campo-cadastro">
                                        <label>Senha</label>
                                        <div className="input-senha-wrapper">
                                            <input
                                                type={mostrarSenha ? "text" : "password"}
                                                placeholder="Pelo menos 8 caracteres"
                                                value={form.senha}
                                                onChange={(e) => handleChange("senha", e.target.value)}
                                                className={erros.senha ? "campo-erro" : ""}
                                            />
                                            <button
                                                type="button"
                                                className="toggle-senha"
                                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                            >
                                                {mostrarSenha ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                            </button>
                                        </div>
                                        {form.senha.length > 0 && (
                                            <div className="requisitos-senha">
                                                <p className={requisitos.minimo ? "requisito-ok" : "requisito-pendente"}>
                                                    {requisitos.minimo ? "✅" : "🔘"} Mínimo de 8 caracteres
                                                </p>
                                                <p className={requisitos.numero ? "requisito-ok" : "requisito-pendente"}>
                                                    {requisitos.numero ? "✅" : "🔘"} Um número
                                                </p>
                                                <p className={requisitos.simbolo ? "requisito-ok" : "requisito-pendente"}>
                                                    {requisitos.simbolo ? "✅" : "🔘"} Um símbolo
                                                </p>
                                            </div>
                                        )}
                                        {erros.senha && <span className="erro-msg">{erros.senha}</span>}
                                    </div>

                                    <div className="campo-cadastro">
                                        <label>Confirmar Senha</label>
                                        <div className="input-senha-wrapper">
                                            <input
                                                type={mostrarConfirmar ? "text" : "password"}
                                                placeholder="Repita sua senha"
                                                value={form.confirmarSenha}
                                                onChange={(e) => handleChange("confirmarSenha", e.target.value)}
                                                className={erros.confirmarSenha ? "campo-erro" : ""}
                                            />
                                            <button
                                                type="button"
                                                className="toggle-senha"
                                                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                                            >
                                                {mostrarConfirmar ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                            </button>
                                        </div>
                                        {erros.confirmarSenha && <span className="erro-msg">{erros.confirmarSenha}</span>}
                                    </div>
                                </div>
                            )}

                            {/* ETAPA 2 */}
                            {etapa === 2 && (
                                <div className="cadastro-campos">
                                    <div className="campo-cadastro">
                                        <label>Localização</label>
                                        <div className="select-wrapper">
                                            <select
                                                value={form.localizacao}
                                                onChange={(e) => handleChange("localizacao", e.target.value)}
                                                className={erros.localizacao ? "campo-erro" : ""}
                                            >
                                                {opcoesCidade.map((op) => (
                                                    <option key={op.value} value={op.value}>{op.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {erros.localizacao && <span className="erro-msg">{erros.localizacao}</span>}
                                    </div>

                                    <div className="campo-cadastro">
                                        <label>Link do Portfólio</label>
                                        <input
                                            type="url"
                                            placeholder="URL"
                                            value={form.linkPortfolio}
                                            onChange={(e) => handleChange("linkPortfolio", e.target.value)}
                                        />
                                    </div>

                                    <div className="campo-cadastro">
                                        <label>Link do Instagram</label>
                                        <input
                                            type="url"
                                            placeholder="URL"
                                            value={form.linkInstagram}
                                            onChange={(e) => handleChange("linkInstagram", e.target.value)}
                                        />
                                    </div>

                                    <div className="campo-cadastro">
                                        <label>Descrição</label>
                                        <textarea
                                            placeholder="Conte um pouco sobre você"
                                            value={form.descricao}
                                            onChange={(e) => handleChange("descricao", e.target.value)}
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* ETAPA 3 */}
                            {etapa === 3 && (
                                <div className="cadastro-campos">
                                    <div className="campo-cadastro">
                                        <label>Foto de Perfil <span className="label-obrigatorio">*</span></label>
                                        <div className={`upload-foto-perfil ${erros.fotoPerfil ? "upload-erro" : ""}`}>
                                            <label htmlFor="fotoPerfil">
                                                {form.fotoPerfil ? (
                                                    <img
                                                        src={URL.createObjectURL(form.fotoPerfil)}
                                                        alt="Foto de perfil"
                                                        className="preview-foto-perfil"
                                                    />
                                                ) : (
                                                    <IoPersonCircleOutline className="icone-foto-perfil" />
                                                )}
                                            </label>
                                            <input
                                                type="file"
                                                id="fotoPerfil"
                                                accept="image/*"
                                                hidden
                                                onChange={(e) => handleChange("fotoPerfil", e.target.files[0])}
                                            />
                                        </div>
                                        {erros.fotoPerfil && <span className="erro-msg">{erros.fotoPerfil}</span>}
                                    </div>

                                    <div className="campo-cadastro">
                                        <label>Área de Atuação</label>
                                        <div className="select-wrapper">
                                            <select
                                                value={form.areaAtuacao}
                                                onChange={(e) => handleChange("areaAtuacao", e.target.value)}
                                                className={erros.areaAtuacao ? "campo-erro" : ""}
                                            >
                                                {opcoesArea.map((op) => (
                                                    <option key={op.value} value={op.value}>{op.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {erros.areaAtuacao && <span className="erro-msg">{erros.areaAtuacao}</span>}
                                    </div>

                                    <div className="campo-cadastro">
                                        <label>Imagem de um trabalho <span className="label-obrigatorio">*</span></label>
                                        <label
                                            htmlFor="imagemTrabalho"
                                            className={`upload-trabalho ${erros.imagemTrabalho ? "campo-erro" : ""}`}
                                        >
                                            <span>{form.imagemTrabalho ? form.imagemTrabalho.name : "Upload da imagem"}</span>
                                            <IoCloudUploadOutline />
                                        </label>
                                        <input
                                            type="file"
                                            id="imagemTrabalho"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleChange("imagemTrabalho", e.target.files[0])}
                                        />
                                        {erros.imagemTrabalho && <span className="erro-msg">{erros.imagemTrabalho}</span>}
                                    </div>
                                </div>
                            )}

                            <button className="botao-proximo" onClick={proximaEtapa} disabled={loading}>
                                {loading ? "Cadastrando..." : (etapa === 3 ? "Finalizar Cadastro" : "Próximo")}
                            </button>
                        </div>
                    )}
                </div>

                <div className="cadastro-banner">
                    <img src={imagemCadastro} alt="Banner Cadastro" />
                </div>
            </div>
        </main>
    )
}

export default FazerCadastro