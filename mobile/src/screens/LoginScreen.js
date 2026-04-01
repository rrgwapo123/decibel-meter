import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Switch } from 'react-native';

export default function LoginScreen({ onLogin }) {
  const [activeTab, setActiveTab] = useState('Login');
  const [email, setEmail] = useState('mikkelra54@gmail.com');
  const [password, setPassword] = useState('123456');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.mainTitle}>Smart IoT Decibel Monitoring System</Text>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('Login')}>
            <Text style={[styles.tab, activeTab === 'Login' && styles.activeTab]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Create Account')}>
            <Text style={[styles.tab, activeTab === 'Create Account' && styles.activeTab]}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.showButton}>
              <Text style={styles.showButtonText}>Show</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <View style={styles.switchContainer}>
            <Switch value={rememberMe} onValueChange={setRememberMe} trackColor={{ false: '#e2e8f0', true: '#0b3a72' }} thumbColor="#f8fafc" />
            <Text style={styles.optionsText}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={[styles.optionsText, styles.forgotPassword]}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>System: Online</Text>
          <Text style={styles.footerText}>Load: Low</Text>
          <Text style={styles.footerText}>v1</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef2f9', justifyContent: 'center', padding: 20 },
  formContainer: { backgroundColor: 'white', borderRadius: 12, padding: 25, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 15, elevation: 5 },
  mainTitle: { fontSize: 20, fontWeight: '600', color: '#1e293b', textAlign: 'center', marginBottom: 25 },
  tabs: { flexDirection: 'row', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  tab: { paddingBottom: 10, marginRight: 20, fontSize: 16, color: '#64748b' },
  activeTab: { color: '#0b3a72', borderBottomWidth: 2, borderBottomColor: '#0b3a72', fontWeight: '600' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, color: '#475569', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, backgroundColor: '#f8fafc', fontSize: 16 },
  showButton: { position: 'absolute', right: 15, top: 13 },
  showButtonText: { color: '#0b3a72', fontWeight: '600' },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  switchContainer: { flexDirection: 'row', alignItems: 'center' },
  optionsText: { color: '#475569', marginLeft: 8 },
  forgotPassword: { color: '#0b3a72', fontWeight: '600' },
  loginButton: { backgroundColor: '#0b3a72', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  loginButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 15 },
  footerText: { fontSize: 12, color: '#64748b' },
});
