from datetime import datetime
from typing import Annotated, List
from enum import Enum
from pydantic import BaseModel
from pydantic import BeforeValidator, BaseModel, EmailStr, Field
from typing import Optional

PyObjectId = Annotated[str, BeforeValidator(str)]

class Gender(Enum):
    MALE = "male"
    FEMALE = "female"
    OTHERS = "others"

class UserApply(BaseModel):
    name: str
    mobile: int
    email_id: str
    gender: Gender
    job_id: str

class RegisterUser(BaseModel):
    email: EmailStr
    password: str
    name: str

class JobPost(BaseModel):
    title: str
    company: str
    location: str
    description: str
    skills_required: List[str]

    class Config:
        from_attributes = True

class Job(BaseModel):
    id: int
    title: str
    description: str
    location: str
    skills_required: List[str]
    company: str
    on_going: Optional[bool] = True
    posted_at: str

