/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import {onRequest, onCall, HttpsError} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

admin.initializeApp();

const db = admin.firestore();

// tipo que representa um time.
type SoccerTeam = {
  name: string;
  foundationYear: number;
};

type AddSoccerTeamInput = {
  name: string;
  foundationYear: number;
};

type AddSoccerTeamResult = {
  id: string;
  team: SoccerTeam;
};

// array de times.
const soccerTeams: SoccerTeam[] = [
  {name: "Flamengo", foundationYear: 1895},
  {name: "Fluminense", foundationYear: 1902},
  {name: "Vasco da Gama", foundationYear: 1898},
  {name: "Botafogo", foundationYear: 1904},
  {name: "Corinthians", foundationYear: 1910},
  {name: "Palmeiras", foundationYear: 1914},
  {name: "Sao Paulo", foundationYear: 1930},
  {name: "Santos", foundationYear: 1912},
  {name: "Gremio", foundationYear: 1903},
  {name: "Internacional", foundationYear: 1909},
  {name: "Cruzeiro", foundationYear: 1921},
  {name: "Atletico Mineiro", foundationYear: 1908},
  {name: "Bahia", foundationYear: 1931},
  {name: "Vitoria", foundationYear: 1899},
  {name: "Sport Recife", foundationYear: 1905},
  {name: "Nautico", foundationYear: 1901},
  {name: "Santa Cruz", foundationYear: 1914},
  {name: "Ceara", foundationYear: 1914},
  {name: "Fortaleza", foundationYear: 1918},
  {name: "Athletico Paranaense", foundationYear: 1924},
  {name: "Coritiba", foundationYear: 1909},
  {name: "Goias", foundationYear: 1943},
  {name: "Atletico Goianiense", foundationYear: 1937},
  {name: "Guarani", foundationYear: 1911},
  {name: "Ponte Preta", foundationYear: 1900},
  {name: "Chapecoense", foundationYear: 1973},
  {name: "Avai", foundationYear: 1923},
  {name: "Figueirense", foundationYear: 1921},
  {name: "Juventude", foundationYear: 1913},
  {name: "Criciuma", foundationYear: 1947},
];

/**
 * Exclui TODOS os documentos de uma colecao.
 * @param {FirebaseFirestore.CollectionReference} collectionRef
 * Referencia da colecao desejada.
 * @return {Promise<number>} Numero de documentos excluidos.
 */
async function deleteCollectionDocuments(
  collectionRef: FirebaseFirestore.CollectionReference,
): Promise<number> {
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    return 0;
  }

  const deletePromises = snapshot.docs.map((doc) => doc.ref.delete());
  await Promise.all(deletePromises);

  return snapshot.size;
}

/**
 * Insere diversos times de futebol em uma colecao.
 * @param {FirebaseFirestore.CollectionReference} collectionRef
 * Referencia da colecao desejada.
 * @param {SoccerTeam[]} teams Array de times a serem inseridos.
 * @return {Promise<number>} Numero de times inseridos.
 */
async function insertSoccerTeams(
  collectionRef: FirebaseFirestore.CollectionReference,
  teams: SoccerTeam[],
): Promise<number> {
  const insertPromises = teams.map((team) => collectionRef.add(team));
  await Promise.all(insertPromises);

  return teams.length;
}

/**
 * Firebase Function para popular a coleção de times.
 * Exclui todos os times que existem e insere os times do array `soccerTeams`.
 * A função é acionada por uma requisição HTTP GET.
 * O endpoint da função é: https://southamerica-east1-<project-id>.cloudfunctions.net/generateSoccerTeams
 * Substitua <project-id> pelo ID do seu projeto Firebase.
 * Exemplo de requisição usando curl:
 * curl -X GET https://southamerica-east1-<project-id>.cloudfunctions.net/generateSoccerTeams
 * curl -X GET https://southamerica-east1-<project-id>.cloudfunctions.net/generateSoccerTeams?name=Flamengo&foundationYear=1895
 */
