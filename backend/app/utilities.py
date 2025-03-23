import sqlite3
import bcrypt

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def user_exists(email: str):
    with sqlite3.connect("local_db.db") as sql_db:
        cursor = sql_db.cursor()
        cursor.execute("SELECT * FROM users WHERE email_id = ?", (email,))
        data = cursor.fetchone()
        if data is not None:
            return data
    return None
