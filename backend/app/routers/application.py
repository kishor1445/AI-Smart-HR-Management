import os
from typing import List
import sqlite3
import secrets
import aiofiles
from jose import jwt
from fastapi import APIRouter, File, UploadFile, Depends, HTTPException, Form
from fastapi.security import OAuth2PasswordRequestForm
from app.oauth2 import get_user, create_access_token
from app import schema
from app.utilities import user_exists, hash_password, verify_password


router = APIRouter(prefix="/application")

@router.post("/register")
async def register_user(data: schema.RegisterUser):
    if user_exists(data.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = hash_password(data.password)
    try:
        with sqlite3.connect("local_db.db") as sql_db:
            cursor = sql_db.cursor()
            cursor.execute("""
                INSERT INTO users (email_id, password_hash, name)
                VALUES (?, ?, ?)
            """, (data.email, hashed_password, data.name))
            sql_db.commit()
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(data: OAuth2PasswordRequestForm = Depends()):
    db_data = user_exists(data.username)
    if db_data is None:
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    stored_password = db_data[2]
    if not verify_password(data.password, stored_password):
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    
    access_token = create_access_token(
        {"email_id": data.username, "account_type": "user"}
    )
    return {"access_token": access_token}

@router.post("/job_apply")
async def job_apply(resume: UploadFile = File(...),
    name: str = Form(...),
    mobile: int = Form(...),
    email_id: str = Form(...),
    gender: schema.Gender = Form(...),
    job_id: str = Form(...),
    user_email_id = Depends(get_user)) -> str:
    random_filename = f"{secrets.token_urlsafe(10)}"

    with sqlite3.connect("local_db.db") as sql_db:
        cursor = sql_db.cursor()

        cursor.execute("SELECT * FROM resume_check WHERE email_id = ?", (user_email_id,))
        existing_entry = cursor.fetchone()
        if existing_entry:
            old_filename = existing_entry[1]
            old_file_path = f"resumes/{old_filename}.pdf"
            if os.path.exists(old_file_path):
                os.remove(old_file_path)

            cursor.execute("""
                UPDATE resume_check
                SET resume_file_name = ?, checked = ?
                WHERE email_id = ?
            """, (random_filename, False, user_email_id))
        else:
            cursor.execute("""INSERT INTO resume_check VALUES
                           (?, ?, ?, ?)""", (user_email_id, random_filename, False, job_id))
        sql_db.commit()

        cursor.execute("""
            INSERT INTO job_applied (email_id, job_id, resume_filename, name, contact_number, gender)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (user_email_id, job_id, random_filename, name, mobile, gender.value))
        sql_db.commit()

    async with aiofiles.open(f"resumes/{random_filename}.pdf", "wb") as resume_file:
        await resume_file.write(await resume.read())

    return random_filename

@router.get("/jobs", response_model=List[schema.Job])
async def jobs():
    with sqlite3.connect("local_db.db") as sql_db:
        cursor = sql_db.cursor()

        cursor.execute("SELECT * FROM jobs")
        jobs_data = cursor.fetchall()

    if not jobs_data:
        raise HTTPException(status_code=404, detail="No jobs found")

    jobs_list = [
        schema.Job(
            id=int(job[0]),
            title=job[1],
            company=job[2],
            location=job[3],
            description=job[4],
            skills_required=job[5].split(","),
            on_going=bool(job[6]),
            posted_at=job[7]
        )
        for job in jobs_data
    ]

    return jobs_list

