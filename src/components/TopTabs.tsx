import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabItem {
  id: string;
  title: string;
}

interface TopTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  style?: any;
}

const TopTabs: React.FC<TopTabsProps> = ({ tabs, activeTab, onTabChange, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, style, { paddingTop: insets.top }]}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => onTabChange(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.title}
            </Text>
            {activeTab === tab.id && (
              <View style={styles.indicator} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 48,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    backgroundColor: '#F8F9FA',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#007AFF',
    borderRadius: 1.5,
  },
});

export default TopTabs;
