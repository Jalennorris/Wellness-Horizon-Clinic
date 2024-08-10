import pkg from 'pkg';
import dotenv from 'dotenv'
const {Pool} = pkg;


dotenv.config()

const requiredEnvVars = ['DB_USER',  'DB_PASSWORD','DB_HOST','DB_PORT', 'DB_DATABASE']
requiredEnvVars.forEach((envVar) =>{
if(!process.env[envVar]){
    console.error(`Missing environment variable:${envVar}`)
    process.exit(1);
}
}
)


const pool = new Pool({
    user: process.env.DB_USER,
    password:process.env.punkin25,
    host:process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT, 10),
    database:process.env.DB_DATABASE

})

const testConnection = async () =>{
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connected to the database:', res.rows[0])     
    } catch (error) {
        console.error('Error connecting to the database:',error)
        process.exit(1)
        
    }

}
//Initialize connection test

testConnection();

export default pool