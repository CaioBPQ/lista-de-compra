// firebase.js

// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuração do seu projeto Firebase.
// IMPORTANTE: Substitua os valores abaixo pelas credenciais reais do seu projeto no Firebase Console.
const firebaseConfig = {
  apiKey: "SUA_API_KEY", // Chave de API para autenticar com os serviços do Firebase
  authDomain: "SEU_AUTH_DOMAIN", // O domínio de autenticação do seu projeto (ex: seuprojeto.firebaseapp.com)
  projectId: "SEU_PROJECT_ID", // O ID do seu projeto Firebase
  storageBucket: "SEU_STORAGE_BUCKET", // O bucket do Firebase Storage (ex: seuprojeto.appspot.com)
  messagingSenderId: "SEU_MESSAGING_SENDER_ID", // ID do remetente para o Firebase Cloud Messaging
  appId: "SEU_APP_ID" // ID do seu aplicativo Firebase
};

// Inicializa o Firebase com as configurações fornecidas
const app = initializeApp(firebaseConfig);

// Exporta a instância do serviço de Autenticação do Firebase.
// Você usará isso em outros arquivos para gerenciar o login, cadastro, etc.
export const auth = getAuth(app);

// Não há mais chave extra aqui.