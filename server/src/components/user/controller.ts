import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { User } from './model';
import { appResponse, logger } from '../../utils';

//!TODO: Add validation to the email

const createUser: RequestHandler = async (req, res) => {
  try {
    const { username, password, email, name } = req.body;

    if (!username)
      return res.status(400).send(appResponse('Username is required', false));
    if (!password)
      return res.status(400).send(appResponse('Password is required', false));
    if (!email)
      return res.status(400).send(appResponse('Email is required', false));
    if (!name)
      return res.status(400).send(appResponse('Name is required', false));
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser)
      return res
        .status(400)
        .send(appResponse('Username or email already exists', false));

    const hash = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hash, email, name });
    req.session.user = { email, userID: user.id };

    await user.save();

    const response = appResponse('User created successfully', true, user);

    res.status(201).send(response);
  } catch (err) {
    logger.error(err);

    const response = appResponse('Error creating user.', false);
    res.status(500).send(response);
  }
};

const loginUser: RequestHandler = async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const response = appResponse('Email or password is wrong.', false);
      return res.status(401).send(response);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const response = appResponse('Email or password is wrong.', false);
      return res.status(401).send(response);
    }

    req.session.user = { email, userID: user.id };
    const response = appResponse('User logged in successfully', true, user);
    res.status(200).send(response);
  } catch (err) {
    logger.error(err);

    const response = appResponse(
      'Something went wrong. Try again later.',
      false
    );
    res.status(401).send(response);
  }
};

const logoutUser: RequestHandler = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        const response = appResponse(
          'Something went wrong. Try again later.',
          false
        );
        return res.status(400).send(response);
      }
      return res.status(200).send(appResponse('Signed out successfully', true));
    });
  } catch (err) {
    logger.error(err);

    const response = appResponse(
      'Something went wrong. Try again later.',
      false
    );
    res.status(500).send(response);
  }
};

const getProfile: RequestHandler = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.user?.email });

    if (!user) {
      const response = appResponse('User not found', false);
      return res.status(404).send(response);
    }
    const response = appResponse('User found', true, user);
    res.status(200).send(response);
  } catch (err) {
    logger.error(err);

    const response = appResponse('Error getting user profile', false);
    res.status(500).send(response);
  }
};

const updateUser: RequestHandler = async (req, res) => {
  try {
    const { update } = req.body;
    const userID = req.session.user?.userID;

    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }

    let response = appResponse('User not found', false);

    if (!update) {
      response = appResponse('Update is required', false);
      return res.status(400).send(response);
    }

    if (!userID) {
      return res.status(404).send(response);
    }

    const user = await User.findByIdAndUpdate(userID, update, { new: true });
    if (!user) {
      return res.status(404).send(response);
    }

    response = appResponse('User updated successfully', true, user);
    res.status(200).send(response);
  } catch (err) {
    logger.error(err);

    const response = appResponse('Error updating user', false);
    res.status(500).send(response);
  }
};

const deleteUser: RequestHandler = async (req, res) => {
  try {
    const userID = req.session.user?.userID;

    let response = appResponse('User not found', false);

    if (!userID) {
      return res.status(404).send(response);
    }

    const user = await User.findByIdAndDelete(userID);
    if (!user) {
      return res.status(404).send(response);
    }

    req.session.destroy((err) => {
      if (err) {
        logger.error('User deleted successfully but session not destroyed');
      }
    });

    response = appResponse('User deleted successfully', true, user);
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);

    const response = appResponse('Error deleting user', false);
    res.status(500).send(response);
  }
};

const followUser: RequestHandler = async (req, res) => {
  try {
    const userToFollowID = req.params.userID;
    const userID = req.session.user?.userID;
    if (!userToFollowID) {
      const response = appResponse('User to follow is required', false);
      return res.status(400).send(response);
    }

    const userToFollow = await User.findByIdAndUpdate(
      userToFollowID,
      {
        $addToSet: { followers: userID },
      },
      {
        new: true,
      }
    );

    if (!userToFollow) throw new Error();

    const user = await User.findByIdAndUpdate(
      userID,
      {
        $addToSet: { following: userToFollow },
      },
      {
        new: true,
      }
    );
    if (!user) {
      const response = appResponse('Failed to follow user', false);
      return res.status(404).send(response);
    }
    const response = appResponse('User followed successfully', true, user);
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);

    const response = appResponse('Error following user', false);
    res.status(500).send(response);
  }
};

const unfollowUser: RequestHandler = async (req, res) => {
  try {
    const userToUnFollowID = req.params.userID;
    const userID = req.session.user?.userID;

    const userToUnFollow = await User.findByIdAndUpdate(
      userToUnFollowID,
      {
        $pull: { followers: userID },
      },
      {
        new: true,
      }
    );

    if (!userToUnFollow) {
      const response = appResponse('User to unfollow is required', false);
      return res.status(400).send(response);
    }

    const user = await User.findByIdAndUpdate(
      userID,
      {
        $pull: { following: userToUnFollowID },
      },
      {
        new: true,
      }
    );
    if (!user) {
      const response = appResponse('Failed to unfollow user', false);
      return res.status(404).send(response);
    }
    const response = appResponse('User followed successfully', true, user);
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);
    const response = appResponse('Error unfollowing user', false);
    res.status(500).send(response);
  }
};

export {
  createUser,
  loginUser,
  logoutUser,
  getProfile,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
};
