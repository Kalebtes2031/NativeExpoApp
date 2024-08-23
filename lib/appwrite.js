import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.Kabth.Gallery",
  projectId: "66c6c850003e2568b995",
  databaseId: "66c6cc3c002cba359d1e",
  userCollectionId: "66c6cca1003d9a18f697",
  videoCollectionId: "66c6cd2600324d0988d2",
  storageId: "66c6d3100031a866a9a5",
};
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("User Creation failed");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accounts: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(
      error.message || "An error occurred while creating the user"
    );
  }
}
export async function signIn(email, password) {
  try {
    // Check if a session is already active
    const currentSession = await account.getSession("current");

    // If there is an active session, return it instead of creating a new one
    if (currentSession) {
      console.log("Session already active:", currentSession);
      return currentSession;
    }
  } catch (error) {
    if (error.code !== 404) {
      // If the error is not a "session not found" error, rethrow it
      throw new Error(error.message || "An error occurred during sign-in");
    }
    // If no session is found, proceed to create a new session
  }

  // Use the correct method to create an email/password session
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message || "An error occurred during sign-in");
  }
}
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accounts", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
