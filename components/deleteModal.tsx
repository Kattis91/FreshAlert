import React from 'react';
import { Modal, TouchableOpacity, Text, View } from 'react-native';

type DeleteModalProps = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

function DeleteModal(props: DeleteModalProps) {
  const { visible, onClose, onDelete } = props;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
    >
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View style={{ width: "80%", padding: 20, backgroundColor: 'white', borderRadius: 8, height: 200, alignSelf: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginBottom: 10, color: "#003366" }}>Are you sure? This product will be permanently deleted and cannot be restored.</Text>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <TouchableOpacity
              style={{
              backgroundColor: "#900101",
              height: 35,
              justifyContent: "center",
              minWidth: 80,
              maxWidth: 100,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 10,
              borderRadius: 20,
            }}
              accessibilityLabel="Delete button"
              onPress={() => {
                onDelete();
                onClose();
              }}
            >
              <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#338F85",
                height: 35,
                justifyContent: "center",
                minWidth: 80,
                maxWidth: 100,
                marginTop: 5,
                marginBottom: 5,
                borderRadius: 20,
              }}
              accessibilityLabel="Keep button"
              onPress={onClose}
            >
              <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Keep</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
);
}

export default DeleteModal;