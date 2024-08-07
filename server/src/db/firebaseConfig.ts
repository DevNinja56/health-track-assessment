import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { config } from "dotenv";

// Initialize dotenv to read .env file
config();

// Initialize Firebase Admin
const databaseURL = process.env.DATE_BASE_URL;
const storageBucket = process.env.STORAGE_BUCKET;
const type = process.env.SERVICE_ACCOUNT_TYPE;
const project_id = process.env.SERVICE_ACCOUNT_PROJECT_ID;
const private_key_id = process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID;
const private_key = process.env.SERVICE_ACCOUNT_PRIVATE_KEY;
const client_email = process.env.SERVICE_ACCOUNT_CLIENT_EMAIL;
const client_id = process.env.SERVICE_ACCOUNT_CLIENT_ID;
const auth_uri = process.env.SERVICE_ACCOUNT_AUTH_URI;
const token_uri = process.env.SERVICE_ACCOUNT_TOKEN_URI;
const auth_provider_x509_cert_url =
  process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL;
const client_x509_cert_url = process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL;
const universe_domain = process.env.SERVICE_ACCOUNT_UNIVERSE_DOMAIN;

console.log(
  databaseURL,
  storageBucket,
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
  universe_domain
);

// Firebase service account configuration
const serviceAccount = {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
  universe_domain,
};

// Initialize Firebase Admin with service account and database URL
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL,
  storageBucket,
});

const db = admin.firestore();
const storage = admin.storage();
const auth = getAuth();

export { db, storage, auth };
