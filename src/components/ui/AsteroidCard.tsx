import { StyleSheet, Text, View } from "react-native";

interface AsteroidCardProps {
    name: string;
    diameterMin: number;
    diameterMax: number;
    distance: number;
    velocity: number;
    isPotentiallyHazardous: boolean;
}

export default function AsteroidCard({
    name,
    diameterMin,
    diameterMax,
    distance,
    velocity,
    isPotentiallyHazardous,
}: AsteroidCardProps) {
    return (
        <View style={[
            styles.card,
            isPotentiallyHazardous ? styles.hazardous : styles.safe
        ]}>
            <View style={styles.header}>
                <Text style={styles.name}>{name}</Text>
                {isPotentiallyHazardous && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>⚠ Perigoso</Text>
                    </View>
                )}
            </View>

            <View style={styles.grid}>
                <View style={styles.item}>
                    <Text style={styles.label}>📏 Diâmetro</Text>
                    <Text style={styles.value}>
                        {diameterMin.toFixed(0)} - {diameterMax.toFixed(0)} m
                    </Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>➡️ Distância</Text>
                    <Text style={styles.value}>
                        {(distance / 1000000).toFixed(2)} M km
                    </Text>
                </View>

                <View style={styles.itemFull}>
                    <Text style={styles.label}>⚡ Velocidade</Text>
                    <Text style={styles.value}>
                        {velocity.toLocaleString('pt-BR')} km/h
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        backgroundColor: "#0a0e27",
    },
    hazardous: {
        borderLeftColor: '#ef4444',
    },
    safe: {
        borderLeftColor: '#3b82f6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#e2e8f0',
        flex: 1,
        paddingRight: 8,
    },
    badge: {
        backgroundColor: '#dc2626',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    grid: {
        gap: 12,
    },
    item: {
        marginBottom: 8,
    },
    itemFull: {
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        color: '#94a3b8',
        marginBottom: 4,
    },
    value: {
        fontSize: 14,
        color: '#e2e8f0',
        fontWeight: '500',
    },
});