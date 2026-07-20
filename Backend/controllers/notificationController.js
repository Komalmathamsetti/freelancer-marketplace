const pool = require("../config/db");
// Get all notifications
exports.getNotifications = async (req, res) => {
    try {

        const result = await pool.query(
            `
            SELECT *
            FROM notifications
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,
            [req.user.id]
        );

        res.json({
            success: true,
            notifications: result.rows,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch notifications",
        });

    }
};
// Mark one notification as read
exports.markAsRead = async (req, res) => {
    try {

        await pool.query(
            `
            UPDATE notifications
            SET is_read = TRUE
            WHERE id = $1
            AND user_id = $2
            `,
            [req.params.id, req.user.id]
        );

        res.json({
            success: true,
            message: "Notification marked as read",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to update notification",
        });

    }
};
// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
    try {

        await pool.query(
            `
            UPDATE notifications
            SET is_read = TRUE
            WHERE user_id = $1
            `,
            [req.user.id]
        );

        res.json({
            success: true,
            message: "All notifications marked as read",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to update notifications",
        });

    }
};
// Delete notification
exports.deleteNotification = async (req, res) => {
    try {

        await pool.query(
            `
            DELETE FROM notifications
            WHERE id = $1
            AND user_id = $2
            `,
            [req.params.id, req.user.id]
        );

        res.json({
            success: true,
            message: "Notification deleted",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to delete notification",
        });

    }
};