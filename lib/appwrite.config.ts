import * as sdk from 'node-appwrite'

export const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,PATIENT_COLLECTION_ID,DOCTOR_COLLECTION_ID,APPOINTMENT_COLLECTION_ID,NEXT_PUBLIC_BUCKET_ID:BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT:ENDPOINT
}=process.env;
// const sdk = require('node-appwrite');

const client=new sdk.Client();
// const PROJECT_ID=process.env.NEXT_PUBLIC_PROJECT_ID;
// const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
// const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID;
// const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

console.log("Endpoint",ENDPOINT)
console.log("Bucket ID",BUCKET_ID)
console.log("Api key",API_KEY);
console.log("Project id is ",PROJECT_ID);

client
.setEndpoint(ENDPOINT!)
.setProject(PROJECT_ID!)
.setKey(API_KEY!)





export const databases=new sdk.Databases(client);
export const storage=new sdk.Storage(client);
export const messaging=new sdk.Messaging(client);
export const users=new sdk.Users(client);
