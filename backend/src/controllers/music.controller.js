const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const newMusic = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
    // artist: decoded.id,
  });

  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: newMusic._id,
      uri: newMusic.uri,
      title: newMusic.title,
      artist: newMusic.artist,
    },
  });
}

async function createAlbum(req, res) {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    musics,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    },
  });
}

async function getAllMusics(req, res) {
  const musics = await musicModel.find().populate("artist", "username email").limit(2);

  res.status(200).json({
    message: "Musics fetched successfully",
    musics,
  });
}

async function getAllAlbums(req, res) {
  const albums = await albumModel.find().limit(2).select("title artist").populate("artist", "username email");

  res.status(200).json({
    message: "Albums fetched successfully",
    albums,
  });
}

async function getAlbumById(req, res) {
  const { albumId } = req.params;

  const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics");

  if (!album) {
    return res.status(404).json({
      message: "Album not found",
    });
  }

  res.status(200).json({
    message: "Album fetched successfully",
    album,
  });
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById  };
