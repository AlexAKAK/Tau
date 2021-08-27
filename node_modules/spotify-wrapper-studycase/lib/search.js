"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlaylists = exports.searchTracks = exports.searchAlbums = exports.searchArtists = exports.search = void 0;

var _config = require("./config");

var _utils = require("./utils");

var search = function search(query, type) {
  return fetch("".concat(_config.API_URL, "/search?q=").concat(query, "&type=").concat(type)).then(_utils.toJSON);
};

exports.search = search;

var searchArtists = function searchArtists(query) {
  return search(query, 'artist');
};

exports.searchArtists = searchArtists;

var searchAlbums = function searchAlbums(query) {
  return search(query, 'album');
};

exports.searchAlbums = searchAlbums;

var searchTracks = function searchTracks(query) {
  return search(query, 'track');
};

exports.searchTracks = searchTracks;

var searchPlaylists = function searchPlaylists(query) {
  return search(query, 'playlist');
};

exports.searchPlaylists = searchPlaylists;