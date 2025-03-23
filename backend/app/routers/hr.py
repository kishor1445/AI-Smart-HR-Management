import sqlite3
from fastapi import APIRouter, HTTPException
from app import schema

router = APIRouter(prefix="/hr")

@router.get("/candidates")
async def candidates():
    ...

@router.post("/select")
async def select_candidate():
    ...

@router.post("/job")
async def post_jobs(data: schema.JobPost):
    with sqlite3.connect("local_db.db") as sql_db:
        cursor = sql_db.cursor()

        cursor.execute("SELECT * FROM jobs WHERE title = ? AND company = ?", (data.title, data.company))
        existing_job = cursor.fetchone()
        if existing_job:
            raise HTTPException(status_code=400, detail="Job already posted")
        print("Skills Required:", data.skills_required)
        skills_required = ",".join(data.skills_required)
        cursor.execute("""
        INSERT INTO jobs (title, company, location, description, skills_required)
        VALUES (?, ?, ?, ?, ?)
    """, (data.title, data.company, data.location, data.description, skills_required))
        sql_db.commit()
        cursor.execute("SELECT * FROM jobs WHERE title = ? AND company = ?", (data.title, data.company))
        new_job = cursor.fetchone()

        return {
            "id": new_job[0],
            "title": new_job[1],
            "company": new_job[2],
            "location": new_job[3],
            "description": new_job[4],
            "skills_required": new_job[5].split(","),
            "posted_at": new_job[6]
        }
