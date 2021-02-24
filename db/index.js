import PouchDB from "pouchdb";
import MemoryAdapter from "pouchdb-adapter-memory";

PouchDB.plugin(MemoryAdapter);

export const orders = new PouchDB("orders", { adapter: "memory" });
export const goods = new PouchDB("goods", { adapter: "memory" });

goods.bulkDocs([
  { _id: "001", title: "Basic", amount: 100, currency: "GBP" },
  { _id: "002", title: "Challange 1", amount: 500, currency: "GBP" },
  { _id: "003", title: "Challange 2", amount: 1000, currency: "GBP" },
  { _id: "004", title: "Challange 3", amount: 10000, currency: "GBP" },
  { _id: "005", title: "Stop the live", amount: 100000, currency: "GBP" }
]);
