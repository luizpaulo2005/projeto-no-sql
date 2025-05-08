import { env } from '@/lib/env'
import { connect } from 'mongoose'

const db = connect(env.DATABASE_URL)

export { db }
