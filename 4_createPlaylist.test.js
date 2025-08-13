const createPlaylist = require('./4_createPlaylist');

describe('createPlaylist', () => {
  describe('Valid playlist creation', () => {
    test('should create playlist with valid name', () => {
      const playlist = createPlaylist('My Playlist');
      
      expect(playlist).not.toBeNull();
      expect(playlist.name).toBe('My Playlist');
      expect(Array.isArray(playlist.songs)).toBe(true);
      expect(playlist.songs).toHaveLength(0);
      expect(typeof playlist.addSong).toBe('function');
      expect(typeof playlist.getSongCount).toBe('function');
    });

    test('should create playlist with different valid names', () => {
      const playlist1 = createPlaylist('Rock Classics');
      const playlist2 = createPlaylist('Pop Hits');
      const playlist3 = createPlaylist('Jazz Collection');
      
      expect(playlist1.name).toBe('Rock Classics');
      expect(playlist2.name).toBe('Pop Hits');
      expect(playlist3.name).toBe('Jazz Collection');
      
      // All should have empty songs arrays initially
      expect(playlist1.songs).toHaveLength(0);
      expect(playlist2.songs).toHaveLength(0);
      expect(playlist3.songs).toHaveLength(0);
    });

    test('should trim whitespace from playlist name', () => {
      const playlist1 = createPlaylist('  My Playlist  ');
      const playlist2 = createPlaylist('Rock Music   ');
      const playlist3 = createPlaylist('   Jazz');
      
      expect(playlist1.name).toBe('My Playlist');
      expect(playlist2.name).toBe('Rock Music');
      expect(playlist3.name).toBe('Jazz');
    });
  });

  describe('Object structure validation', () => {
    test('should have correct object structure', () => {
      const playlist = createPlaylist('Test Playlist');
      
      expect(playlist).toHaveProperty('name');
      expect(playlist).toHaveProperty('songs');
      expect(playlist).toHaveProperty('addSong');
      expect(playlist).toHaveProperty('getSongCount');
      
      expect(typeof playlist.name).toBe('string');
      expect(Array.isArray(playlist.songs)).toBe(true);
      expect(typeof playlist.addSong).toBe('function');
      expect(typeof playlist.getSongCount).toBe('function');
    });

    test('should not have extra properties', () => {
      const playlist = createPlaylist('Test Playlist');
      const keys = Object.keys(playlist);
      
      expect(keys).toHaveLength(4);
      expect(keys).toContain('name');
      expect(keys).toContain('songs');
      expect(keys).toContain('addSong');
      expect(keys).toContain('getSongCount');
    });
  });

  describe('addSong method', () => {
    test('should add valid songs and return true', () => {
      const playlist = createPlaylist('Test Playlist');
      
      expect(playlist.addSong('Song 1')).toBe(true);
      expect(playlist.addSong('Song 2')).toBe(true);
      expect(playlist.addSong('Song 3')).toBe(true);
      
      expect(playlist.songs).toHaveLength(3);
      expect(playlist.songs).toContain('Song 1');
      expect(playlist.songs).toContain('Song 2');
      expect(playlist.songs).toContain('Song 3');
    });

    test('should maintain song order', () => {
      const playlist = createPlaylist('Test Playlist');
      
      playlist.addSong('First Song');
      playlist.addSong('Second Song');
      playlist.addSong('Third Song');
      
      expect(playlist.songs[0]).toBe('First Song');
      expect(playlist.songs[1]).toBe('Second Song');
      expect(playlist.songs[2]).toBe('Third Song');
    });

    test('should trim whitespace from songs', () => {
      const playlist = createPlaylist('Test Playlist');
      
      playlist.addSong('  Song 1  ');
      playlist.addSong('Song 2   ');
      playlist.addSong('   Song 3');
      
      expect(playlist.songs[0]).toBe('Song 1');
      expect(playlist.songs[1]).toBe('Song 2');
      expect(playlist.songs[2]).toBe('Song 3');
    });

    test('should allow duplicate song names', () => {
      const playlist = createPlaylist('Test Playlist');
      
      expect(playlist.addSong('Favorite Song')).toBe(true);
      expect(playlist.addSong('Favorite Song')).toBe(true);
      
      expect(playlist.songs).toHaveLength(2);
      expect(playlist.songs[0]).toBe('Favorite Song');
      expect(playlist.songs[1]).toBe('Favorite Song');
    });

    test('should reject empty string songs', () => {
      const playlist = createPlaylist('Test Playlist');
      
      expect(playlist.addSong('')).toBe(false);
      expect(playlist.songs).toHaveLength(0);
    });

    test('should reject whitespace-only songs', () => {
      const playlist = createPlaylist('Test Playlist');
      
      expect(playlist.addSong('   ')).toBe(false);
      expect(playlist.addSong('\t')).toBe(false);
      expect(playlist.addSong('\n')).toBe(false);
      expect(playlist.addSong(' \t \n ')).toBe(false);
      
      expect(playlist.songs).toHaveLength(0);
    });

    test('should reject non-string songs', () => {
      const playlist = createPlaylist('Test Playlist');
      
      expect(playlist.addSong(123)).toBe(false);
      expect(playlist.addSong(null)).toBe(false);
      expect(playlist.addSong(undefined)).toBe(false);
      expect(playlist.addSong([])).toBe(false);
      expect(playlist.addSong({})).toBe(false);
      expect(playlist.addSong(true)).toBe(false);
      
      expect(playlist.songs).toHaveLength(0);
    });
  });

  describe('getSongCount method', () => {
    test('should return 0 for empty playlist', () => {
      const playlist = createPlaylist('Empty Playlist');
      expect(playlist.getSongCount()).toBe(0);
    });

    test('should return correct count after adding songs', () => {
      const playlist = createPlaylist('Test Playlist');
      
      expect(playlist.getSongCount()).toBe(0);
      
      playlist.addSong('Song 1');
      expect(playlist.getSongCount()).toBe(1);
      
      playlist.addSong('Song 2');
      expect(playlist.getSongCount()).toBe(2);
      
      playlist.addSong('Song 3');
      expect(playlist.getSongCount()).toBe(3);
    });

    test('should not change count when invalid songs are added', () => {
      const playlist = createPlaylist('Test Playlist');
      
      playlist.addSong('Valid Song');
      expect(playlist.getSongCount()).toBe(1);
      
      playlist.addSong('');  // Invalid
      expect(playlist.getSongCount()).toBe(1);
      
      playlist.addSong(123);  // Invalid
      expect(playlist.getSongCount()).toBe(1);
      
      playlist.addSong('Another Valid Song');
      expect(playlist.getSongCount()).toBe(2);
    });

    test('should match songs array length', () => {
      const playlist = createPlaylist('Test Playlist');
      
      for (let i = 1; i <= 10; i++) {
        playlist.addSong(`Song ${i}`);
        expect(playlist.getSongCount()).toBe(playlist.songs.length);
        expect(playlist.getSongCount()).toBe(i);
      }
    });
  });

  describe('Invalid playlist creation', () => {
    test('should return null for empty string name', () => {
      expect(createPlaylist('')).toBeNull();
    });

    test('should return null for whitespace-only name', () => {
      expect(createPlaylist('   ')).toBeNull();
      expect(createPlaylist('\t')).toBeNull();
      expect(createPlaylist('\n')).toBeNull();
      expect(createPlaylist(' \t \n ')).toBeNull();
    });

    test('should return null for non-string name', () => {
      expect(createPlaylist(123)).toBeNull();
      expect(createPlaylist(null)).toBeNull();
      expect(createPlaylist(undefined)).toBeNull();
      expect(createPlaylist([])).toBeNull();
      expect(createPlaylist({})).toBeNull();
      expect(createPlaylist(true)).toBeNull();
    });
  });

  describe('Edge cases', () => {
    test('should handle very long playlist names', () => {
      const longName = 'A'.repeat(100);
      const playlist = createPlaylist(longName);
      
      expect(playlist).not.toBeNull();
      expect(playlist.name).toBe(longName);
      expect(playlist.name).toHaveLength(100);
    });

    test('should handle single character playlist names', () => {
      const playlist = createPlaylist('A');
      expect(playlist).not.toBeNull();
      expect(playlist.name).toBe('A');
    });

    test('should handle playlist names with special characters', () => {
      const playlist1 = createPlaylist("Rock 'n' Roll");
      const playlist2 = createPlaylist('Hip-Hop & Rap');
      const playlist3 = createPlaylist('Classical (Baroque)');
      
      expect(playlist1).not.toBeNull();
      expect(playlist1.name).toBe("Rock 'n' Roll");
      expect(playlist2).not.toBeNull();
      expect(playlist2.name).toBe('Hip-Hop & Rap');
      expect(playlist3).not.toBeNull();
      expect(playlist3.name).toBe('Classical (Baroque)');
    });

    test('should handle very long song names', () => {
      const playlist = createPlaylist('Test Playlist');
      const longSong = 'B'.repeat(200);
      
      expect(playlist.addSong(longSong)).toBe(true);
      expect(playlist.songs[0]).toBe(longSong);
      expect(playlist.songs[0]).toHaveLength(200);
    });

    test('should handle song names with special characters', () => {
      const playlist = createPlaylist('Test Playlist');
      
      expect(playlist.addSong("Don't Stop Me Now")).toBe(true);
      expect(playlist.addSong('Rock & Roll')).toBe(true);
      expect(playlist.addSong('Song #1')).toBe(true);
      
      expect(playlist.songs).toContain("Don't Stop Me Now");
      expect(playlist.songs).toContain('Rock & Roll');
      expect(playlist.songs).toContain('Song #1');
    });
  });

  describe('Method integration', () => {
    test('should work correctly with mixed valid and invalid operations', () => {
      const playlist = createPlaylist('Mixed Test');
      
      expect(playlist.addSong('Song 1')).toBe(true);
      expect(playlist.getSongCount()).toBe(1);
      
      expect(playlist.addSong('')).toBe(false);  // Invalid
      expect(playlist.getSongCount()).toBe(1);   // Should remain 1
      
      expect(playlist.addSong('Song 2')).toBe(true);
      expect(playlist.getSongCount()).toBe(2);
      
      expect(playlist.addSong(null)).toBe(false);  // Invalid
      expect(playlist.getSongCount()).toBe(2);     // Should remain 2
      
      expect(playlist.songs).toEqual(['Song 1', 'Song 2']);
    });

    test('should maintain state across multiple operations', () => {
      const playlist = createPlaylist('State Test');
      const songNames = ['Song A', 'Song B', 'Song C', 'Song D', 'Song E'];
      
      // Add songs one by one and verify state
      songNames.forEach((song, index) => {
        expect(playlist.addSong(song)).toBe(true);
        expect(playlist.getSongCount()).toBe(index + 1);
        expect(playlist.songs).toHaveLength(index + 1);
        expect(playlist.songs[index]).toBe(song);
      });
      
      // Final verification
      expect(playlist.songs).toEqual(songNames);
      expect(playlist.getSongCount()).toBe(5);
    });
  });

  describe('Method context and binding', () => {
    test('should maintain correct this context for methods', () => {
      const playlist = createPlaylist('Context Test');
      
      // Test that methods work when called directly
      expect(playlist.getSongCount()).toBe(0);
      
      playlist.addSong('Test Song');
      expect(playlist.getSongCount()).toBe(1);
      
      // Test context preservation with method references
      const addSongRef = playlist.addSong;
      const getSongCountRef = playlist.getSongCount;
      
      // These should work when called with proper context
      expect(() => addSongRef.call(playlist, 'Another Song')).not.toThrow();
      expect(() => getSongCountRef.call(playlist)).not.toThrow();
      
      // Verify the method calls worked correctly
      expect(addSongRef.call(playlist, 'Third Song')).toBe(true);
      expect(getSongCountRef.call(playlist)).toBe(3); // 1 + 1 + 1 = 3 total
    });
  });
});
