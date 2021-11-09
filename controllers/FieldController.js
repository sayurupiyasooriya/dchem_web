const Field = require("../models/Field")


const create = async (req) => {
    const field = new Field({
        name: req.body.name,
        description: req.description,
        image: {
            imgName: req.file.originalname,
            imgLocation: req.file.path
        }
    })

    try {
        return (await field.save())
    } catch (error) {
        return error
    }
}


const getAll = async () => {
    try {
        return (await Field.find())
    } catch (err) {
        return err
    }
}

const getFieldSelect = async () => {
    try {
        return (await Field.find({}, { "image": 0 }))
    } catch (err) {
        return err
    }
}

module.exports = {
    getAll,
    create,
    getFieldSelect
}
