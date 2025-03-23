import ast
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.document_loaders import PyPDFLoader
from langchain_ollama import OllamaEmbeddings
from utils import send_email, get_remaining_resumes, update_resume_check, get_user, get_job_details
from dotenv import load_dotenv

load_dotenv()

def init_model():
    llm = ChatOllama(
        model="deepseek-r1",
        temperature=0,
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                """You are a HR manager at a company. You need to evaluate the resume based on company requirements. 
Your task is to:
1. Check if the resume contains the skills required by the company.
2. Identify the missing skills if any.
3. Classify the resume as "ACCEPT", "HOLD", or "REJECT" based on how well it matches the company's requirements.
4. If there are missing skills, include them in the response.
5. If there is more than two missing skills and those two missions skills cannot be learned in a short period of time, reject the resume.
You must give the data in the following format:
{{
  "selection": "ACCEPT" | "HOLD" | "REJECT",
  "reason": "Reason for the decision",
  "skills_needed": ["list of missing skills"],
  "candidate_skills": ["list of skills found in the resume"]
}}

Company Requirement: {company_requirement}""",
            ),
            ("human", "Resume Content: {resume}"),
        ]
    )

    return prompt | llm

def init_embedding_model():
    return OllamaEmbeddings(model="llama3")

def resume_content(resume_filename):
    loader = PyPDFLoader(resume_filename)
    docs = loader.load()
    page_content = ""
    for doc in docs:
        page_content += doc.page_content
    return page_content

def check_resume(chain, resume_filename, company_requirements):
    resume_content_data = resume_content(resume_filename=resume_filename)
    print(resume_content_data)
    print()
    print()
    model_res = chain.invoke({
        "company_requirement": company_requirements,
        "resume": resume_content_data
    })
    res = model_res.content[model_res.content.find("```json") + len("```json"):].replace("```", "")
    print("before")
    print(res)
    res = ast.literal_eval(res)
    return res

def main():
    candidates = get_remaining_resumes()
    chain = init_model()
    for candidate in candidates:
        email_id, filename, checked, job_id = candidate
        job_data = get_job_details(job_id)
        print(candidate)
        print(job_data)
        cmp_req = ",".join(job_data["skills_required"])
        print(email_id)
        # res = check_resume(chain, f"resumes/{filename}.pdf", cmp_req)
        res = check_resume(chain, f"resumes/omJK6ABLnQMNkQ.pdf", cmp_req)
        match res['selection']:
            case "ACCEPT":
                update_resume_check(email_id, 1)
                send_email([email_id], "Resume Accepted", "Your resume has been accepted")
            case "HOLD":
                update_resume_check(email_id, 0)
                send_email([email_id], "Resume On Hold", "Your resume is on hold")
            case "REJECT":
                update_resume_check(email_id, -1)
                send_email([email_id], "Resume Rejected", "Your resume has been rejected")
            case _:
                print("Invalid selection")
        print(res)

main()