export const generateSoccerTeams = onRequest(
  {region: "southamerica-east1"},
  async (req, res) => {
    try {
      if (req.method !== "GET") {
        res.status(405).json({
          success: false,
          message: "Method not allowed. Use GET.",
        });
        return;
      }

      const collectionRef = db.collection("soccerTeams");
      const deletedCount = await deleteCollectionDocuments(collectionRef);
      const insertedCount = await insertSoccerTeams(collectionRef, soccerTeams);

      res.status(200).json({
        success: true,
        message: "soccerTeams collection recreated successfully.",
        deletedCount,
        insertedCount,
      });
    } catch (error) {
      console.error("Error generating soccer teams:", error);

      res.status(500).json({
        success: false,
        message: "Internal server error while generating soccer teams.",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
);

/**
 * Function para buscar times de futebol por nome ou ano de fundação.
 * A função é acionada por uma requisição HTTP GET.
 * O endpoint da função é: https://southamerica-east1-<project-id>.cloudfunctions.net/searchSoccerTeams
 * Substitua <project-id> pelo ID do seu projeto Firebase.
 * Exemplo de requisição usando curl:
 * curl -X GET "https://southamerica-east1-<project-id>.cloudfunctions.net/searchSoccerTeams?name=Palmeiras"
 * curl -X GET "https://southamerica-east1-<project-id>.cloudfunctions.net/searchSoccerTeams?foundationYear=1900"
 */
export const searchSoccerTeams = onRequest(
  {region: "southamerica-east1"},
  async (req, res) => {
    try {
      if (req.method !== "GET") {
        res.status(405).json({
          success: false,
          message: "Method not allowed. Use GET.",
        });
        return;
      }

      const name = req.query.name as string | undefined;
      const foundationYear = req.query.foundationYear as string | undefined;

      if (!name && !foundationYear) {
        res.status(400).json({
          success: false,
          message: "Provide either 'name' or 'foundationYear' query parameter.",
        });
        return;
      }

      const collectionRef = db.collection("soccerTeams");

      let query: FirebaseFirestore.Query = collectionRef;

      if (name) {
        query = query.where("name", "==", name);
      }

      if (foundationYear) {
        const year = Number(foundationYear);

        if (Number.isNaN(year)) {
          res.status(400).json({
            success: false,
            message: "foundationYear must be a valid number.",
          });
          return;
        }

        query = query.where("foundationYear", "==", year);
      }

      const snapshot = await query.get();

      if (snapshot.empty) {
        res.status(404).json({
          success: false,
          message: "No teams found.",
        });
        return;
      }

      const teams = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json({
        success: true,
        count: teams.length,
        teams,
      });
    } catch (error) {
      console.error("Error searching soccer teams:", error);

      res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
);

/**
 * Valida e normaliza os dados de entrada para a função addSoccerTeam.
 * @param {Partial<AddSoccerTeamInput>} input de dados a ser validado.
 * @return {SoccerTeam} Time de futebol valido.
 */
function validateAddSoccerTeamInput(
  input: Partial<AddSoccerTeamInput>,
): SoccerTeam {
  const {name, foundationYear} = input;

  if (!name || typeof name !== "string") {
    throw new Error("Field 'name' is required and must be a string.");
  }

  if (foundationYear === undefined || typeof foundationYear !== "number") {
    throw new Error("Field 'foundationYear' is required and must be a number.");
  }

  const normalizedName = name.trim();

  if (!normalizedName) {
    throw new Error("Field 'name' cannot be empty.");
  }

  if (!Number.isInteger(foundationYear)) {
    throw new Error("Field 'foundationYear' must be an integer.");
  }

  return {
    name: normalizedName,
    foundationYear,
  };
}

/**
 * Lógica para adicionar um time de futebol ao Firestore.
 * Essa função será usada tando pela função HTTP quanto
 * por uma função callable, garantindo que a validação
 * e a criação do documento sejam consistentes.
 * @param {Partial<AddSoccerTeamInput>} input Soccer
 * team input.
 * @return {Promise<AddSoccerTeamResult>} Created document data.
 */
async function addSoccerTeamCore(
  input: Partial<AddSoccerTeamInput>,
): Promise<AddSoccerTeamResult> {
  const team = validateAddSoccerTeamInput(input);

  const docRef = await db.collection("soccerTeams").add(team);

  return {
    id: docRef.id,
    team,
  };
}

/**
 * Function para adicionar um novo time de futebol à coleção soccerTeams.
 * A função é acionada por uma requisição HTTP POST. Exemplo:
 * curl -X POST https://url-projeto/addSoccerTeam \
    -H "Content-Type: application/json" \
    -d '{
    "name":"Time de Testes 1",
    "foundationYear":2006
 */
export const addSoccerTeam = onRequest(
  {region: "southamerica-east1"},
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        res.status(405).json({
          success: false,
          message: "Method not allowed. Use POST.",
        });
        return;
      }

      const result = await addSoccerTeamCore(
        req.body as Partial<AddSoccerTeamInput>
      );

      res.status(201).json({
        success: true,
        message: "Soccer team created successfully.",
        id: result.id,
        team: result.team,
      });
    } catch (error) {
      console.error("Error adding soccer team via HTTP:", error);

      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Invalid request.",
      });
    }
  },
);

/**
 * Firebase Function callable para adicionar
 * um novo time de futebol.
 * Essa função pode ser chamada diretamente de um
 * cliente usando o SDK do Firebase ou, até mesmo em um
 * app Flutter.
 */
export const addSoccerTeamCallable = onCall(
  {region: "southamerica-east1"},
  async (request) => {
    try {
      const result = await addSoccerTeamCore(
        request.data as Partial<AddSoccerTeamInput>,
      );

      return {
        success: true,
        message: "Soccer team created successfully.",
        id: result.id,
        team: result.team,
      };
    } catch (error) {
      console.error("Error adding soccer team via callable:", error);

      throw new HttpsError(
        "invalid-argument",
        error instanceof Error ? error.message : "Invalid request.",
      );
    }
  },
);
