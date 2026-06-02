import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import VMsScreen from '../screens/VMsScreen';
import BillingScreen from '../screens/BillingScreen';
import DPDPScreen from '../screens/DPDPScreen';
import SupportScreen from '../screens/SupportScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const GREEN = '#1D9E75';
const GRAY = '#4A6F8A';
const DARK = '#0D2137';

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: DARK,
          borderTopColor: '#1A3A2A',
          height: 65,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: GREEN,
        tabBarInactiveTintColor: GRAY,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen}
        options={{ tabBarIcon: ({ color }) => <Icon name="view-dashboard-outline" size={24} color={color} /> }} />
      <Tab.Screen name="VMs" component={VMsScreen}
        options={{ tabBarIcon: ({ color }) => <Icon name="server-outline" size={24} color={color} /> }} />
      <Tab.Screen name="Billing" component={BillingScreen}
        options={{ tabBarIcon: ({ color }) => <Icon name="receipt" size={24} color={color} /> }} />
      <Tab.Screen name="DPDP" component={DPDPScreen}
        options={{ tabBarIcon: ({ color }) => <Icon name="shield-check-outline" size={24} color={color} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <Icon name="account-outline" size={24} color={color} /> }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Support" component={SupportScreen} />
    </Stack.Navigator>
  );
}
