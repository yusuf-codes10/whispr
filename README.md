# Whispr

## Overview

Whispr is a full-stack AI chatbot with a clean, minimal interface.
Built on the Groq API for fast inference, with persistent chat history,
JWT authentication, and a serverless PostgreSQL database via Neon.

## 🚀 Live Demo

[whispr.vercel.app](https://...)

## ✨ Features

- Streaming AI responses powered by Groq (near-instant output)
- JWT-based authentication with protected routes
- Persistent chat history stored per user
- Create and delete conversations
- Clean, responsive UI built with TailwindCSS

## 🛠 Tech Stack

**Frontend** Vue.js · TailwindCSS · Vue Router · Pinia
**Backend**  Node.js · Express.js · JWT · Groq SDK
**Database** PostgreSQL · Neon

## 💡 Why I built this

Most AI chat interfaces are cluttered or locked behind paywalls.
I wanted to build something fast, minimal, and fully mine — with
real auth and persistent history, not just a prompt wrapper.