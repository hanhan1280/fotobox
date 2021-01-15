const Image = require("../models/Image");
const User = require("../models/User");
const cloudinary = require('cloudinary').v2;

const getImages = async (req, res) => {
  try {
    if (req.user) {
      let user = await User.findById(req.user._id);
      let images = await Image.find().where('_id').in(user.images).exec();
      return res.status(200).json({ images, msg: "image info fetched" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (req.files && req.user) {
      let images = [], imageIds = [];
      req.files.map((file, i) => {
        let image = {
          description: req.body[`desc${i}`],
          url: file.path,
          cloudinaryId: file.filename
        }
        images.push(image);
      })
      Image.create(images, (err, imgs) => {
        if (err) return res.status(422).json({ error: `${img._id} failed upload` });
        imgs.map(img => {
          imageIds.push(img._id);
        })
      })
      let user = await User.findById(req.user._id);
      if (!user) return res.status(422).json({ error: "User not found" });
      user.images.push(...imageIds);
      await user.save();
      return res.status(200).json({ msg: "image successfully saved" });
    } else {
      console.log(req.file);
      return res.status(422).json({ fileUsed: "invalid file" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
};

const deleteImage = async (req, res) => {
  try {
    if (req.user) {
      await User.updateOne({ _id: req.user._id }, { $pullAll: { images: [req.params.imageid] } })
      let user = await User.findById(req.user._id);
      let image = await Image.findById(req.params.imageid);
      await cloudinary.uploader.destroy(image.cloudinaryId);
      await Image.findByIdAndDelete(req.params.imageid);
      return res.status(200).json({ msg: "image deleted" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
}

const getFriends = async (req, res) => {
  try {
    if (req.user) {
      let user = await User.findById(req.user._id);
      let friends = await User.find().where('_id').in(user.friends);
      friends.forEach(friend => {
        friend = { _id: friend._id, name: friend._name, email: friend._email }
      });
      return res.status(200).json({ friends, msg: "friends fetched" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
}

const getFriendImgs = async (req, res) => {
  try {
    if (req.user) {
      let friend = await User.findById(req.params.userId);
      let images = await Image.find().where('_id').in(friend.images).exec();
      friend = {
        _id: friend._id,
        name: friend.name,
        email: friend.email
      };
      return res.status(200).json({ friend, images, msg: "image info fetched" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: error
    });
  }
}

const addFriend = async (req, res) => {
  try {
    if (req.user) {
      let user = await User.findById(req.user._id);
      let friend = await User.findById(req.params.userId);
      if (user && !user.friends.includes(friend._id)) {
        user.friends.push(friend._id);
        user.save();
        return res.status(200).json({ msg: "friend added" });
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
}

const rmFriends = async (req, res) => {
  try {
    if (req.user) {
      await User.updateOne({ _id: req.user._id }, { $pullAll: { friends: [req.params.userId] } })
      return res.status(200).json({ msg: "friend removed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
}

const getAllUsers = async (req, res) => {
  try {
    if (req.user) {
      let search = req.params.search;
      let users = await User.find({ "_id": { $ne: req.user._id } });
      Promise.all(users.filter(user => {
        if ((user.name.toLowerCase().search(search.toLowerCase()) !== -1 || user.email.toLowerCase().search(search.toLowerCase()) !== -1)) {
          return user;
        }
      }).map(user => {
          return Image.findById(user.images[0]).then(profile => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            imageLen: user.images.length,
            profile: profile
          }))
        })).then(usersAll => {
          return res.status(200).json({ usersAll });
        })
        .catch(err => {
          console.log(err);
        })
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
}


module.exports = {
  getImages,
  uploadImage,
  deleteImage,
  getFriends,
  rmFriends,
  getFriendImgs,
  getAllUsers,
  addFriend
};