const Image = require("../models/Image");
const User = require("../models/User");

const getImages = async (req, res) => {
  try {
    if (req.user) {
      let user = await User.findById(req.user._id);
      let images = await Image.find().where('_id').in(user.images).exec();
      return res.status(200).json({ images, msg: "image info fetched" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
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
    return res.status(500).json({ error: "some error occured" });
  }
};

const deleteImage = async (req, res) => {
  try {
    if (req.user) {
      await User.updateOne({ _id: req.user._id }, { $pullAll: { images: [req.params.imageid] } })
      await Image.deleteOne({ _id: req.params.imageid });
      return res.status(200).json({ msg: "image deleted" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
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
      return res.status(200).json({ friends, msg: "image info fetched" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
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
    return res.status(500).json({ error: "some error occured" });
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
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
}

const getAllUsers = async (req, res) => {
  try {
    if (req.user) {
      let users = await User.find({ "_id": { $ne: req.user._id } });
      let usersAll = [];
      users.map(user => {
        usersAll.push({
          _id: user._id,
          name: user.name,
          email: user.email,
          imageLen: user.images.length,
        })
      })
      return res.status(200).json({ usersAll });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
}


module.exports = {
  getImages,
  uploadImage,
  deleteImage,
  getFriends,
  getFriendImgs,
  getAllUsers,
  addFriend
};