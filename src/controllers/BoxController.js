const Box = require('../models/Box');
const User = require('../models/User');
const UserController = require('./UserController');

class BoxController {

    async store(req, res) {

        console.log("Criando uma pasta");
        
        const user = await User.findById(req.headers.authorization);

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

    async shareBox(req, res) {

        const user = await User.findById(req.headers.authorization);
        const shareUser = await User.findOne({ username: req.body.shareUser });
        if (shareUser) {
            const shareBox = await Box.findById(req.body.box);
            if (shareBox) {
                user.sharedBoxes.push(shareBox);
                await user.save();
                shareUser.boxes.push(shareBox);
                await shareUser.save();
            }
        }
    }
}

module.exports = new BoxController();