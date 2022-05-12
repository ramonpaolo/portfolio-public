import express from 'express'
import compression from 'compression'
import cors from 'cors'
import path from 'path'

// Settings
import firebase from './settings/firebase'

const app = express()

// Use libs how middlewares
app.use(compression())
app.use(cors())

// Set the engine render
app.set('engine', 'ejs')

// Static files
app.use(express.static(path.join(__dirname, 'statics')))
app.use(express.static(path.join(__dirname, '..', 'views', 'styles')))

const PORT = process.env.PORT || 3000

const firestore = firebase.firestore()

// Routes
app.get('/', async (_, res) => {
    const stack = await firestore.collection('stack').get()

    let stacks: object[] = []

    stack.docs.forEach(async (value) => {
        stacks.push(value.data())
    })

    stacks = stacks.reverse()


    res.status(200).render('index.ejs', { techs: stacks })
})

app.get('/projects', async (_, res) => {
    const project = await firestore.collection('projects').get()

    let projects: object[] = []

    project.docs.forEach(async (value) => {
        projects.push(value.data())
    })

    projects = projects.reverse()

    res.status(200).render('projects.ejs', { projects })
})

app.get('/about-me', (_, res) => {
    res.status(200).render('about-me.ejs')
})

app.get('/certifications', async (_, res) => {
    const certification = await firestore.collection('certifications').get()

    const certifications: object[] = []

    certification.docs.forEach(async (value) => {
        certifications.push(value.data())
    })

    res.status(200).render('certifications.ejs', { certifications })
})

app.listen(PORT)