
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

const galleryCategories = [
  {
    id: 'studio',
    title: 'Studio Photography',
    description: 'Professional studio portraits and creative sessions',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482b224b8?w=400&h=300&fit=crop',
  },
  {
    id: 'fashion',
    title: 'Fashion Photography',
    description: 'Editorial and commercial fashion shoots',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
  },
  {
    id: 'event',
    title: 'Event Photography',
    description: 'Concerts, Parties and special occasions',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
  },
  {
    id: 'product',
    title: 'Product Photography',
    description: 'Commercial product and lifestyle photography',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const navigateToGallery = (categoryId: string) => {
    console.log('Navigating to gallery:', categoryId);
    router.push(`/gallery/${categoryId}`);
  };

  const navigateToBooking = () => {
    console.log('Navigating to booking');
    router.push('/booking');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView 
        style={commonStyles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Hero Section */}
        <View style={[commonStyles.centerContent, { paddingVertical: 60 }]}>
          {/* Logo Image */}
          <Image
            source={require('../assets/images/3148fbc6-61bd-4cb1-bcc7-5ee9d757b83c.jpeg')}
            style={{
              width: 120,
              height: 120,
              marginBottom: 24,
              borderRadius: 60,
            }}
            resizeMode="cover"
          />
          <Text style={commonStyles.title}>HARRISON</Text>
          <Text style={commonStyles.subtitle}>Photography Portfolio</Text>
        </View>

        {/* Gallery Categories */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '300', marginBottom: 24, letterSpacing: 1 }]}>
            Portfolio
          </Text>
          
          {galleryCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={commonStyles.galleryCard}
              onPress={() => navigateToGallery(category.id)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: category.image }}
                style={{
                  width: '100%',
                  height: 200,
                  backgroundColor: colors.backgroundAlt,
                }}
                resizeMode="cover"
              />
              <View style={{ padding: 20 }}>
                <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '400', marginBottom: 8 }]}>
                  {category.title}
                </Text>
                <Text style={commonStyles.textSecondary}>
                  {category.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Book Session Section */}
        <View style={commonStyles.section}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 20,
              paddingHorizontal: 32,
              borderRadius: 12,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={navigateToBooking}
            activeOpacity={0.8}
          >
            <Icon name="camera" size={24} color={colors.background} style={{ marginRight: 12 }} />
            <Text style={[commonStyles.text, { color: colors.background, fontSize: 18, fontWeight: '400' }]}>
              Book a Session
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View style={[commonStyles.section, { alignItems: 'center' }]}>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', fontSize: 12 }]}>
            Professional photography services
          </Text>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', fontSize: 12, marginTop: 4 }]}>
            Available for bookings worldwide
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
