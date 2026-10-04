import notesModel from "../../DB/Models/notes.model.js"
import UserModel from "../../DB/Models/user.model.js"

export const CreateSingleNote = async(req,res)=>{
    try {
        const{userId} = req.query;
        const{title,content}= req.body;
        const user = await UserModel.findById(userId);
        if(!user) return res.status(404).json({message:"User Not Found "});
        const note = await notesModel.create({title,content,userId});
        res.status(201).json({status: "success" , message: "Note created successfully" , note : note});
    } catch (error) {
        res.status(400).json({status: "fail" , message: error.message});
    }
}

export const updateSingleNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { userId } = req.query;
        const { title, content } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        const note = await notesModel.findById(noteId);
        if (!note) {
            return res.status(404).json({
                message: "Note Not Found"
            });
        }
        if (note.userId.toString() !== userId) {
            return res.status(403).json({
                message: "You are not the owner of this note"
            });
        }
        const updatedNote = await notesModel.findByIdAndUpdate(
            noteId,
            {
                title,
                content
            },
            {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            status: "success",
            message: "Note updated successfully",
            note: updatedNote
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const replaceSingleNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { userId } = req.query;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        const note = await notesModel.findById(noteId);
        if (!note) {
            return res.status(404).json({
                message: "Note Not Found"
            });
        }
        if (note.userId.toString() !== userId) {
            return res.status(403).json({
                message: "You are not the owner of this note"
            });
        }
        const updatedNote = await notesModel.findByIdAndUpdate(
            noteId,
            {
                title: req.body.title,
                content: req.body.content,
                userId: req.body.userId
            },
            {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            status: "success",
            message: "Note replaced successfully",
            note: updatedNote
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const UpdatesTheTitleOfAllNotes = async (req, res) => {
    try {
        const { userId } = req.query;
        const { title } = req.body;
        
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        const updatedNotes = await notesModel.updateMany(
            { userId },
            { $set: { title } }
        );
        res.status(200).json({
            status: "success",
            message: "All notes updated successfully",
            result: updatedNotes
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};
export const deleteSingleNote = async (req, res) => {   
    const { noteId } = req.params;
    const { userId } = req.query;
    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(404).json({   
            message: "User Not Found"
        });
    }
    const note = await notesModel.findById(noteId );
    if (!note) {
        return res.status(404).json({
            message: "Note Not Found"
        });
    }
    if (note.userId.toString() !== userId) {
        return res.status(403).json({
            message: "You are not the owner of this note"
        });
    }
    await notesModel.findByIdAndDelete(noteId, {returnDocument: "before"});
    res.status(200).json({
        message: "Deleted",
        note: note
    });
};
export const RetrievePaginatedList = async (req, res) => {
    try {
        const { userId } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        const notes = await notesModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json({
            status: "success",
            message: "Notes retrieved successfully",
            notes
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const getNodeById = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { userId } = req.query;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        const note = await notesModel.findById(noteId);
        if (!note) {
            return res.status(404).json({
                message: "Note Not Found"
            });
        }
        if (note.userId.toString() !== userId) {
            return res.status(403).json({
                message: "You are not the owner of this note"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Note retrieved successfully",
            note
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const getNoteByContent = async (req, res) => {
    try {
        const { content } = req.query;
        const { userId } = req.query;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
    const note = await notesModel.findOne({content});
    if (note.userId.toString() !== userId) {
            return res.status(403).json({
                message: "You are not the owner of this note"
            });
        }
    res.status(200).json({status: "success" , message: "Note retrieved successfully" , note : note});
    } catch (error) {
        res.status(400).json({status: "fail" , message: error.message});
    }

};

export const getNotesWithUser = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        const notes = await notesModel
            .find({ userId })
            .select("title userId createdAt")
            .populate("userId", "email");
        res.status(200).json({
            status: "success",
            message: "Notes retrieved successfully",
            notes
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const getNotesAggregate = async (req, res) => {
    try {
        const { userId, title } = req.query;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        const match = {
            userId: user._id
        };
        if (title) {
            match.title = {
                $regex: title,
                $options: "i"
            };
        }
        const notes = await notesModel.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    userId: 1,
                    createdAt: 1,
                    "user.name": 1,
                    "user.email": 1
                }
            }
        ]);
        res.status(200).json({
            status: "success",
            message: "Notes retrieved successfully",
            notes
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const deleteAllNotes = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        const result = await notesModel.deleteMany({ userId });
        res.status(200).json({
            status: "success",
            message: "All notes deleted successfully",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};