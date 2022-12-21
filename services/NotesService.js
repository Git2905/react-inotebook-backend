const mongoDB = require("../utility/dbutils/DBConnection");
const Note = require("../models/Note");

module.exports = {
    getAllNotesByUserID: function (userID) {
        let promise = new Promise((resolve, reject) => {
            mongoDB.connectMongoDB().then(() => {
                Note.find({ user: userID }).then(value => {
                    resolve(value);
                    mongoDB.disconnectMongoDB();
                }).catch(reason => {
                    reject(reason);
                    mongoDB.disconnectMongoDB();
                });
            }).catch(reason => {
                reject(reason);
            });
        });

        return promise;
    },
    getNoteByNoteID: function (noteID) {
        let promise = new Promise((resolve, reject) => {
            mongoDB.connectMongoDB().then(() => {
                Note.findById(noteID).then(value => {
                    resolve(value);
                    mongoDB.disconnectMongoDB();
                }).catch(reason => {
                    reject(reason);
                    mongoDB.disconnectMongoDB();
                });
            }).catch(reason => {
                reject(reason);
            });
        });

        return promise;
    },
    saveNote: function (noteObj) {
        let promise = new Promise((resolve, reject) => {
            mongoDB.connectMongoDB().then(() => {
                const note = new Note(noteObj);
                note.save().then(value => {
                    resolve(value);
                    mongoDB.disconnectMongoDB();
                }).catch(reason => {
                    reject(reason);
                    mongoDB.disconnectMongoDB();
                });
            }).catch(reason => {
                reject(reason);
            })
        });

        return promise;
    },
    updateNote: function (noteID, noteObj) {
        let promise = new Promise((resolve, reject) => {
            mongoDB.connectMongoDB().then(() => {
                Note.findByIdAndUpdate(noteID, { $set: noteObj }, { new: true }).then(value => {
                    resolve(value);
                    mongoDB.disconnectMongoDB();
                }).catch(reason => {
                    reject(reason);
                    mongoDB.disconnectMongoDB();
                });
            }).catch(reason => {
                reject(reason);
            })
        });

        return promise;
    },
    deleteNote: function (noteID) {
        let promise = new Promise((resolve, reject) => {
            mongoDB.connectMongoDB().then(() => {
                Note.findByIdAndDelete(noteID).then(value => {
                    resolve(value);
                    mongoDB.disconnectMongoDB();
                }).catch(reason => {
                    reject(reason);
                    mongoDB.disconnectMongoDB();
                });
            }).catch(reason => {
                reject(reason);
            })
        });

        return promise;
    }
}