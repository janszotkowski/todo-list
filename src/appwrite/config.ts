import { Client, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.PUBLIC_ENDPOINT)
    .setProject(import.meta.env.PUBLIC_PROJECT_ID);

const databases = new Databases(client);

export { client, databases };