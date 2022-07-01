import "dotenv/config";
import pkg from "pg";

// funktiot 2p tehtävä

async function paivita_toimipaikka(client) {
  const res = await client.query("UPDATE astia SET toimipaikka_id = 1;");
}

async function paivita_lasit(client) {
  const res = await client.query(
    "UPDATE astia SET lkm = 100 WHERE nimi ='lasi';"
  );
  res.rows.forEach((astia) => console.log(astia));
}

async function lisaa_mukit(client) {
  const res = await client.query(
    "INSERT INTO astia (nimi, lkm, toimipaikka_id) VALUES ('muki', 100, 2), ('muki', 100, 3);"
  );
}

async function poista_pienetLautaset(client) {
  const res = await client.query(
    "DELETE FROM astia WHERE nimi = 'pieni lautanen' AND toimipaikka_id = 1;"
  );
}

async function tulosta_halutut(client) {
  const res = await client.query(
    "SELECT astia.nimi, lkm, toimipaikka.sijainti FROM astia, toimipaikka WHERE toimipaikka_id = toimipaikka.id;"
  );
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

  await paivita_toimipaikka(client);
  await paivita_lasit(client);
  await lisaa_mukit(client);
  await poista_pienetLautaset(client);
  await tulosta_halutut(client);

  await client.end();
}
export default connectDB;
