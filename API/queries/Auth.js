let sign_up = `INSERT INTO users(name,email,password_hash,role_id) VALUES(?,?,?,2)`;

let verifyDetails = `SELECT  
u.id,
u.name,
u.password_hash as password,
u.email,
r.role
FROM users u
INNER JOIN role AS r on u.role_id = r.id
WHERE u.email = ?`;

let verifyForgotDetails = `SELECT  
u.id,
u.name,
u.email,
u.password,
mr.role_name 
FROM users u
INNER JOIN master_roles mr ON u.role_id = mr.id
WHERE u.email = <<email>>`;

let change_password = `UPDATE users SET password = <<password>> WHERE email = <<email>>`;

let getAllUsers = `SELECT id, name, email FROM users where role_id = 2`;

module.exports = {
    sign_up,
    verifyDetails,
    change_password,
    verifyForgotDetails,
    getAllUsers
}