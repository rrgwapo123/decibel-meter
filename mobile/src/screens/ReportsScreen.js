import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const initialReports = [
  { id: '1', title: 'Noise Complaint: Cogon Market', date: '2026-03-28', status: 'PENDING', vehicleType: 'Motorcycle' },
  { id: '2', title: 'Excessive Honking: Centrio Mall', date: '2026-03-29', status: 'ACTION TAKEN', vehicleType: 'Car' },
];

export default function ReportsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.reportItem}>
      <Text style={styles.reportTitle}>{item.title}</Text>
      <Text style={styles.reportDate}>{item.date} - {item.vehicleType}</Text>
      <View style={[styles.badge, { backgroundColor: item.status === 'PENDING' ? '#fef3c7' : '#dcfce7' }]}>
        <Text style={[styles.badgeText, { color: item.status === 'PENDING' ? '#92400e' : '#166534' }]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={initialReports}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  list: { padding: 20 },
  reportItem: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  reportTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 5 },
  reportDate: { fontSize: 14, color: '#64748b', marginBottom: 10 },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, alignSelf: 'flex-start' },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
});
