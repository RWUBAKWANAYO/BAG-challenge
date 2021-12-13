
const mongoose = require ('mongoose')
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
    country: {
        type: Object,
        required:true
   },
    owner:{
        type:ObjectId,
        ref: "users._id",

    },
     createdAt:{
        type: Date,
        default: Date.now
      },

})
const Post = mongoose.model("list", PostSchema)
module.exports = Post;