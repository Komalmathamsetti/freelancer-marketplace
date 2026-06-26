const pool = require("../config/db");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const { full_name, email, password, role, phone } = req.body;

    // Validation
    if (!full_name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check existing email
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const newUser = await pool.query(
      `INSERT INTO users
      (full_name,email,password,role,phone)
      VALUES($1,$2,$3,$4,$5)
      RETURNING id,full_name,email,role,phone,created_at`,
      [
        full_name,
        email,
        hashedPassword,
        role,
        phone
      ]
    );

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: newUser.rows[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};