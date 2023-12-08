import { sql } from '@vercel/postgres';

export async function incrementHits(slugName){
    return sql`
    UPDATE hits SET (hits) = ROW((SELECT hits FROM hits WHERE slug = ${slugName}) + 1) WHERE slug = ${slugName};
    `
}