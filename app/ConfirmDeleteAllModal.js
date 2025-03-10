// ConfirmDeleteAllModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ConfirmDeleteAllModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Are you sure? All expired products will be permanently deleted and cannot be restored.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              accessibilityLabel="Delete button"
              onPress={onConfirm}
              style={styles.deleteButton}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="Keep button"
              onPress={onClose}
              style={styles.cancelButton}

            >
              <Text style={styles.buttonText}>Keep</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: "80%",
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    height: 200,
    alignSelf: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#003366"
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#900101",
    height: 35,
    justifyContent: "center",
    minWidth: 80,
    maxWidth: 100,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: "#0A7763",
    height: 35,
    justifyContent: "center",
    minWidth: 80,
    maxWidth: 100,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

export default ConfirmDeleteAllModal;
