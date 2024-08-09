import pkg from 'pkg';
import dotenv from 'dotenv'
const {Pool} = pkg;


dotenv.config()




const pool = new Pool({
    user: process.env.DB_USER,
    password:process.env.punkin25,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_DATABASE

})
pool.query('SELECT NOW()',(err,res) => {
    if (err) {
        console.log('Error connecting to the database', err.stack)
    }else{
        console.log('Connected to the database', res.rows[0])
    };
});

export default pool