from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Session
from sqlalchemy import create_engine, Boolean, Column, ForeignKey, Integer, String

DATABASE_URL = "mysql://root:mysqltest@localhost/answerbook?charset=utf8"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserQuestion(Base):
  __tablename__ = "questions"
  id = Column(Integer, primary_key=True, index=True)
  text = Column(String, unique=True, index=True)

def getUserAnswer(db: Session, skip: int = 0, limit: int = 100):
  return db.query(UserQuestion).offset(skip).limit(limit).all()

def addUserAnswer(db:Session, question):
  answer = UserQuestion(text=question)
  db.add(answer)
  db.commit()
  db.refresh(answer)
  return answer

# 创建表
Base.metadata.create_all(engine)
app = FastAPI()

origins = [
  "http://localhost:8080",
  "http://localhost:8081",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
def read_root():
  return {"Hello": "World"}

class Item(BaseModel):
  question: str

@app.post("/getAnswer/", response_model=Item)
def read_item(item: Item):
  addUserAnswer(SessionLocal(), item.question.encode('utf8'))
  item.dict().update({ 'code': 200 })
  return item