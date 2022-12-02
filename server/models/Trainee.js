const oracledb = require('oracledb');

let Trainee = {};
let connection;

Trainee.addTrainee = async ({ SSN, Fname, Lname, address, phone , DoB, photo, company_ID }) => {
    try {
        connection = await oracledb.getConnection();
        const a=await connection.execute(`ALTER SESSION SET NLS_DATE_FORMAT = 'DD/MM/YYYY'`);
        const person = await connection.execute(
            `INSERT INTO Person VALUES
            (:SSN, :Fname, :Lname, :phone, :address)`,
            [SSN , Fname , Lname , phone, address]
        );
        const trainee = await connection.execute(
            `INSERT INTO Trainee VALUES
            (:SSN, :DoB, :photo, :company_ID)`,
            [SSN , DoB , photo , company_ID]
        );
        const res = {person:person.rows , trainee:trainee.rows};
        return res;
    } catch (error) {
        throw error
    }
    finally{
        if (connection) {
            try {
                await connection.close();  // always release the connection back to the pool
            } catch (err) {
                console.error(err);
            }
        }
    }
};

Trainee.getTrainees = async ({name}) => {
    try {
        connection = await oracledb.getConnection();
        let searchString = 
        `SELECT Trainee.SSN , Fname , Lname , address, phone
        FROM Person
        INNER JOIN Trainee
        ON Person.SSN = Trainee.SSN
        `
        if ( name.length=== 1){
            searchString = searchString +
            ` WHERE LOWER(Person.Fname) LIKE LOWER('%${name[0]}%') OR LOWER(Person.Lname) LIKE LOWER('%${name[0]}%')`
        }
        if ( name.length=== 2){
            searchString = searchString +
            ` WHERE (LOWER(Person.Fname) LIKE LOWER('%${name[0]}%') AND LOWER(Person.Lname) LIKE LOWER('%${name[1]}%'))
            OR (LOWER(Person.Fname) LIKE LOWER('%${name[1]}%') AND LOWER(Person.Lname) LIKE LOWER('%${name[0]}%'))`
        }
        searchString = searchString + ` ORDER BY SSN ASC`
        const trainees = await connection.execute(searchString);
        return trainees.rows
    } catch (error) {
        throw error
    }
    finally{
        if (connection) {
            try {
                await connection.close();  // always release the connection back to the pool
            } catch (err) {
                console.error(err);
            }
        }
    }
};


Trainee.getSingleTrainee = async (id) => {
    try {
        //console.log(id);
        connection = await oracledb.getConnection();
        const trainee = await connection.execute(`SELECT * FROM TRAINEE WHERE SSN = ${id}`);
     
        if (trainee.rowsAffected == 0){
            return {msg:`No trainee with this id : ${id}`}
        }
        const person = await connection.execute(`SELECT * FROM PERSON WHERE SSN = ${id}`);

        const seasonTrainee = await connection.execute(`SELECT * FROM SeasonTrainee WHERE SSN_TRAINEE = ${id} ORDER BY syear ASC`); //

        const sstrn = await Promise.all(seasonTrainee.rows.map( async (row) => {
            let achievement = await connection.execute(`SELECT * FROM TABLE( SUM_VOTE('${row.SYEAR}', '${id}') )`)
            achi = await Promise.all( 
                achievement.rows.map( async ( epRes ) => {
                    let r = await (connection.execute(
                        `SELECT * FROM(SELECT rownum as RANK, w.* FROM TABLE( winnersThisEpisode('${row.SYEAR}' , '${epRes.EP_NO}')) w) 
                        WHERE ssn='${id}'`))
                    return {...epRes , RANK: r.rows[0].RANK}
                }
            ) )
            console.log(achi);
            return {...row , ACHIEVEMENT: achi} ;
        }));
        return {person: person.rows , trainee: trainee.rows , seasonTrainee: sstrn}
    } catch (error) {
        throw error
    }
    finally{
        if (connection) {
            try {
                await connection.close();  // always release the connection back to the pool
            } catch (err) {
                console.error(err);
            }
        }
    }
};

Trainee.getAchievement = async (id, {year}) =>{
    try {
        connection = await oracledb.getConnection();
        let achievement = await connection.execute(`SELECT * FROM TABLE ( SUM_VOTE(${year}, ${id}) )`)
        console.log(achievement)
        if(achievement.rows.length===0){
            return {msg:"Trainee doesn't join this year"}
        }
        return achievement.rows;
    } catch (error) {
        throw error
    }
    finally{
        if (connection) {
            try {
                await connection.close();  // always release the connection back to the pool
            } catch (err) {
                console.error(err);
            }
        }
    }
}
module.exports = Trainee;