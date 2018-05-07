const express = require('express');
const router = express.Router();
const Users = require('../app/models/users');
const session = require('../app/models/session');
const users = new Users();

router.route('/session/create')
    .get((req, res) => {
        try {
            res.json({sissionId:session.getSessionId()});
        } catch (e) {
            res.status(401).json({message: e.stack})
        }
    });

router.route('/users/pool/reset')
    .get((req, res) => {
        try {
            users.resetState();
            res.json({ message: "All users are deleted!"});
        } catch (e) {
            res.status(400).json({ message: e.stack })
        }
    }
    );

router.route('/users/pool/create')
    .post((req, res) => {
            try {
                users.createUserPool(req.body.env, req.body.creds, req.body.sessionId);
                console.log(users.users);
                res.json({users: JSON.stringify(users.getUsersInJSONFormat(req.body.env))});
            } catch (e) {
                res.status(400).json({message: e.stack})
            }
        }
    );

router.route('/users/pool/delete')
    .post((req, res) => {
            try {
                users.deleteUserPool(req.body.env, req.body.sessionId);
                console.log(users.users);
                res.json({users: JSON.stringify(users.getUsersInJSONFormat(req.body.env))});
            } catch (e) {
                res.status(400).json({message: e.stack})
            }
        }
    );

router.route('/users/user/lock')
    .post((req, res) => {
            try {
                const creds = users.lockUser(req.body.env);
                console.log(users.users);
                res.json(creds);
            } catch (e) {
                res.status(400).json({message: e.stack})
            }
        }
    );

router.route('/users/user/unlock')
    .post((req, res) => {
            try {
                users.unlockUser(req.body.env, req.body.userName);
                console.log(users.users);
                res.json({message: `User ${req.body.userName} is free on env ${req.body.env}!`});
            } catch (e) {
                res.status(400).json({message: e.stack})
            }
        }
    );

module.exports = router;
