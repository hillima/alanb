import { JsonRpc, Api, JsSignatureProvider } from "@proton/js";
import fetch from 'node-fetch';

const rpc = new JsonRpc(process.env.NEXT_PUBLIC_CHAIN_ENDPOINTS.split(', '));
const api = new Api({
  rpc,
  signatureProvider: new JsSignatureProvider([process.env.API_PROTECT_KEY]),
});

module.exports = {
  rpc,
  api,
  transact: (actions) =>
    api.transact(
      { actions },
      {
        blocksBehind: 300,
        expireSeconds: 3000,
      }
    ),
  fetch,
};