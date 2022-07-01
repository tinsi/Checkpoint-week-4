import "dotenv/config";
import pkg from "pg";

// funktiot

async function lisaa_astiat(client) {
  const res = await client.query(
    "INSERT INTO astia (nimi, lkm) VALUES ('muki', 100), ('lasi', 80), ('iso lautanen', 40), ('pieni lautanen', 40);"
  );
  res.rows.forEach((astia) => console.log(astia));
}

async function tulosta_astiat(client) {
  const res = await client.query("SELECT nimi, lkm FROM astia;");
  console.table(res.rows);
}

// Postgresiin yhdistäminen ja haluttujen funktioiden suorittaminen

const { Client } = pkg;

await connectDB();

async function connectDB() {
  const client = new Client({
    connectionString: process.env.DB_CONNECTIONSTRING,
  });
  await client.connect();

  await lisaa_astiat(client);
  await tulosta_astiat(client);

  await client.end();
}
export default connectDB;
