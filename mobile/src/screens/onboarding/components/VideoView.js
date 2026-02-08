import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

const COLORS = {
  blue: '#2563eb',
  grey: '#e5e7eb',
};

export function VideoView({ videoSource = null, placeholderStyle }) {
  const [modalVisible, setModalVisible] = useState(false);
  const videoRef = useRef(null);

  const openVideo = () => setModalVisible(true);
  const closeVideo = () => {
    setModalVisible(false);
    if (videoRef.current) {
      videoRef.current.pauseAsync();
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={openVideo}
        style={[styles.container, placeholderStyle]}
      >
        <View style={styles.playButton}>
          <MaterialCommunityIcons name="play" size={48} color="#fff" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeVideo}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeVideo}>
            <MaterialCommunityIcons name="close" size={32} color="#fff" />
          </TouchableOpacity>
          
          {videoSource ? (
            <Video
              ref={videoRef}
              source={videoSource}
              style={styles.video}
              resizeMode="contain"
              useNativeControls={false}  // ❌ REMOVED - causes fullscreen
              shouldPlay
              isLooping
              onError={(error) => console.log('Video error:', error)}
            />
          ) : (
            <View style={styles.placeholderModal}>
              <MaterialCommunityIcons name="video-outline" size={64} color="#999" />
              <Button mode="contained" onPress={closeVideo}>
                Close
              </Button>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    maxHeight: 220,
    backgroundColor: COLORS.grey,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  video: {
    width: '95%',
    height: '80%',
    backgroundColor: '#000',
  },
  placeholderModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: 20,
  },
});
