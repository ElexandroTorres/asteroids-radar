import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAsteroids } from "../../hooks/useAsteroids";
import { asteroidListAtom, loadingAtom } from "../../store/asteroid.atoms";
import AsteroidCard from "../ui/AsteroidCard";
import FilterSection from "../ui/FilterSection";
import Header from "../ui/Header";

export default function Home() {
    const { load } = useAsteroids();
    const asteroids = useAtomValue(asteroidListAtom);
    const loading = useAtomValue(loadingAtom);
    const [onlyHazardous, setOnlyHazardous] = useState(false);
    const [sortBy, setSortBy] = useState("date");

    useEffect(() => {
        load("2024-01-01", "2024-01-08");
    }, []);

    const filteredAndSorted = useMemo(() => {
        let result = [...asteroids];
        
        if (onlyHazardous) {
            result = result.filter(a => a.hazardous);
        }
        
        result.sort((a, b) => {
            if (sortBy === "distance") return a.distance - b.distance;
            if (sortBy === "velocity") return b.velocity - a.velocity;
            if (sortBy === "diameter") return b.diameterMax - a.diameterMax;
            return 0;
        });
        
        return result;
    }, [asteroids, onlyHazardous, sortBy]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Header />
                <Text style={styles.loading}>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={filteredAndSorted}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <FilterSection
                        onlyHazardous={onlyHazardous}
                        setOnlyHazardous={setOnlyHazardous}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                }
                renderItem={({ item }) => (
                    <AsteroidCard
                        name={item.name}
                        diameterMin={item.diameterMin}
                        diameterMax={item.diameterMax}
                        distance={item.distance}
                        velocity={item.velocity}
                        isPotentiallyHazardous={item.hazardous}
                    />
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0a0e27",
    },
    loading: {
        color: "#e2e8f0",
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
    listContent: {
        paddingHorizontal: 16,
    },
});