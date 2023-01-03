const { MongoClient, ServerApiVersion } = require("mongodb");

class DbConnection {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
  }

  async connect() {
    try {
      this.connection = await this.client.connect();
      console.log("Connected to DB");
      this.db = this.connection.db(process.env.DB_NAME);
      console.log(`Using ${this.db.namespace} database`);
      this.collection = this.db.collection("products");
    } catch (e) {
      console.log("Couldnt't connect to db");
      console.log(e);
    }
  }

  getCollection() {
    return this.collection;
  }
}

module.exports = { DbConnection };
