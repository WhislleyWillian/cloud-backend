const Box = require('../models/Box');
const User = require('../models/User');
const UserController = require('./UserController');

class BoxController {

    async store(req, res) {

        const user = await User.findById(req.params.id);

        const box = await Box.create(req.body);

        user.boxes.push(box);

        await user.save();

        return res.json(box);
    }

    async show(req, res){
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }
        });

        return res.json(box);
    }
}

module.exports = new BoxController();