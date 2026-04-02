import express from 'express'
import app from './backend/src/app'

// Keep a direct express import in the root entrypoint so Vercel
// recognizes this repository as an Express backend.
void express

export default app
