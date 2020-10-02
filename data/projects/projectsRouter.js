const express = require('express')
const projectsModel = require('../helpers/projectModel.js');

const router = express.Router();

router.post('/', (req, res) => {
    const info = req.body
    projectsModel
    .insert(info)
    .then(() => {
        res.status(201).json(({message: "Your project was successfully created."}))
    })
    .catch(err => {
        res.status(500).json({err, err: "There was an error creating a new project."})
    })
})

router.get('/', (req, res) => {
    projectsModel.get(req.id)
    .then(e => {
        res.status(200).json(e)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "There is an error getting your projects."})
    })
})

router.put('/:id', (req, res) => {
    const info = req.body;
    const {id} = req.params;
    projectsModel
    .update(id, info)
    .then(e => {
        if(e){
            res.status(200).json({message: "The project has been successfully updated."})
        } else {
            res.status(404).json({message: "The project is not found nor updated."})
        }
    })
    .catch(err => {
        res.status(500).json({err: 'There was an error updating the projects.'})
    })
})

router.delete('/:id', (req, res) => {
    projectsModel
    .remove(req.params.id)
    .then(e => {
        if(e > 0) {
            res.status(200).json({message: "The project has been deleted."})
        } else {
            res.status(400).json({message: "The project can not be found."})
        }
    }) 
    .catch(err => {
        console.log(err);
        req.status(500).json({message: "There was an error deleting the project."})
    })
})

router.get('/:id/actions', (req, res) => {
    projectsModel
    .getProjectActions(req.params.id)
    .then((e) => {
        res.status(200).json(e)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({message: "There was error retrieving actions."})
    });
});

module.exports = router