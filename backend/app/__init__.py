from dotenv import load_dotenv
import sqlite3


load_dotenv()

db = sqlite3.connect("local_db.db")
db.execute("""
CREATE TABLE IF NOT EXISTS resume_check(
    email_id CHAR(120) PRIMARY KEY,
    resume_file_name CHAR(20),
    checked INT,
    job_id CHAR(120)
);
""")

db.execute("""
CREATE TABLE IF NOT EXISTS users(
    email_id CHAR(120) PRIMARY KEY,
    name CHAR(120),
    password_hash CHAR(400),
    verified INT
);
""")

db.execute("""
CREATE TABLE IF NOT EXISTS jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title CHAR(120),
    company CHAR(120),
    location CHAR(120),
    description TEXT,
    skills_required TEXT,
    on_going INT DEFAULT 1,
    posted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
""")

db.execute("""
CREATE TABLE IF NOT EXISTS job_applied (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email_id TEXT NOT NULL,
    job_id INTEGER NOT NULL,
    resume_filename TEXT NOT NULL,
    name TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    gender TEXT NOT NULL,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);
""")

db.commit()