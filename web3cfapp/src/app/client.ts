import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID

console.log('All env vars:', process.env);
console.log('Client ID:', process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID);
console.log('Type of Client ID:', typeof process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID);

console.log('Raw env var:', process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID);
console.log('All NEXT_PUBLIC vars:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC')));

//const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const clientId = "707ef8f9539865ab53810c6cd0b27a01"

console.log('Final clientId:', clientId);
console.log('ClientId type:', typeof clientId);
//const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID 

//console.log('Client ID:', process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID);

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});
