
const express = require('express');
const actionsModel = require('../helpers/actionModel');

const router = express.Router();

router.post('/', (req, res) => {
    const info = req.body
    actionsModel
    .insert(info)
    .then(() => {
        res.status(201).json(({message: "Your action was created."}))
    })
    .catch(err => {
        res.status(500).json({err, err: "There was an error creating a new action."})
    })
})

router.get('/', (req, res) => {
    actionsModel.get(req.id)
    .then(e => {
        res.status(200).json(e)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "Error fetching actions."})
    })
})

router.put('/:id', (req, res) => {
    const info = req.body
    const {id} = req.params
    actionsModel
    .update(id, info)
    .then(e => {
        if(e){
            res.status(200).json({message: "The action has been updated."})
        } else {
            res.status(404).json({message: "The action can't be found."})
        }
    })
    .catch(err => {
        res.status(500).json({err: "There was an error updating the action."})
    })
})

router.delete('/:id', (req, res) => {
    actionsModel
    .remove(req.params.id)
    .then(e => {
        if(e > 0) {
            res.status(200).json({message: "The action was deleted."})
        } else {
            res.status(404).json({message: "The action can not be found."})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "Error deleting the character"})
    })
})

module.exports = router