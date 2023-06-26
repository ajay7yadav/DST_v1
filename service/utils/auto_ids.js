const User = require('../models/users.schema.js');
const Todo = require('../models/todo.schema.js');

// handler for generate last DST auto_Id
exports.dst_Id = async() =>{
    const userData = await User.find().sort({created_id : -1});

    let newId;
    if(userData.length === 0){
        newId = "DST000000";
    }
    else{
        const lastId = userData[0].dst_id;
        let name = lastId.substr(0, 3);
        let number = Number(lastId.split(name)[1]);

        let newNumber = number + 1;

        newId = `${name}${newNumber.toString().padStart(6, '0')}`;
    }

    return newId;
}


// handler for generate last todo auto_Id
exports.auto_id = async() =>{
    const todoData = await Todo.find().sort({created_id : -1});

    if(todoData.length === 0){
        return 1;
    }
    else{
        return todoData[0].id + 1;
    }
}


// handler for generate six digit OTP
exports.otp = async() =>{
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp
}
// export { dst_Id, auto_id }