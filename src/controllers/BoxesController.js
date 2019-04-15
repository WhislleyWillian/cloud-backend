const Boxes = require('../models/Boxes');
const Box = require('../models/Box');

class BoxesController {

    async show(req, res){

        const boxes = await Box.find({}).populate({
            path: 'boxes',
            options: { sort: { createdAt: -1 } }
        });

        return res.json(boxes);
    }
}

module.exports = new BoxesController();