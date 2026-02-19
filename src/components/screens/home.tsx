import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { FlatList, SectionList, StyleSheet, Text, View } from "react-native";
import { useAsteroids } from "../../hooks/useAsteroids";
import { asteroidListAtom, loadingAtom } from "../../store/asteroid.atoms";
import AsteroidCard from "../ui/AsteroidCard";
import FilterSection from "../ui/FilterSection";
import Header from "../ui/Header";
import { formatDateLabel } from "../../utils/formatDate";

export default function Home() {
    const { load } = useAsteroids();
    const asteroids = useAtomValue(asteroidListAtom);
    const loading = useAtomValue(loadingAtom);
    const [onlyHazardous, setOnlyHazardous] = useState(false);
    const [sortBy, setSortBy] = useState("date");

    useEffect(() => {
        load("2026-02-19", "2026-02-26");
    }, []);

    const { sections, isGrouped } = useMemo(() => {
        let result = [...asteroids];
        
        if (onlyHazardous) {
            result = result.filter(a => a.hazardous);
        }
        
        if (sortBy === "date") {
            result.sort((a, b) => a.date.localeCompare(b.date));
            
            const grouped = result.reduce((acc: any, asteroid) => {
                const date = asteroid.date;
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(asteroid);
                return acc;
            }, {});
            
            return {
                sections: Object.entries(grouped).map(([date, data]) => ({
                    title: date,
                    data: data as any[],
                })),
                isGrouped: true,
            };
        }
        
        if (sortBy === "distance") {
            result.sort((a, b) => a.distance - b.distance);
        } else if (sortBy === "velocity") {
            result.sort((a, b) => b.velocity - a.velocity);
        } else if (sortBy === "diameter") {
            result.sort((a, b) => b.diameterMax - a.diameterMax);
        }
        
        return {
            sections: [{ title: "", data: result }],
            isGrouped: false,
        };
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
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <FilterSection
                        onlyHazardous={onlyHazardous}
                        setOnlyHazardous={setOnlyHazardous}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                }
                renderSectionHeader={({ section: { title } }) => 
                    isGrouped && title ? (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{formatDateLabel(title)}</Text>
                        </View>
                    ) : null
                }
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <AsteroidCard
                            name={item.name}
                            diameterMin={item.diameterMin}
                            diameterMax={item.diameterMax}
                            distance={item.distance}
                            velocity={item.velocity}
                            isPotentiallyHazardous={item.hazardous}
                        />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#020618",
    },
    loading: {
        color: "#e2e8f0",
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
    cardWrapper: {
        paddingHorizontal: 16,
        paddingTop: 4,
    },
    sectionHeader: {
        backgroundColor: "#020618",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#3b82f6",
    },
});