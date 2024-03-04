const notesModel = require('../Models/notesModel');

module.exports.getnotes = async function (req, res) {
    try {
        const id = req.user._id;
        const userNotes = await notesModel.find({ user: id });

        if(userNotes.length === 0){ // Check if the array is empty
            res.status(404).json({
                messageType: 'error',
                message: "No notes found"
            });
        } else {
            res.status(200).json({
                messageType: 'success',
                message: userNotes
            });
        }

    } catch (err) {
        console.error('Error getting notes:', err);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

module.exports.addNote = async function (req, res) {
    try {
        const userId = req.user._id;
        const { title, description, due, status } = req.body;

        // Omit startTime and endTime if not provided in the request body
        const noteData = {
            title,
            description,
            due: new Date(due),
            status,
            user: userId
        };

        // Check if startTime and endTime are provided in the request body
        if (req.body.startTime && req.body.endTime) {
            noteData.time = {
                start: new Date(req.body.startTime),
                end: new Date(req.body.endTime)
            };
        }

        const note = await notesModel.create(noteData);

        res.status(200).json({
            messageType: 'success',
            message: note
        });
    } catch (err) {
        console.error('Error adding note:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports.updateNote = async function (req, res) {
    try {
        const { id } = req.params;
        const { title,
            description,
            due,
            status,
            startTime, endTime } = req.body;
            let note=await notesModel.findById(id);
            if(!note){
                return res.status(404).json({
                    messageType:'error',
                    message:"Note not found"
                })
            }
            if(title){
                note.title=title;
            }
            if(description){
                note.description=description;
            }
            if(due){
                note.due=due;
            }
            if(status){
                note.status=status;
            }
            if(startTime){
                note.startTime=startTime;
            }
            if(endTime){
                note.endTime=endTime;
            }
            await note.save();
            res.status(200).json({
                messageType:'success',
                message:note
            });

    }
    catch (err) {
        console.error('Error adding note:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.deleteNote = async function (req,res){
    try{
        const {id} = req.params;
        const note = await notesModel.findByIdAndDelete(id);
        if(!note){
            return res.status(404).json({
                messageType:'error',
                message:"No note found"

            })
        }
            res.status(200).json({
                messageType:'success',
                message:'Note deleted successfully'
            })
        



    }
    catch (err) {
        console.error('Error adding note:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}