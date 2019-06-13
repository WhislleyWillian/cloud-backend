const Box = require('../models/Box');
const User = require('../models/User');
const UserController = require('./UserController');

class BoxController {

    async store(req, res) {
        
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
            try {
                const shareBox = await Box.findById(req.body.box);
                if (shareBox) {
                    user.sharedBoxes.push(shareBox);
                    await user.save();
                    shareUser.boxes.push(shareBox);
                    await shareUser.save();
                    return res.status(201).json({ success: true, message: 'Pasta compartilhada com sucesso!', statusCode: 201, shareBox });
                } else {
                    return res.status(500).json({ success: true, message: 'Houve um erro ao compartilhar a pasta!', statusCode: 500, shareBox });
                }
            } catch(err) {
                return res.status(400).json({ success: true, message: 'Houve um erro ao compartilhar a pasta!', statusCode: 500 });
            }
        } else {
            return res.status(400).json({ success: true, message: 'Usuário inexistente!', statusCode: 500 });
        }
    }

    async deleteBox(req, res) {
        const user = await User.findById(req.headers.authorization);
        const deleteBox = await Box.findByIdAndDelete(req.body.box);
        if (deleteBox) {
            user.boxes.remove(deleteBox._id);
            await user.save();
            return res.status(201).json({ success: true, message: 'Pasta excluída', statusCode: 201, deleteBox });
        } else {
            return res.status(500).json({ success: true, message: 'Houve um erro ao excluir a pasta!', statusCode: 500, deleteBox });
        }
    }

    async renameBox(req, res) {
        const box = await Box.findById(req.body.box);
        if (box) {
            box.title = req.body.title;
            await box.save();
            return res.status(201).json({ success: true, message: 'Pasta renomeada!', statusCode: 201, box });
        } else {
            return res.status(500).json({ success: true, message: 'Houve um erro ao renomear a pasta!', statusCode: 500, box });
        }
    }
}

module.exports = new BoxController();