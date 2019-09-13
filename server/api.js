const router = require("express").Router();
const Record = require('./models/record');
const User = require('./models/user');

router.get('/', (req, res) => {
    res.json({
        'hello': 'world'
    })
});

router.get('/list', (req, res) => {
    Record.find((err, records) => {
        if(err) {
            res.send({
                'status': 'FAILURE',
                'data': null,
                'reason': 'Query failed: ' + err.message
            });
        } else {
            res.send({
                'status': 'SUCCESS',
                'data': records
            });
        }
    })
});

router.get('/list/:userId', (req, res) => {
    let userId = req.params.userId;

    userExists(userId)
        .then(() => {
            getRecordsForUser(userId)
            .then((records) => res.send({
                'status': 'SUCCESS',
                'data': records
            }))
            .catch((errMessage) => res.send({
                'status': 'FAILURE',
                'data': null,
                'reason': 'Query failed: ' + errMessage
            }))
        })
        .catch(errMessage => res.send({
            'status': 'FAILURE',
            'data': null,
            'reason': 'User does not exist'
        }));
});

router.get('/users', (req, res) => {
    getUsers()
    .then(users => res.send({
        'status': 'SUCCESS',
        'data': users
    }))
    .catch(errMessgae => res.send({
        'status': 'FAILURE',
        'data': null,
        'reason': 'Query failed: ' + errMessgae
    }));
});

router.post('/new-record', (req, res) => {


    if (!req.body) res.send({
        'status': 'FAILURE',
        'data': null,
        'reason': 'Insufficient information: no body'
    });

    if (!req.body.date || !req.body.weight) res.send({
        'status': 'FAILURE',
        'data': null,
        'reason': 'Insufficient information: no weight or date'
    });


    if (!req.body.id && !req.body.name) res.send({
        'status': 'FAILURE',
        'data': null,
        'reason': 'Insufficient information: no name or id'
    });

    if (!req.body.id) {
        console.log("Id not passed for name: " + req.body.name + ". So, creating a new user.");
        createUser(req.body.name)
            .then((resp) => {
                createRecord({
                    "name": resp.name,
                    "userId": resp._id,
                    "date": req.body.date,
                    "weight": req.body.weight
                })
                .then((updatedRecord) => {
                    res.send(updatedRecord);
                })
            });
    }
        

    if(req.body.id) {
        userExists(req.body.id)
        .then(() => {
            console.log("User exists: " + req.body.name, req.body.id);
            createRecord({
                "name": req.body.name,
                "userId": req.body.id,
                "date": req.body.date,
                "weight": req.body.weight
            })
            .then((updatedRecord) => {
                res.send(updatedRecord);
            })
        })
        .catch(() => {
            console.log("User does not exist, creating one for name: " + req.body.name);
            createUser(req.body.name)
            .then((resp) => {
                createRecord({
                    "name": resp.name,
                    "userId": resp._id,
                    "date": req.body.date,
                    "weight": req.body.weight
                })
                .then((updatedRecord) => {
                    res.send(updatedRecord);
                })
            });
        });
    }
        
})

function userExists(id) {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, results) => {
            if(err) reject(err.message);
            else resolve(results);
        })
    });
}

function createUser(name) {
    return new Promise((resolve, reject) => {
        let user = new User({
            name
        });
        user.save((err, user) => {
            if (err) reject(err);
            resolve(user);
        })
    })
}

function createRecord(recordObj) {
    return new Promise((resolve, reject) => {
        let record = new Record(recordObj);

        record.save((err, updatedRecord) => {
            resolve(updatedRecord);
        })
    });
}

function getRecordsForUser(userId) {
    return new Promise((resolve, reject) => {
        Record.find({
            'userId': userId
        }, (err, results) => {
            if(err) reject(err.message);
            resolve(results);
        })
    });
}

function getUsers() {
    return new Promise((resolve, reject) => {
        User.find((err, users) => {
            if(err) reject(err.message);
            else resolve(users);
        })
    });
}

module.exports = router;