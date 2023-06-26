const Todo = require('../models/todo.schema.js');
const generateAuto_ID = require('../utils/auto_ids.js');

// Handler for create 
exports.createTodo = async(req, res)=>{
    const body = req.body;
    try {

        if(!body.dst_id){
            return res.status(401).send({status : false, message : "insert DST Id"});
        }

        const autoId = await generateAuto_ID.auto_id();
        body.id = autoId;

        await Todo.create(body);

        res.status(201).send({
            status : true,
            message : "Data Inserted",
            data : []
        });

    } catch (err) {
        res.status(500).send({
            status : false,
            message : err.message
        });
    }
}

// Handler for get all todos for specific { User }
exports.getAll_Todo = async(req, res)=>{
    const dst_id = req.query.dst_id;
    try {
        const data = await Todo.find({dst_id : dst_id}).sort({created_at : -1});

        res.status(200).send({
            status : true,
            message : "All Data for user",
            data : data
        });

    } catch (err) {
        res.status(500).send({
            status : false,
            message : err.message
        });
    }
}

// export { createTodo, getAll_Todo };