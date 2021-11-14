import { Fetcher } from "swr";
import axios from "axios";

declare let returnCitySN: { cip: string; cid: string; cname: string };

const client = axios.create({});

const randomId = () => {
  const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnm".split(
    ""
  );
  let id = "";
  for (let i = 0; i < 7; i++) {
    const pos = Math.floor(Math.random() * charSet.length);
    id += charSet[pos];
  }
  return id;
};

client.interceptors.request.use((req) => {
  req.data = Object.assign({}, req.data, {
    Environment: { IP: returnCitySN.cip, DeviceID: randomId() },
  });
  return req;
});

export default client;
