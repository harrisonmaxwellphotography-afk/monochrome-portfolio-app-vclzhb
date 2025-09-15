
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from '../../components/Icon';

const { width } = Dimensions.get('window');
const imageWidth = (width - 60) / 2; // 2 columns with padding

const galleryData = {
  studio: {
    title: 'Studio Photography',
    images: [
      'https://images.unsplash.com/photo-1554048612-b6a482b224b8?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
    ],
  },
  fashion: {
    title: 'Fashion Photography',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1494790108755-2616c9c0b8d3?w=400&h=600&fit=crop',
    ],
  },
  event: {
    title: 'Event Photography',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=600&fit=crop',
    ],
  },
  product: {
    title: 'Product Photography',
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=600&fit=crop',
    ],
  },
};

export default function GalleryScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryInfo = galleryData[category as keyof typeof galleryData];

  if (!galleryInfo) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.text}>Gallery not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    console.log('Navigating back to home');
    router.back();
  };

  const openImageModal = (imageUri: string) => {
    console.log('Opening image modal:', imageUri);
    setSelectedImage(imageUri);
  };

  const closeImageModal = () => {
    console.log('Closing image modal');
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity
          style={commonStyles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>{galleryInfo.title}</Text>
      </View>

      {/* Gallery Grid */}
      <ScrollView 
        style={commonStyles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
          {galleryInfo.images.map((imageUri, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: imageWidth,
                height: imageWidth * 1.5,
                marginBottom: 20,
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: colors.backgroundAlt,
              }}
              onPress={() => openImageModal(imageUri)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Image Modal */}
      {selectedImage && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 60,
              right: 20,
              zIndex: 1001,
              padding: 10,
            }}
            onPress={closeImageModal}
            activeOpacity={0.7}
          >
            <Icon name="close" size={30} color={colors.background} />
          </TouchableOpacity>
          
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: width - 40,
              height: (width - 40) * 1.5,
              maxHeight: '80%',
            }}
            resizeMode="contain"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
