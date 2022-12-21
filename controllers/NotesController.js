const notesService = require("../services/NotesService");
const appConstants = require("../utility/apputils/AppConstants")

module.exports = {
    getAllNotes: async function (request, response) {
        try {
            let notes = await notesService.getAllNotesByUserID(request.user.id);

            response.status(200).json({
                messageType: appConstants.responseSuccessMsgType,
                message: notes
            });
        } catch (reason) {
            console.log(reason);
            response.status(500).json({
                messageType: appConstants.responseErrorMsgType,
                message: reason
            });
        }
    },
    saveNote: async function (request, response) {
        try {
            let { title, description, tag } = request.body;
            let savedNote = await notesService.saveNote({
                user: request.user.id,
                title,
                description,
                tag
            });

            response.status(200).json({
                messageType: appConstants.responseSuccessMsgType,
                message: savedNote
            });
        } catch (reason) {
            console.log(reason);
            response.status(500).json({
                messageType: appConstants.responseErrorMsgType,
                message: reason
            });
        }
    },
    updateNote: async function (request, response) {
        try {
            let { title, description, tag } = request.body;
            let existingNote = await notesService.getNoteByNoteID(request.params.noteID);

            if (!existingNote)
                return response.status(400).json({
                    messageType: appConstants.responseErrorMsgType,
                    message: appConstants.noteNotFoundMsg
                });

            if (existingNote.user.toString() !== request.user.id)
                return response.status(400).json({
                    messageType: appConstants.responseErrorMsgType,
                    message: appConstants.notAuthorizedMsg
                });

            let newNote = {};

            if (title) newNote.title = title;
            if (description) newNote.description = description;
            if (tag) newNote.tag = tag;

            let updatedNote = await notesService.updateNote(request.params.noteID, newNote);

            response.status(200).json({
                messageType: appConstants.responseSuccessMsgType,
                message: updatedNote
            });
        } catch (reason) {
            console.log(reason);
            response.status(500).json({
                messageType: appConstants.responseErrorMsgType,
                message: reason
            });
        }
    },
    deleteNote: async function (request, response) {
        try {
            let existingNote = await notesService.getNoteByNoteID(request.params.noteID);

            if (!existingNote)
                return response.status(400).json({
                    messageType: appConstants.responseErrorMsgType,
                    message: appConstants.noteNotFoundMsg
                });

            if (existingNote.user.toString() !== request.user.id)
                return response.status(400).json({
                    messageType: appConstants.responseErrorMsgType,
                    message: appConstants.notAuthorizedMsg
                });

            let deletedNote = await notesService.deleteNote(request.params.noteID);

            response.status(200).json({
                messageType: appConstants.responseSuccessMsgType,
                message: deletedNote
            });
        } catch (reason) {
            console.log(reason);
            response.status(500).json({
                messageType: appConstants.responseErrorMsgType,
                message: reason
            });
        }
    }
}