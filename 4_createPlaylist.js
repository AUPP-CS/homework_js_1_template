/**
 * Exercise 4: Create Playlist Function
 * 
 * Objective: Write a function that creates a playlist object with song management capabilities
 * 
 * Requirements:
 * - Function signature: createPlaylist(name)
 * - Input: name (string)
 * - Output: Playlist object with name, songs array, and methods, or null if invalid
 * 
 * Rules:
 * - name must be a non-empty string (after trimming)
 * - Return null for any invalid input
 * - Trim whitespace from name
 * - Playlist object should have: name, songs (array), addSong() method, getSongCount() method
 * - addSong(song) should add valid songs to the songs array and return true/false
 * - getSongCount() should return the number of songs in the playlist
 * - Only non-empty string songs should be added (after trimming)
 * 
 * Examples:
 * createPlaylist("My Playlist") → { name: "My Playlist", songs: [], addSong: function, getSongCount: function }
 * playlist.addSong("Song 1") → true (song added)
 * playlist.addSong("") → false (empty song not added)
 * playlist.getSongCount() → returns number of songs
 * createPlaylist("") → null
 * createPlaylist(123) → null
 */

function createPlaylist(name) {
  
}

module.exports = createPlaylist;