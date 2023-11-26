const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  slugs,
  counter
} = require('./data.js');

async function seedHits(client) {
    try {
        //create the "hits" table if it doesnt exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS hits (
        slug varchar(100) NOT NULL UNIQUE,
        hits int
        );
        `;

    console.log(`Created "hits" table`);

    //Insert data into the "hits" table
    //TODO: Everything below this line needs to be fixed

    const insertedData = await client.sql`
        INSERT INTO hits (slug, hits)
        VALUES (${slugs[0].slug}, ${counter[0].hits})
        ON CONFLICT (slug) DO NOTHING;
        `;
  
      console.log(`Seeded initial hit`);
  
    return {
        createTable,
        hits: insertedData,
    };

      //UPDATE hits SET hits = (SELECT hits FROM hits WHERE slug = ${slug}) + 1 WHERE slug = ${slug};

    //Remove when done
    } catch (error) {
      console.error('Error seeding slug:', error);
      throw error;
    }
  }

async function main() {
  const client = await db.connect();

  await seedHits(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
