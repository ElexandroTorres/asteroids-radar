import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Switch, Text, View } from "react-native";

interface FilterSectionProps {
  onlyHazardous: boolean;
  setOnlyHazardous: (value: boolean) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function FilterSection({
  onlyHazardous,
  setOnlyHazardous,
  sortBy,
  setSortBy,
}: FilterSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Filtros</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Apenas perigosos</Text>
        <Switch
          value={onlyHazardous}
          onValueChange={setOnlyHazardous}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>↕️ Ordenar por</Text>
        <Picker
          selectedValue={sortBy}
          onValueChange={setSortBy}
          style={styles.picker}
        >
          <Picker.Item label="Data" value="date" />
          <Picker.Item label="Distância" value="distance" />
          <Picker.Item label="Velocidade" value="velocity" />
          <Picker.Item label="Diâmetro" value="diameter" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#0A1024",
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e2e8f0",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "#e2e8f0",
  },
  picker: {
    width: 150,
    color: "#e2e8f0",
    backgroundColor: "#1e293b",
  },
});
