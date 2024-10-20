const { blogmodel, likemodel, commentmodel } = require('../model/blogmodel.js')
const { blogsValidation, likeValidation, commentValidation,postlistValidation } = require('../validation/blogvalidation.js')
const mongoose=require('mongoose')

exports.createpost = async (req, res) => {
    try {
        const user_id = req.body.user_id
        const post_image = req.file ? `${req.protocol}://${req.get('host')}/blogpost/${req.file.filename}` : null
        const title = req.body.title
        const tag = req.body.tag
        const category_id = req.body.category_id

        let { error } = blogsValidation.validate({ user_id, post_image, title, tag, category_id })
        if (error) {
            res.status(400).send(error.message)
            return
        }

        let createpostdata = new blogmodel({
            user_id,
            post_image,
            title,
            tag,
            category_id
        })

        let postdata = await createpostdata.save()
        if (postdata) {
            res.json({ errorcode: 0, message: "blog created succssfully", postdata: postdata })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });

    }
}

exports.likepost = async (req, res) => {
    try {

    let user_id = req.body.user_id
    let post_id = req.body.post_id
    let is_like = req.body.is_like
    let { error } = likeValidation.validate({ user_id, post_id, is_like })
    if (error) {
        res.status(400).send(error.message)
        return
    }
  
    let likedata=new likemodel({
        user_id,
        post_id,
        is_like
    })
let checkextistlike=await likemodel.findOneAndUpdate({user_id:user_id,post_id:post_id},{is_like:false}) 
 if(checkextistlike){
    let deletelike=await likemodel.findOneAndDelete({user_id:user_id,post_id:post_id}) 

   res.json({ errorcode: 0, message: "already you liked post", deletelike: deletelike })
}else{
 let likepostdata=await likedata.save()
 if(likepostdata){
    res.json({ errorcode: 0, message: "like created succssfully", likepostdata: likepostdata })
}
 }
}catch(error){
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
}
}


exports.commentpost = async (req, res) => {
    try {

   let user_id=req.body.user_id
   let post_id=req.body.post_id
    let comment=req.body.comment
    let { error } = commentValidation.validate({ user_id, post_id,comment })
    if (error) {
        res.status(400).send(error.message)
        return
    }
  
    let commentdata=new commentmodel({
        user_id,
        post_id,
        comment
    })

    let commentpostdata=await commentdata.save()
    if(commentpostdata){
        res.json({ errorcode: 0, message: " succssfully", commentpostdata: commentpostdata })

    }
}catch(error){
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
}
}

exports.postlist=async (req, res) => {
     let post_id=req.body.post_id
      
     let { error } = postlistValidation.validate({post_id})
     if (error) {
         res.status(400).send(error.message)
         return
     }

//   let postdata=await blogmodel.aggregate([
//     {
//            $match:{_id: new mongoose.Types.ObjectId(post_id)}
//     },
//     {
//         $lookup:{
//            from:'likedetails',
//            localField:'_id',
//            foreignField:'post_id',
//            as: 'likes'
//         }
//     },
//      {
//          $lookup:{
//            from:'commentdetails',
//            localField:'_id',
//            foreignField:'post_id',
//            as: 'comment'
//           }
//       },

//       {  
//           $unwind:{
//             path:'$likes',
//             preserveNullAndEmptyArrays: true

//           }

//       },
//       {
//         $unwind:{
//             path:'$comment',
//             preserveNullAndEmptyArrays: true

//           }


//       }
//  ])
let postdata = await blogmodel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(post_id) }
    },
    {
      $lookup: {
        from: 'likedetails',
        localField: '_id',
        foreignField: 'post_id',
        as: 'likes'
      }
    },
    {
      $lookup: {
        from: 'commentdetails',
        localField: '_id',
        foreignField: 'post_id',
        as: 'comments'
      }
    },
    {
      $unwind: {
        path: '$likes',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$comments',
        preserveNullAndEmptyArrays: true
      }
    },
    {
        $project: {
          _id: 1,
          user_id: 1,
          post_image: 1,
          title: 1,
          tag: 1,
          category_id: 1,
          createdAt: 1,
          updatedAt: 1,
          likes: { $ifNull: ['$likes',null] },
          comments: { $ifNull: ['$comments',null] }
        }
      }
  ]);
 if(postdata){
    res.json({ errorcode: 0, message: " succssfully", postdata: postdata })

}

}