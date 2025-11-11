import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import API from "../../services/api";
import { Alert } from "react-native";


interface Folder {
  _id: string;
  name: string;
  parentId: string | null;
}

const MyVideosScreen = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [newFolder, setNewFolder] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [path, setPath] = useState<{ id: string | null; name: string }[]>([{ id: null, name: "Root" }]);

  const deleteFolder = async (id: string) => {
    try {
      await API.delete(`/folders/${id}`);
      fetchFolders(); // refresh list after delete
    } catch (err) {
      console.log("Error deleting folder", err);
    }
  };

  const fetchFolders = async () => {
    try {
      const res = await API.get(`/folders?parentId=${parentId || ""}`);
      if (res.data.success) setFolders(res.data.folders);
    } catch (err) {
      console.log("Error fetching folders", err);
    }
  };

  const createFolder = async () => {
    if (!newFolder.trim()) return;
    try {
      const res = await API.post("/folders", { name: newFolder, parentId });
      if (res.data.success) {
        setNewFolder("");
        fetchFolders();
      }
    } catch (err) {
      console.log("Error creating folder", err);
    }
  };

  const openFolder = (folder: Folder) => {
    setParentId(folder._id);
    setPath([...path, { id: folder._id, name: folder.name }]);
  };

  const goBackTo = (toId: string | null) => {
    setParentId(toId);
    const idx = path.findIndex((p) => p.id === toId);
    setPath(path.slice(0, idx + 1));
  };

  useEffect(() => {
    fetchFolders();
  }, [parentId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Videos 📁</Text>

      {/* Breadcrumb path */}
      <View style={styles.pathRow}>
        {path.map((p, i) => (
          <TouchableOpacity key={i} onPress={() => goBackTo(p.id)}>
            <Text style={styles.pathText}>
              {p.name}
              {i < path.length - 1 ? " / " : ""}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Create new folder */}
      <View style={styles.createRow}>
        <TextInput
          placeholder="New folder name..."
          placeholderTextColor="#888"
          style={styles.input}
          value={newFolder}
          onChangeText={setNewFolder}
        />
        <TouchableOpacity style={styles.addButton} onPress={createFolder}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Folder list */}
     <FlatList
       data={folders}
       keyExtractor={(item) => item._id}
       renderItem={({ item }) => (
         <View style={styles.folderItemRow}>
           {/* tap folder name to open */}
           <TouchableOpacity style={{ flex: 1 }} onPress={() => openFolder(item)}>
             <Text style={styles.folderName}>📂 {item.name}</Text>
           </TouchableOpacity>

           {/* delete button */}
           <TouchableOpacity onPress={() =>
                                 Alert.alert("Delete Folder", `Delete "${item.name}" and its subfolders?`, [
                                   { text: "Cancel", style: "cancel" },
                                   { text: "Delete", style: "destructive", onPress: () => deleteFolder(item._id) },
                                 ])
                               }>
             <Text style={styles.deleteText}>🗑️</Text>
           </TouchableOpacity>
         </View>
       )}
     />

    </View>
  );
};

export default MyVideosScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 15 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  pathRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  pathText: { color: "#00b0ff", fontSize: 14 },
  createRow: { flexDirection: "row", marginBottom: 15 },
  input: { flex: 1, backgroundColor: "#1a1a1a", color: "#fff", borderRadius: 8, paddingHorizontal: 10 },
  addButton: {
    backgroundColor: "#007bff",
    marginLeft: 8,
    borderRadius: 8,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 22 },
  folderItem: { padding: 12, borderBottomWidth: 0.3, borderBottomColor: "#333" },
  folderName: { color: "#fff", fontSize: 18 },
  folderItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: "#333",
  },
  deleteText: {
    fontSize: 20,
    color: "red",
    marginLeft: 10,
  },

});
