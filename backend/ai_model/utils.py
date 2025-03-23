import os
import time
import smtplib
import sqlite3
from typing import List
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def get_remaining_resumes() -> list:
    with sqlite3.connect("local_db.db") as sql_db:
        cursor = sql_db.cursor()
        cursor.execute("SELECT * FROM resume_check WHERE checked = 0")
        data = cursor.fetchall()
        return data

def get_user(email_id: str) -> str:
    with sqlite3.connect("local_db.db") as sql_db:
        cursor = sql_db.cursor()
        cursor.execute("SELECT * FROM users WHERE email_id = ?", (email_id,))
        data = cursor.fetchone()
        if data is not None:
            return data
    return None

def update_resume_check(email_id: str, checked: int) -> None:
    with sqlite3.connect("local_db.db") as sql_db:
        cursor = sql_db.cursor()
        cursor.execute("UPDATE resume_check SET checked = ? WHERE email_id = ?", (checked, email_id))
        sql_db.commit()

def send_email(
    email_ids: List[str],
    subject: str,
    html_body: str,
    mailing_list: bool = False,
    unsubscribe_url: str = "",
) -> None:
    """
    sends mail to those email_ids
    """
    with smtplib.SMTP(
        os.getenv("MAIL_SERVER", "smtp.gmail.com"), int(os.getenv("MAIL_PORT", 587))
    ) as mail_server:
        mail_server.starttls()
        mail_server.login(os.getenv("MAIL_USER", ""), os.getenv("MAIL_PASS", ""))
        for email_id in email_ids:
            # Don't send email if it is a test mail
            if email_id.startswith("test-"):
                continue
            msg = MIMEMultipart()
            msg["From"] = os.getenv("MAIL_USER", "")
            msg["To"] = email_id
            msg["Subject"] = subject
            if mailing_list:
                msg.add_header("List-Unsubscribe", unsubscribe_url)
            msg.attach(MIMEText(html_body, "html"))
            mail_server.sendmail(os.getenv("MAIL_USER", ""), email_id, msg.as_string())
            time.sleep(2)

def get_job_details(job_id):
    with sqlite3.connect("local_db.db") as sql_db:
        cursor = sql_db.cursor()

        cursor.execute("SELECT * FROM jobs WHERE id = ?", (job_id,))
        job_data = cursor.fetchone()

    if not job_data:
        return "Job not found"

    job_details = {
        "id":int(job_data[0]),
            "title":job_data[1],
            "company":job_data[2],
            "location":job_data[3],
            "description":job_data[4],
            "skills_required":job_data[5].split(","),
            "on_going":bool(job_data[6]),
            "posted_at":job_data[7]
    }

    return job_details