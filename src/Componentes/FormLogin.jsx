
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import CampoInput from "./CampoInput";
import Botao from "./BotaoLogin";

import { auth } from "../firebaseConfig"; 

import "../Styles/FormLogin.css";

//Estados e inicialização
const FormLogin = () => {
  const [email, setEmail] = useState(""); 
  const [senha, setSenha] = useState("");

  
  const [erro, setErro] = useState("");
  const [erroEmail, setErroEmail] = useState(""); 
  const [erroSenha, setErroSenha] = useState("");

  const navigate = useNavigate(); // Função para mandar o usuário para outra tela após o login

  //Validação de Campos 
  const handleLogin = async (e) => {
    e.preventDefault();

    // Reseta os erros para começar a validação do zero
    setErro("");
    setErroEmail("");
    setErroSenha("");

    let possuiErro = false;

    // Usamos um 'if' separado (e não um 'else if') para garantir que ambos os campos sejam validados no mesmo clique, exibe múltiplos erros simultâneos.
    if (!email.trim()) {
      setErroEmail("Campo obrigatório"); // Modifica o estado do erro de senha
      possuiErro = true;
    }

    if (!senha.trim()) {
      setErroSenha("Campo obrigatório");
      possuiErro = true;
    }

    if (possuiErro) {
      return;
    }

    // Sequencia do Try:
    // 1. Declara credencial e aguarda a resposta de login do Firebase (retorna uma promessa).
    // Quando ele retorna, a credencial é o objeto do usuário que foi autenticado no servidor.
    // 2. Depois declara o Token e aguarda essa nova promessa, que gera o token de identificação (código único).
    // A credencial traz os dados do usuário, e o token é o valor seguro gerado para esse usuário.
    // 3. Depois de pegar o token, usa ele para armazenar no localStorage, que fica salvo no navegador.
    // O localStorage é uma área de armazenamento do navegador (cliente), guarda o token lá para futuras visitas.
    // O token não é a senha, é um código temporário que comprova que o login foi feito com sucesso.
    // Quando você envia o email e a senha, o Firebase compara com o banco de dados e retorna o usuário.
    // Email e senha são usados no início. Depois que valida o usuário, gera um token (chave segura para outras requisições).
    // As credenciais enviadas são o email e senha digitados.
    // O auth é uma instância que já configurei e representa a conexão com o Firebase, indicando qual projeto acessar.

    try {
      const credencial = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      // Pega o token de segurança do usuário que acabou de logar
      const token = await credencial.user.getIdToken();

      // Salva o token e o ID do usuário no navegador (localStorage)
      localStorage.setItem("token", token);
      localStorage.setItem("uid", credencial.user.uid);

      navigate("/");
      // bloco que lida com erros se a promessa de login falhar
    } catch (error) {
      setErro("Email ou senha inválidos.");

      setErroEmail("Verifique este campo");
      setErroSenha("Verifique este campo");
    }
  };

  //Renderiza a tela
  return (
    <div className="form-login-container">
      <h1>
        Seja Bem-Vinda <span>👋</span>
      </h1>

      <p>
        Entre para explorar, valorizar e dar
        visibilidade à arte de mulheres incríveis.
      </p>

      <form
        className="form-login"
        onSubmit={handleLogin}
      >
        <CampoInput
          label="Email"
          name="email"
          placeholder="Example@email.com"
          value={email}

          // O 'handleOnChange' é ativado toda vez que o usuário digita ou apaga uma letra
          handleOnChange={(e) => {
            // Pega o que foi digitado (e.target.value) e salva no estado 'email'
            setEmail(e.target.value);

            if (erroEmail) {
              // Se existia um erro, limpa ele (volta para vazio "") 
              // Fazemos isso para que a mensagem vermelha suma assim que o usuário começar a corrigir o texto
              setErroEmail("");
            }
          }}
          // Passa para o componente a mensagem de erro atual (se houver) para ser exibida em vermelho abaixo do campo
          erro={erroEmail}

        />

        <CampoInput
          label="Senha"
          name="senha"
          type="password"
          placeholder="Pelo menos 8 caracteres"
          value={senha}
          handleOnChange={(e) => {
            setSenha(e.target.value);

            if (erroSenha) {
              setErroSenha("");
            }
          }}
          erro={erroSenha}
        />

        {erro && (
          <span style={{ color: "red" }}>
            {erro}
          </span>
        )}

        <Botao
          texto="Entrar"
          type="submit"
        />
      </form>

      <p className="cadastro-link">
        Você não tem uma conta?
        <Link to="/cadastro">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
};

export default FormLogin;