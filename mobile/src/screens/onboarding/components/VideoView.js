import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

const COLORS = {
  blue: '#2563eb',
  grey: '#e5e7eb',
};

/**
 * VideoView - Large video placeholder with blue circular play button.
 * Tapping opens a modal to play the video.
 */
export function VideoView({ videoSource = null, placeholderStyle }) {
  const [modalVisible, setModalVisible] = useState(false);

  const openVideo = () => setModalVisible(true);
  const closeVideo = () => setModalVisible(false);

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
      >
        <View style={styles.modalContainer}>
          <Button mode="text" onPress={closeVideo} style={styles.closeButton}>
            Close
          </Button>
          {videoSource ? (
            <Video
              source={videoSource}
              useNativeControls
              resizeMode="contain"
              style={styles.video}
              onPlaybackStatusUpdate={() => {}}
            />
          ) : (
            <View style={styles.placeholderModal}>
              <MaterialCommunityIcons name="video-outline" size={64} color="#999" />
              <Button mode="contained" onPress={closeVideo} style={styles.closeBtn}>
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
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  video: {
    flex: 1,
    width: '100%',
  },
  placeholderModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  closeBtn: {
    marginTop: 16,
  },
});
