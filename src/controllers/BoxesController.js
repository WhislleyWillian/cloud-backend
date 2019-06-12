const Boxes = require('../models/Boxes');
const Box = require('../models/Box');
const User = require('../models/User');

class BoxesController {

    async show(req, res){

        const user = await User.findById(req.headers.authorization);

        const boxes = await Box.find({ _id: user.boxes }).populate({
            path: 'boxes',
            options: { sort: { createdAt: -1 } }
        });

        return res.json(boxes);

    }
}

module.exports = new BoxesController();