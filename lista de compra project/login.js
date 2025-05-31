// login.js

// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Configuração do seu projeto Firebase.
// IMPORTANTE: Substitua os valores abaixo pelas credenciais reais do seu projeto no Firebase Console.
// Idealmente, você importaria 'app' ou 'auth' diretamente de 'firebase.js' para não duplicar a config.
// Exemplo: import { auth } from './firebase.js';
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializa o Firebase (se não estiver importando 'auth' de firebase.js)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Obtém a instância de autenticação

// Exemplo para teste de login:
// Em uma aplicação real, estes valores viriam de um formulário de login.
const emailDeTeste = "teste@example.com";
const senhaDeTeste = "123456";

// Tenta fazer login com o e-mail e senha fornecidos
signInWithEmailAndPassword(auth, emailDeTeste, senhaDeTeste)
  .then((userCredential) => {
    // Login bem-sucedido
    const user = userCredential.user;
    console.log('Logado com sucesso:', user);
    // Aqui você poderia redirecionar o usuário ou atualizar a UI
  })
  .catch((error) => {
    // Trata erros de login
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Erro no login:', errorCode, errorMessage);
    // Aqui você poderia exibir uma mensagem de erro para o usuário
  });