const {Router} = require('express');
const shortid = require('shortid');
const config = require('config');
const Link = require('../models/Link');
const authMiddleware = require('../middlewares/auth.middleware'); // check if user is authorized (if his token is valid)

const router = Router();

// api/link/generate
router.post(
    '/generate',
    authMiddleware,
    async (req, res) => {
        try {
            
            const baseUrl = config.get('baseUrl');
            const {from} = req.body; //get url from frontend ??
            const code = shortid.generate();

            const isExistedLink = await Link.findOne({ from });

            if (isExistedLink) {
                return res.json({ link: isExistedLink})
            }

            const to = baseUrl + '/t/' + code; // link url

            const link = new Link({
                code, from, to, owner: req.user.userId
            })
            await link.save();

            res.status(201).json({ link });


        } catch (e){
            res.status(500).json({ message: 'Something went wrong!!!'})
        }

})

// api/link/getLink
router.get(
    '/',
    authMiddleware, // and now we will have value user.id inside "req" at next line. Because we return whole decoded object of token (inside auth.routes.js line 82)
    async (req, res) => {
        try {
            const links = await Link.find({ owner: req.user.userId });

            res.json(links);
        } catch (e){
            res.status(500).json({ message: 'Something went wrong!'})
        }
    
    }
);

// api/link/getLinkById
router.get(
    '/:id',
    authMiddleware,
    async (req, res) => {
        try {
            const link = await Link.findById(req.params.id);

            res.json(link);
        } catch (e){
            res.status(500).json({ message: 'Something went wrong!&'})
        }
    }
);

module.exports = router;