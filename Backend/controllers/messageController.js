const pool = require("../config/db");
exports.sendMessage = async(req,res)=>{
   try{
    const senderId = req.user.id;
    const { recieverId,message } = req.body;
    if(!recieverId || !message){
        return res.status(400).json({
            success:false,
            message:"Reciever and message are required"
        });
    }
    const reciever = await pool.query(
        `SELECT id
        FROM users 
        WHERE id = $1`,[recieverId]
    );
    if(reciever.rows.length === 0){
        return res.status(404).json({
            success:false,
            message:"Server Error"
        });
    }
     const newMessage = await pool.query(
            `INSERT INTO messages
            (sender_id, reciever_id, message)
            VALUES ($1,$2,$3)
            RETURNING *`,
            [senderId, recieverId, message]
        );
        const io = req.app.get("io");
        io.to(recieverId.toString()).emit(
            "receive-message",
            newMessage.rows[0]
        );
        io.to(senderId.toString()).emit(
            "receive-message",
            newMessage.rows[0]
        );
        res.status(201).json({
            success: true,
            message: "Message Sent Successfully",
            data: newMessage.rows[0]
        });
   }catch(error){
    console.log(error);
    res.status(500).json({success:false,message:"Server Error"});
   }
};
exports.getConversations = async (req, res) => {
    try {
        const userId = req.user.id;
        const conversations = await pool.query(
            `
            SELECT DISTINCT ON(users.id)
            users.id,users.full_name,users.email,messages.message AS last_message,messages.created_at
            FROM messages
            JOIN users
            ON users.id=
            CASE
            WHEN messages.sender_id=$1
            THEN messages.reciever_id
            ELSE messages.sender_id
            END
            WHERE
            messages.sender_id=$1
            OR messages.reciever_id=$1
            ORDER BY
            users.id,messages.created_at DESC;
            `,
            [userId]
        );
        res.json({
            success: true,
            conversations: conversations.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
exports.getMessages = async (req, res) => {
    try {
        const currentUser = req.user.id;
        const { userId } = req.params;
        const messages = await pool.query(
            `
            SELECT*FROM messages
            WHERE
            (
                sender_id = $1
                AND reciever_id = $2
            )
            OR
            (
                sender_id = $2
                AND reciever_id = $1
            )
            ORDER BY created_at ASC
            `,
            [currentUser, userId]
        );
        res.json({
            success: true,
            messages: messages.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
exports.deleteMessage = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const messageResult = await pool.query(
            `SELECT *
             FROM messages
             WHERE id = $1`,
            [id]
        );
        if (messageResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }
        if (messageResult.rows[0].sender_id !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }
        await pool.query(
            `DELETE FROM messages
             WHERE id = $1`,
            [id]
        );
        const io = req.app.get("io");
        io.to(messageResult.rows[0].sender_id.toString()).emit(
            "message-deleted",
            id
        );
        io.to(messageResult.rows[0].reciever_id.toString()).emit(
            "message-deleted",
            id
        );
        res.json({
            success: true,
            message: "Message Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
exports.editMessage = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { message } = req.body;
        const oldMessage = await pool.query(
            `SELECT *
            FROM messages
            WHERE id=$1`,
            [id]
        );
        if (oldMessage.rows.length === 0) {
            return res.status(404).json({
                success:false,
                message:"Message not found"
            });
        }
        if(oldMessage.rows[0].sender_id!==userId){
            return res.status(403).json({
                success:false,
                message:"Unauthorized"
            });
        }
        const updated = await pool.query(
            `
            UPDATE messages
            SET
            message=$1,
            edited=true
            WHERE id=$2
            RETURNING *
            `,
            [message,id]
        );
        const io=req.app.get("io");
        io.to(updated.rows[0].sender_id.toString()).emit(
            "message-edited",
            updated.rows[0]
        );
        io.to(updated.rows[0].reciever_id.toString()).emit(
            "message-edited",
            updated.rows[0]
        );
        res.json({
            success:true,
            data:updated.rows[0]
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};