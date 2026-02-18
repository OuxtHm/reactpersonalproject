import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
app.use(express.json());

app.listen(3355, () => {
    console.log("Server is running on port 3355");
});

async function getConnection() {
    return await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'compose_menus'
    });
}

app.get("/board/list_node/:page", async (req, res) => {
    let conn;
    const pageParam = parseInt(req.params.page);

    const page = (pageParam === 0 || isNaN(pageParam)) ? 1 : pageParam;

    const rowSize = 10;
    const start = (page - 1) * rowSize;

    try {
        conn = await getConnection();

        const listSql = `
            SELECT no, name, subject,
                   DATE_FORMAT(regdate, '%Y-%m-%d') as dbday,
                   hit 
            FROM board_2 
            ORDER BY no DESC 
            LIMIT ${start}, 10
        `;

        const totalSql = `
            SELECT CEIL(COUNT(*) / 10) AS totalpage 
            FROM board_2
        `;

        const [rows]: any = await conn.execute(listSql);
        const [total]: any = await conn.execute(totalSql);

        const totalpage = total[0].totalpage;

        console.log("DB 데이터 확인:", rows);

        res.json({
            curpage: page,
            totalpage: totalpage,
            list: rows
        });
    } catch (err) {
        console.error("DB 에러 발생:", err);
        res.status(500).json({error: "Internal Server Error"});
    } finally {
        if (conn) {
            await conn.end();
        }
    }
});

// =======================
// 등록
// =======================
app.post("/board/insert_node", async (req, res) => {
    let conn
    const {name, subject, content, pwd} = req.body;
    try {
        conn = await getConnection();

        const sql = `
            INSERT INTO board_2(name, subject, content, pwd)
            VALUES (?, ?, ?, ?)
        `;

        await conn.execute(sql, [name, subject, content, pwd]);

        res.json({msg: 'yes'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'no'});
    } finally {
        if (conn) await conn.end();
    }
})

// =======================
// 상세보기
// =======================
app.get("/board/detail_node/", async (req, res) => {
    let conn
    const no = req.query.no || 1;
    try {
        conn = await getConnection();

        const sql1 = `UPDATE board_2 SET hit = hit + 1 WHERE no = ${no}`;
        await conn.execute(sql1);

        const sql =`
            SELECT no, subject, content, name, hit,
                   DATE_FORMAT(regdate, '%Y-%m-%d') as dbday
            FROM board_2
            WHERE no= ${no}
        `;
        const [rows]: any = await conn.execute(sql);

        res.json(rows[0]);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) await conn.end();
    }
})

// =======================
// 수정 데이터
// =======================
app.get("/board/update_node", async (req, res) => {
    let conn
    const no = Number(req.query.no)
    try {
        conn = await getConnection();

        const sql = `
            SELECT no, name, subject, content
            FROM board_2
            WHERE no = ${no}
        `;

        const [rows]: any = await conn.execute(sql);

        res.json(rows[0]);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) await conn.end();
    }
})

// =======================
// 수정
// =======================
app.put("/board/update_ok_node", async (req, res) => {
    let conn
    const {no, name, subject, content, pwd} = req.body;
    try {
        conn = await getConnection();

        const checkSql = `
            SELECT COUNT(*) as res
            FROM board_2
            WHERE no = ${no} AND pwd='${pwd}'
        `;

        const [check]: any = await conn.execute(checkSql);

        let count = check[0].res;

        if(count === 0)
        {
            console.log("비밀번호가 틀립니다:" + count)
            res.json({msg:'no'})
            return;
        }

        const updateSql = `
            UPDATE board_2
            SET name    = '${name}',
                subject = '${subject}',
                content = '${content}'
            WHERE no = ${no}
        `;

        await conn.execute(updateSql);

        res.json({msg: 'yes'})
    } catch (error){
        console.log(error);
    } finally {
        if (conn) await conn.end();
    }
})

// =======================
// 삭제
// =======================
app.delete("/board/delete_node/:no/:pwd", async (req, res) => {
    const no = req.params.no
    const pwd = req.params.pwd

    let conn

    try {
        conn = await getConnection();

        const checkSql = `
            SELECT COUNT(*) as res
            FROM board_2
            WHERE no = ${no} AND pwd='${pwd}'
        `;

        const [check]: any = await conn.execute(checkSql);

        let count = check[0].res;

        if(count === 0)
        {
            res.json({msg:'no'})
            return
        }

        const deleteSql = `DELETE FROM board_2 WHERE no = ${no}`;

        await conn.execute(deleteSql);

        res.json({msg: 'yes'})
    } catch (err){
        console.log(err);
    } finally {
        if (conn) await conn.end();
    }
})
