const Field = require("../models/Field")


const create = async (req) => {
    const field = new Field({
        name: req.name,
        description: req.description,
        image: {
            imgName: req.file.filename.toString(),
            imgLocation: req.file.path.toString()
        },
        teachers: req.body.teachers


    })

    try {
        const savedField = await field.save()
        return savedField
    } catch (error) {
        return error
    }
}


const getAll = async () => {
    try {
        const field = await Field.find()
        return field
    } catch (err) {
        return err
    }
}

exports.getAll = getAll
exports.create = create
