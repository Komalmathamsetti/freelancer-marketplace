const pool = require("../config/db");
exports.createNotification = async ({
    io,
    userId,
    title,
    message,
    type,
    relatedId = null,
}) => {
    try {
        const result = await pool.query(
            `
            INSERT INTO notifications
            (user_id, title, message, type, related_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `,
            [
                userId,
                title,
                message,
                type,
                relatedId,
            ]
        );
        const notification = result.rows[0];
        io.to(userId.toString()).emit(
            "new-notification",
            notification
        );
        return notification;
    } catch (error) {
        console.error(
            "Notification Error:",
            error.message
        );
    }
};