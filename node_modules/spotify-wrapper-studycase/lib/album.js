"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumTracks = exports.getAlbums = exports.getAlbum = void 0;

var _config = require("./config");

var _utils = require("./utils");

var getAlbum = function getAlbum(id) {
  return fetch("".concat(_config.API_URL, "/albums/").concat(id)).then(_utils.toJSON);
};

exports.getAlbum = getAlbum;

var getAlbums = function getAlbums(ids) {
  return fetch("".concat(_config.API_URL, "/albums/?ids=").concat(ids)).then(_utils.toJSON);
};

exports.getAlbums = getAlbums;

var getAlbumTracks = function getAlbumTracks(id) {
  return fetch("".concat(_config.API_URL, "/albums/").concat(id, "/tracks")).then(_utils.toJSON);
};

exports.getAlbumTracks = getAlbumTracks;